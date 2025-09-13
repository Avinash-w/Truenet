import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import watchImg from "../assets/img/watch.jpeg"; // replace with your watch image

export default function SpotlightWatchBanner({ height = "h-[400px]", className = "" }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      50,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.2, 5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0x000000 );
    scene.add(ambient);
    const pointLight = new THREE.PointLight(0x000000);
    pointLight.position.set(3, 3, 5);
    scene.add(pointLight);

    // Load watch image
    const loader = new THREE.TextureLoader();
    const texture = loader.load(watchImg);
    const watchGeo = new THREE.PlaneGeometry(2, 2);
    const watchMat = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    const watchPlane = new THREE.Mesh(watchGeo, watchMat);
    scene.add(watchPlane);

    // Particles
    const particleCount = 150;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) positions[i] = (Math.random() - 0.5) * 6;
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.09,
      color: 0x000000,
      opacity: 0.8,
      transparent: true,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Spotlight / Light Sweep plane
    const sweepGeo = new THREE.PlaneGeometry(2.5, 2.5);
    const sweepMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });
    const sweepPlane = new THREE.Mesh(sweepGeo, sweepMat);
    sweepPlane.rotation.z = Math.PI / 4; // diagonal sweep
    sweepPlane.position.z = 0.1; // slightly above the watch
    scene.add(sweepPlane);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Animate
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Floating / bobbing watch
      watchPlane.position.y = Math.sin(elapsed * 1.2) * 0.15;
      watchPlane.rotation.y = Math.sin(elapsed * 0.5) * 0.05;
      watchPlane.rotation.x = Math.sin(elapsed * 0.3) * 0.03;
      const scale = 1 + Math.sin(elapsed * 1.5) * 0.02;
      watchPlane.scale.set(scale, scale, scale);

      // Particles rotation
      particles.rotation.y += 0.0005;

      // Spotlight sweep animation
      sweepPlane.position.x = Math.sin(elapsed * 1.5) * 2; // move left-right

      // Camera slight follow
      camera.position.x = mouseX * 0.5;
      camera.position.y = 1.2 + mouseY * 0.3;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      <div ref={mountRef} className={`w-full ${height}`} />

      {/* Banner Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-black drop-shadow-[0_2px_8px_rgba(255,200,0,0.7)]">
          Luxury in Motion
        </h2>
        <p className="mt-4 max-w-lg text-gray-200/90 text-sm md:text-lg">
          Discover the art of timekeeping
        </p>
        <button className="mt-6 px-6 py-3 bg-yellow-400/90 text-black font-bold rounded-full shadow-xl hover:bg-yellow-300 transition transform hover:scale-105">
          Shop Collection
        </button>
      </div>

      {/* Background gradient */}
      {/* Decorative Glow Circles */}
      <div className="absolute w-72 h-72 rounded-full bg-purple-500 opacity-30 blur-3xl -top-20 -left-20"></div>
      <div className="absolute w-72 h-72 rounded-full bg-indigo-500 opacity-20 blur-3xl top-20 right-10"></div>
    </div>
  );
}
