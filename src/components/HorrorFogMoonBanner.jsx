"use client";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * HorrorFogMoonBanner
 * - height: tailwind height class, e.g. "h-[600px]"
 * - className: extra wrapper classes
 */
export default function HorrorFogMoonBanner({ height = "h-[600px]", className = "" }) {
  const mountRef = useRef(null);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ---------- Scene / Camera / Renderer ----------
    const scene = new THREE.Scene();
    // deep dark gradient feel by dim background color
    scene.background = new THREE.Color(0x030309);

    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // ---------- Soft ambient lighting (color grading) ----------
    const ambient = new THREE.AmbientLight(0x11121a, 0.6);
    scene.add(ambient);

    // slight greenish moon tint
    const moonTint = new THREE.PointLight(0x9fe6d6, 0.8, 30, 2);
    moonTint.position.set(-1, 1.5, 6);
    scene.add(moonTint);

    // subtle red rim (horror feel)
    const rim = new THREE.PointLight(0xff2e4c, 0.15, 30, 2);
    rim.position.set(2.5, -1.5, 6);
    scene.add(rim);

    // ---------- Procedural "moon glow" sprite (no image) ----------
    const makeGlowTexture = (size = 512) => {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = size;
      const ctx = canvas.getContext("2d");

      // radial gradient: center bright, edges transparent
      const gradient = ctx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2
      );
      // tweaks for eerie greenish moon
      gradient.addColorStop(0, "rgba(220,255,240,0.95)");
      gradient.addColorStop(0.2, "rgba(160,230,210,0.6)");
      gradient.addColorStop(0.45, "rgba(90,180,160,0.25)");
      gradient.addColorStop(1, "rgba(10,10,10,0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);

      // some noise overlay for texture
      const image = ctx.getImageData(0, 0, size, size);
      for (let i = 0; i < image.data.length; i += 4) {
        const rand = (Math.random() - 0.5) * 8; // light noise
        image.data[i + 0] = Math.max(0, Math.min(255, image.data[i + 0] + rand));
        image.data[i + 1] = Math.max(0, Math.min(255, image.data[i + 1] + rand * 0.2));
        image.data[i + 2] = Math.max(0, Math.min(255, image.data[i + 2] + rand * 0.1));
      }
      ctx.putImageData(image, 0, 0);
      return new THREE.CanvasTexture(canvas);
    };

    const glowTex = makeGlowTexture(1024);
    const spriteMat = new THREE.SpriteMaterial({
      map: glowTex,
      color: 0xffffff,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });
    const moonSprite = new THREE.Sprite(spriteMat);
    moonSprite.scale.set(6.5, 6.5, 1); // size of glow
    moonSprite.position.set(0, 0.4, -1);
    scene.add(moonSprite);

    // ---------- Fog layers (Points) ----------
    // Utility: create a layered points cloud for volumetric fog
    const makeFogLayer = (count, spreadX, spreadY, zRange, color, size, baseOpacity) => {
      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const alphas = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 0] = (Math.random() - 0.5) * spreadX;
        positions[i * 3 + 1] = (Math.random() - 0.5) * spreadY;
        positions[i * 3 + 2] = -Math.random() * zRange; // negative z toward camera
        alphas[i] = Math.random() * 0.8 + 0.2;
      }
      geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geo.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));

      // custom shader-like soft dot via Sprite-like material using circle texture
      // We'll generate a small canvas circle texture:
      const dotSize = 128;
      const dotCanvas = document.createElement("canvas");
      dotCanvas.width = dotCanvas.height = dotSize;
      const dctx = dotCanvas.getContext("2d");
      const g = dctx.createRadialGradient(
        dotSize / 2,
        dotSize / 2,
        0,
        dotSize / 2,
        dotSize / 2,
        dotSize / 2
      );
      g.addColorStop(0, "rgba(255,255,255,1)");
      g.addColorStop(0.5, "rgba(255,255,255,0.25)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      dctx.fillStyle = g;
      dctx.fillRect(0, 0, dotSize, dotSize);
      const dotTexture = new THREE.CanvasTexture(dotCanvas);

      const mat = new THREE.PointsMaterial({
        map: dotTexture,
        size: size,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: false,
      });
      // We can't vary color per vertex easily without color attribute; color passed here
      mat.color = new THREE.Color(color);
      mat.opacity = baseOpacity;

      const points = new THREE.Points(geo, mat);
      return { points, geo, mat };
    };

    // three layers: near (dense), mid, far (sparse)
    const near = makeFogLayer(1200, 12, 6, 6, 0xcaf8ea, 0.16, 0.12); // dense close
    const mid = makeFogLayer(800, 14, 7, 8, 0xa3f0dd, 0.12, 0.08);
    const far = makeFogLayer(500, 20, 10, 12, 0x8fe0c8, 0.08, 0.06);

    // give different z positions to layers
    near.points.position.z = 1.6;
    mid.points.position.z = 0.8;
    far.points.position.z = -0.4;
    scene.add(far.points, mid.points, near.points);

    // small animated "embers" that sometimes flicker red — subtle horror accent
    const emberGeo = new THREE.BufferGeometry();
    const emberCount = 60;
    const emberPos = new Float32Array(emberCount * 3);
    for (let i = 0; i < emberCount; i++) {
      emberPos[i * 3 + 0] = (Math.random() - 0.5) * 8;
      emberPos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      emberPos[i * 3 + 2] = Math.random() * 3 - 1; // between -1 and 2
    }
    emberGeo.setAttribute("position", new THREE.BufferAttribute(emberPos, 3));
    const emberMat = new THREE.PointsMaterial({
      size: 0.06,
      color: new THREE.Color(0xff2e4c),
      transparent: true,
      opacity: 0.0, // start invisible; will pulse
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const embers = new THREE.Points(emberGeo, emberMat);
    scene.add(embers);

    // ---------- Interaction state ----------
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseRef.current = { x: mouseX, y: mouseY };
    };
    window.addEventListener("mousemove", onMouseMove);

    const onScroll = () => {
      // store scroll for reactive animation
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll);

    // ---------- Responsive ----------
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // ---------- Animation loop ----------
    const clock = new THREE.Clock();
    let frameId;
    const animate = () => {
      const t = clock.getElapsedTime();

      // subtle moon breathing (slight scale & position bob)
      moonSprite.material.opacity = 0.92 + Math.sin(t * 0.4) * 0.02;
      moonSprite.scale.x = 6.2 + Math.sin(t * 0.35) * 0.12;
      moonSprite.scale.y = 6.2 + Math.cos(t * 0.35) * 0.12;
      moonSprite.position.y = 0.4 + Math.sin(t * 0.2) * 0.04;

      // gentle fog rotation / flow
      far.points.rotation.y += 0.0003 + Math.sin(t * 0.02) * 0.00005;
      mid.points.rotation.y += 0.0005 + Math.cos(t * 0.01) * 0.00006;
      near.points.rotation.y += 0.0008 + Math.sin(t * 0.007) * 0.00008;

      // scroll-based reveal: as user scrolls down, clouds move backwards and fade
      // tweak scaling value for speed and distance to taste
      const s = Math.min(scrollRef.current / 600, 1);
      // near layer moves the most (covers object)
      near.mat.opacity = Math.max(0, 0.14 - s * 0.14); // fade out
      near.points.position.z = 1.6 - s * 5.0;

      mid.mat.opacity = Math.max(0, 0.10 - s * 0.10);
      mid.points.position.z = 0.8 - s * 3.5;

      far.mat.opacity = Math.max(0, 0.08 - s * 0.06);
      far.points.position.z = -0.4 - s * 2.0;

      // camera parallax following mouse (smooth)
      const targetCamX = mouseRef.current.x * 0.8;
      const targetCamY = mouseRef.current.y * 0.5;
      camera.position.x += (targetCamX - camera.position.x) * 0.06;
      camera.position.y += (targetCamY - camera.position.y) * 0.06;
      camera.lookAt(new THREE.Vector3(0, 0.2, 0));

      // ember pulse — flicker occasionally (randomized)
      emberMat.opacity = 0.15 + Math.abs(Math.sin(t * 3)) * 0.25 * Math.random();

      // rim / tint slight pulse
      moonTint.intensity = 0.9 + Math.sin(t * 0.5) * 0.12;
      rim.intensity = 0.08 + Math.abs(Math.sin(t * 0.9)) * 0.12;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    // ---------- Cleanup ----------
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);

      // dispose geometries / materials / textures to prevent memory leak
      [near, mid, far].forEach((layer) => {
        layer.geo.dispose();
        layer.mat.dispose();
      });
      dotTexture && dotTexture.dispose?.();
      glowTex.dispose();
      emberGeo.dispose();
      emberMat.dispose();

      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  // Overlay HTML content
  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      <div ref={mountRef} className={`w-full ${height}`} />

      {/* Overlay text (horror feel, minimal) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        <h1
          className="text-3xl md:text-5xl font-extrabold tracking-wide"
          style={{
            color: "#dffcf3",
            textShadow: "0 6px 30px rgba(20,200,170,0.12), 0 0 8px rgba(255,0,80,0.03)",
            pointerEvents: "none",
          }}
        >
          The night hides what the day forgets
        </h1>
        <p
          className="mt-4 max-w-xl"
          style={{ color: "rgba(220,255,240,0.7)", pointerEvents: "none" }}
        >
          Move your mouse. Scroll down to unveil the light beneath the fog.
        </p>
      </div>

      {/* subtle CSS glows for border aesthetic */}
      <div
        style={{
          position: "absolute",
          left: -120,
          top: -120,
          width: 360,
          height: 360,
          borderRadius: "50%",
          filter: "blur(64px)",
          background: "rgba(24,120,110,0.06)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -160,
          bottom: -100,
          width: 420,
          height: 420,
          borderRadius: "50%",
          filter: "blur(80px)",
          background: "rgba(255,20,60,0.03)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
