"use client";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import watchImg from "/logoblacki - Copy.jpeg";

export default function NightScrollWatchBanner({ height = "h-screen", className = "" }) {
  const mountRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0f2d); // deep navy night
    scene.fog = new THREE.FogExp2(0x0a0f2d, 0.08);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 6);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    // Enhanced Lighting
    const ambient = new THREE.AmbientLight(0x4466ff, 0.3);
    scene.add(ambient);

    const blueLight = new THREE.PointLight(0x4488ff, 1.2, 15);
    blueLight.position.set(2, 1, 4);
    scene.add(blueLight);

    const cyanLight = new THREE.PointLight(0x00ccff, 0.8, 12);
    cyanLight.position.set(-2, -1, 3);
    scene.add(cyanLight);

    const goldLight = new THREE.PointLight(0xffaa00, 0.5, 10);
    goldLight.position.set(0, 0, 5);
    scene.add(goldLight);

    // Watch plane with enhanced materials
    const loader = new THREE.TextureLoader();
    const texture = loader.load(watchImg.src || watchImg);
    const watchGeo = new THREE.PlaneGeometry(3, 3);
    const watchMat = new THREE.MeshStandardMaterial({
      map: texture,
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.95,
    });
    const watch = new THREE.Mesh(watchGeo, watchMat);
    scene.add(watch);

    // Enhanced "Dot Clouds" — more luxurious feel
    const cloudCount = 1500;
    const cloudGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(cloudCount * 3);
    const colors = new Float32Array(cloudCount * 3);
    
    for (let i = 0; i < cloudCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = Math.random() * 5;
      
      // Blue/cyan color variation
      const color = new THREE.Color();
      color.setHSL(
        0.6 + Math.random() * 0.2, // Blue-cyan range
        0.7,
        0.5 + Math.random() * 0.3
      );
      colors[i * 3 + 0] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    cloudGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    cloudGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const cloudMat = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const clouds = new THREE.Points(cloudGeo, cloudMat);
    scene.add(clouds);

    // Enhanced Stars with twinkling effect
    const starCount = 500;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);
    
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3 + 0] = (Math.random() - 0.5) * 20;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2; // behind watch
      starSizes[i] = 0.02 + Math.random() * 0.03;
    }
    
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute("size", new THREE.BufferAttribute(starSizes, 1));

    const starMat = new THREE.PointsMaterial({
      size: 0.03,
      color: 0xaaccff,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // Floating particles (luxury sparkles)
    const sparkleCount = 200;
    const sparkleGeo = new THREE.BufferGeometry();
    const sparklePos = new Float32Array(sparkleCount * 3);
    
    for (let i = 0; i < sparkleCount; i++) {
      sparklePos[i * 3 + 0] = (Math.random() - 0.5) * 8;
      sparklePos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      sparklePos[i * 3 + 2] = Math.random() * 4 + 1;
    }
    
    sparkleGeo.setAttribute("position", new THREE.BufferAttribute(sparklePos, 3));

    const sparkleMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0xffffff,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const sparkles = new THREE.Points(sparkleGeo, sparkleMat);
    scene.add(sparkles);

    // Interactivity
    let mouseX = 0, mouseY = 0;
    
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    window.addEventListener("mousemove", handleMouseMove);
    mount.addEventListener("mouseenter", handleMouseEnter);
    mount.addEventListener("mouseleave", handleMouseLeave);

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    // Animation loop
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Watch animation
      watch.position.y = Math.sin(elapsed * 1.2) * 0.08;
      watch.rotation.y = Math.sin(elapsed * 0.5) * 0.03;
      watch.rotation.z = Math.sin(elapsed * 0.3) * 0.01;

      // Enhanced clouds movement
      clouds.rotation.y += 0.0003;
      clouds.rotation.x = Math.sin(elapsed * 0.1) * 0.02;
      clouds.position.x = Math.sin(elapsed * 0.2) * 0.1;

      // Stars twinkling
      stars.rotation.y += 0.0002;
      starMat.opacity = 0.7 + Math.sin(elapsed * 3) * 0.2;

      // Sparkles animation
      sparkles.rotation.y += 0.0004;
      sparkles.position.y = Math.sin(elapsed * 0.5) * 0.05;

      // Scroll effects
      const scrollProgress = Math.min(scrollY / 600, 1);
      clouds.position.z = 1 - scrollProgress * 4;
      cloudMat.opacity = 0.15 - scrollProgress * 0.12;
      watch.position.z = scrollProgress * 1.5;

      // Enhanced mouse parallax with hover
      const hoverEffect = isHovered ? 1.3 : 1;
      camera.position.x += (mouseX * 0.8 * hoverEffect - camera.position.x) * 0.03;
      camera.position.y += (mouseY * 0.5 * hoverEffect - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      // Light animations
      blueLight.intensity = 1.2 + Math.sin(elapsed * 2) * 0.2;
      cyanLight.intensity = 0.8 + Math.sin(elapsed * 3) * 0.1;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      mount.removeEventListener("mouseenter", handleMouseEnter);
      mount.removeEventListener("mouseleave", handleMouseLeave);
      mount.removeChild(renderer.domElement);
    };
  }, [scrollY, isHovered]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div ref={mountRef} className={`w-full ${height}`} />

      {/* Enhanced Overlay content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
        <h2 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-cyan-100 to-white drop-shadow-[0_0_30px_rgba(100,200,255,0.9)] mb-6">
          Timeless Elegance
        </h2>
        <p className="mt-4 max-w-lg text-blue-100/90 text-lg md:text-xl font-light tracking-wide">
          Precision crafted for those who appreciate the extraordinary
        </p>
        
        <div className="mt-8 flex space-x-6">
          <button className="pointer-events-auto px-8 py-3 bg-transparent border-2 border-cyan-400 text-cyan-300 font-semibold tracking-wider hover:bg-cyan-400 hover:text-blue-900 transition-all duration-300 hover:scale-105 rounded-lg">
            EXPLORE COLLECTION
          </button>
          <button className="pointer-events-auto px-8 py-3 bg-cyan-500/20 border-2 border-cyan-500/50 text-white font-semibold tracking-wider hover:bg-cyan-500 hover:text-white transition-all duration-300 hover:scale-105 rounded-lg backdrop-blur-sm">
            CUSTOM ORDER
          </button>
        </div>
      </div>

      {/* Enhanced Ambient glows */}
      <div className="absolute w-96 h-96 rounded-full bg-blue-500/20 blur-3xl -top-32 -left-32"></div>
      <div className="absolute w-80 h-80 rounded-full bg-cyan-400/15 blur-3xl bottom-10 right-10"></div>
      <div className="absolute w-64 h-64 rounded-full bg-purple-500/10 blur-3xl top-1/2 left-1/4"></div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-blue-950/50 to-transparent pointer-events-none"></div>
    </div>
  );
}