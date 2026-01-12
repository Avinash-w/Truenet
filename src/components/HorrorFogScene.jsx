"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function HorrorFogBanner() {
  const mountRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // === Scene Setup ===
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0f2d); // Deep blue night background
    scene.fog = new THREE.FogExp2(0x000522, 0.35);

    // === Camera ===
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 6);

    // === Renderer ===
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    // === Lighting ===
    const ambient = new THREE.AmbientLight(0x222266, 0.6);
    scene.add(ambient);

    const blueLight = new THREE.PointLight(0x3355ff, 1.5, 10);
    blueLight.position.set(-2, 0, 3);
    scene.add(blueLight);

    const cyanLight = new THREE.PointLight(0x00ffff, 1.4, 10);
    cyanLight.position.set(2, 0, 3);
    scene.add(cyanLight);

    const moonLight = new THREE.PointLight(0x99ccff, 0.5, 20);
    moonLight.position.set(0, 5, -5);
    scene.add(moonLight);

    // Lightning flash light (hidden most of the time)
    const lightning = new THREE.PointLight(0x99ccff, 0, 50);
    lightning.position.set(0, 5, 5);
    scene.add(lightning);

    // === Fog Particles ===
    const fogCount = 4000;
    const fogGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(fogCount * 3);
    for (let i = 0; i < fogCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    fogGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const fogMat = new THREE.PointsMaterial({
      color: 0x00aaff,
      size: 0.09,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const fog = new THREE.Points(fogGeo, fogMat);
    scene.add(fog);

    // === Interactivity ===
    let mouseX = 0,
      mouseY = 0;
    window.addEventListener("mousemove", (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    // === Animation Loop ===
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Fog float motion
      fog.rotation.y += 0.0007 + Math.sin(elapsed * 0.3) * 0.0005;
      fog.rotation.x = Math.sin(elapsed * 0.2) * 0.06;
      fog.position.x = Math.sin(elapsed * 0.15) * 0.3;

      // Camera subtle parallax
      camera.position.x += (mouseX * 1.0 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      // Scroll fade effect
      const progress = Math.min(scrollY / 400, 1);
      fog.position.z = 2 - progress * 3;
      fog.material.opacity = 0.25 - progress * 0.15;

      // Blue light flicker
      const pulse = Math.sin(elapsed * 3) * 0.5 + 1;
      blueLight.intensity = 1.2 * pulse;
      cyanLight.intensity = 1.3 - pulse * 0.3;

      // Random lightning flash
      if (Math.random() < 0.005) {
        lightning.intensity = 10;
        setTimeout(() => {
          lightning.intensity = 0;
        }, 80);
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // === Resize Handler ===
    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // === Cleanup ===
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      mount.removeChild(renderer.domElement);
    };
  }, [scrollY]);

  // === JSX Render ===
  return (
    <div className="relative w-full h-screen bg-blue-950 overflow-hidden">
      <div ref={mountRef} className="w-full h-full" />

      {/* Overlay Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white pointer-events-none">
        <h1 className="text-6xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-600 to-indigo-900 drop-shadow-[0_0_30px_#00ccff]">
          Night of Shadows
        </h1>
        <p className="mt-4 text-blue-300 tracking-widest uppercase text-lg">
          The fog whispers through the storm.
        </p>
      </div>

      {/* Top Glow */}
      <div className="absolute top-0 w-full h-1/4 bg-gradient-to-b from-blue-900/60 to-transparent pointer-events-none"></div>

      {/* Bottom Dark Fade */}
      <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none"></div>
    </div>
  );
}
