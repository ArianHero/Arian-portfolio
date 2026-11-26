"use client";

import { useEffect, useRef } from "react";
import type { Material, WebGLRenderer } from "three";

export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    let renderer: WebGLRenderer | undefined;
    let frameId = 0;
    let disposed = false;
    let cleanup: (() => void) | undefined;

    const setup = async () => {
      try {
        const THREE = await import("three");
        if (disposed) return;

        renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
          powerPreference: "high-performance"
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
        renderer.setSize(wrapper.clientWidth, wrapper.clientHeight, false);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.12;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          36,
          wrapper.clientWidth / Math.max(wrapper.clientHeight, 1),
          0.1,
          100
        );
        camera.position.set(0, 0, 7.2);

        const sculpture = new THREE.Group();
        scene.add(sculpture);

        const knotGeometry = new THREE.TorusKnotGeometry(1.08, 0.27, 180, 24, 2, 3);
        const knotMaterial = new THREE.MeshPhysicalMaterial({
          color: 0xaaa4ff,
          metalness: 0.82,
          roughness: 0.2,
          clearcoat: 1,
          clearcoatRoughness: 0.12,
          iridescence: 0.48,
          iridescenceIOR: 1.35,
          iridescenceThicknessRange: [120, 420]
        });
        const knot = new THREE.Mesh(knotGeometry, knotMaterial);
        knot.rotation.set(0.35, 0.1, -0.25);
        sculpture.add(knot);

        const ringMaterial = new THREE.MeshStandardMaterial({
          color: 0x83d7e8,
          metalness: 0.86,
          roughness: 0.28,
          transparent: true,
          opacity: 0.8
        });
        const ringA = new THREE.Mesh(
          new THREE.TorusGeometry(1.72, 0.014, 12, 180),
          ringMaterial
        );
        ringA.rotation.set(1.12, 0.42, 0.1);
        sculpture.add(ringA);

        const ringB = new THREE.Mesh(
          new THREE.TorusGeometry(1.95, 0.009, 8, 180),
          new THREE.MeshBasicMaterial({
            color: 0x8d7dff,
            transparent: true,
            opacity: 0.62
          })
        );
        ringB.rotation.set(0.3, 1.1, 0.7);
        sculpture.add(ringB);

        const core = new THREE.Mesh(
          new THREE.IcosahedronGeometry(0.42, 2),
          new THREE.MeshPhysicalMaterial({
            color: 0xe8e5ff,
            metalness: 0.42,
            roughness: 0.16,
            transmission: 0.12,
            clearcoat: 1
          })
        );
        sculpture.add(core);

        scene.add(new THREE.AmbientLight(0x8f9bbf, 1.05));
        const keyLight = new THREE.PointLight(0xb9a9ff, 42, 20);
        keyLight.position.set(3.2, 2.8, 4.5);
        scene.add(keyLight);
        const cyanLight = new THREE.PointLight(0x61d8e7, 26, 18);
        cyanLight.position.set(-3.4, -1.4, 2.6);
        scene.add(cyanLight);
        const rimLight = new THREE.DirectionalLight(0xffffff, 2.2);
        rimLight.position.set(0, 4, -3);
        scene.add(rimLight);

        const particleCount = 180;
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i += 1) {
          positions[i * 3] = (Math.random() - 0.5) * 8.5;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 6.5;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1.5;
        }
        const particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute(
          "position",
          new THREE.BufferAttribute(positions, 3)
        );
        const particles = new THREE.Points(
          particleGeometry,
          new THREE.PointsMaterial({
            color: 0xc4c1ff,
            size: 0.018,
            transparent: true,
            opacity: 0.58,
            sizeAttenuation: true
          })
        );
        scene.add(particles);

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const pointer = { x: 0, y: 0 };
        const target = { x: 0, y: 0 };
        const onPointerMove = (event: PointerEvent) => {
          const bounds = wrapper.getBoundingClientRect();
          target.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
          target.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
        };
        const onPointerLeave = () => {
          target.x = 0;
          target.y = 0;
        };
        wrapper.addEventListener("pointermove", onPointerMove, { passive: true });
        wrapper.addEventListener("pointerleave", onPointerLeave);

        const clock = new THREE.Clock();
        const animate = () => {
          if (disposed || !renderer) return;
          const elapsed = clock.getElapsedTime();
          pointer.x += (target.x - pointer.x) * 0.035;
          pointer.y += (target.y - pointer.y) * 0.035;

          if (!reduceMotion) {
            sculpture.rotation.y = elapsed * 0.12 + pointer.x * 0.2;
            sculpture.rotation.x = Math.sin(elapsed * 0.22) * 0.12 + pointer.y * 0.12;
            ringA.rotation.z = elapsed * 0.055;
            ringB.rotation.x = 0.3 + elapsed * 0.035;
            particles.rotation.y = elapsed * 0.008;
          } else {
            sculpture.rotation.y = pointer.x * 0.12;
            sculpture.rotation.x = pointer.y * 0.08;
          }

          renderer.render(scene, camera);
          frameId = window.requestAnimationFrame(animate);
        };
        animate();

        const onResize = () => {
          if (!renderer) return;
          const width = wrapper.clientWidth;
          const height = Math.max(wrapper.clientHeight, 1);
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
          renderer.setSize(width, height, false);
          renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6));
        };
        const resizeObserver = new ResizeObserver(onResize);
        resizeObserver.observe(wrapper);

        cleanup = () => {
          window.cancelAnimationFrame(frameId);
          resizeObserver.disconnect();
          wrapper.removeEventListener("pointermove", onPointerMove);
          wrapper.removeEventListener("pointerleave", onPointerLeave);
          knotGeometry.dispose();
          knotMaterial.dispose();
          ringA.geometry.dispose();
          ringMaterial.dispose();
          ringB.geometry.dispose();
          (ringB.material as Material).dispose();
          core.geometry.dispose();
          (core.material as Material).dispose();
          particleGeometry.dispose();
          (particles.material as Material).dispose();
          renderer?.dispose();
        };
        wrapper.dataset.webgl = "ready";
      } catch {
        wrapper.dataset.webgl = "fallback";
      }
    };

    void setup();
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, []);

  return (
    <div className="hero-scene" ref={wrapperRef} aria-label="Interactive abstract 3D sculpture">
      <div className="scene-aura" />
      <div className="scene-fallback" aria-hidden="true">
        <div className="fallback-orbit orbit-one" />
        <div className="fallback-orbit orbit-two" />
        <div className="fallback-core" />
      </div>
      <canvas ref={canvasRef} aria-hidden="true" />
      <div className="scene-caption">
        <span>FIG. 001</span>
        <span>FORM / FUNCTION / FEELING</span>
      </div>
    </div>
  );
}
