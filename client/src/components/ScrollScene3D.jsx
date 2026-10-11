import { memo, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const chapters = [
  { id: 'hero', number: '01', label: 'AI-ready core' },
  { id: 'impact', number: '02', label: 'Enterprise proof' },
  { id: 'projects', number: '03', label: 'Product proof' },
  { id: 'skills', number: '04', label: 'Capability map' },
  { id: 'contact', number: '05', label: 'Let\'s talk' },
];

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const lerp = (start, end, amount) => start + (end - start) * amount;

function getChapterProgress(scrollProgress) {
  const scaled = clamp(scrollProgress, 0, 0.9999) * (chapters.length - 1);
  return { index: Math.floor(scaled), mix: scaled - Math.floor(scaled) };
}

const chapterPoses = [
  { x: 2.55, y: 0.1, z: 0, scale: 1.05, hue: 0 },
  { x: -2.35, y: -0.1, z: -0.7, scale: 0.82, hue: 0.12 },
  { x: 2.2, y: 0, z: 0.3, scale: 1.28, hue: 0.24 },
  { x: -2.5, y: 0.15, z: -0.5, scale: 0.72, hue: 0.08 },
  { x: 0, y: 0, z: 0.55, scale: 1.45, hue: 0 },
];

const ScrollScene3D = memo(() => {
  const canvasRef = useRef(null);
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const compact = window.matchMedia('(max-width: 860px)').matches;
    const saveData = navigator.connection?.saveData;
    const lowPower = compact || saveData || (navigator.deviceMemory && navigator.deviceMemory <= 4);
    const rootStyles = window.getComputedStyle(document.documentElement);
    const sceneColor = rootStyles.getPropertyValue('--scene').trim() || '#6366f1';
    const detailColor = rootStyles.getPropertyValue('--scene-detail').trim() || '#a5b4fc';
    const accentColor = rootStyles.getPropertyValue('--accent').trim() || '#67e8f9';

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: !lowPower,
        powerPreference: lowPower ? 'low-power' : 'high-performance',
      });
    } catch {
      canvas.closest('.webgl-shell')?.classList.add('webgl-unavailable');
      return undefined;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lowPower ? 1.15 : 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, compact ? 8.5 : 7.2);

    const world = new THREE.Group();
    scene.add(world);

    const coreGeometry = new THREE.TorusKnotGeometry(1.18, 0.34, lowPower ? 88 : 156, 18, 2, 3);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: sceneColor,
      roughness: 0.25,
      metalness: 0.64,
      clearcoat: 1,
      clearcoatRoughness: 0.18,
      emissive: sceneColor,
      emissiveIntensity: 0.35,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    world.add(core);

    const shellGeometry = new THREE.IcosahedronGeometry(1.95, 2);
    const shellMaterial = new THREE.MeshBasicMaterial({
      color: detailColor,
      wireframe: true,
      transparent: true,
      opacity: 0.13,
    });
    const shell = new THREE.Mesh(shellGeometry, shellMaterial);
    world.add(shell);

    const ringGroup = new THREE.Group();
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: accentColor,
      transparent: true,
      opacity: 0.28,
      side: THREE.DoubleSide,
    });
    [2.35, 2.75, 3.12].forEach((radius, index) => {
      const geometry = new THREE.TorusGeometry(radius, 0.012 + index * 0.005, 6, lowPower ? 80 : 140);
      const ring = new THREE.Mesh(geometry, ringMaterial);
      ring.rotation.set(index * 0.55, index * 0.72, index * 0.38);
      ringGroup.add(ring);
    });
    world.add(ringGroup);

    const particleCount = lowPower ? 140 : 420;
    const positions = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index += 1) {
      const radius = 2.2 + Math.random() * 3.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[index * 3 + 2] = radius * Math.cos(phi);
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: detailColor,
      size: lowPower ? 0.024 : 0.03,
      transparent: true,
      opacity: 0.48,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    world.add(particles);

    scene.add(new THREE.HemisphereLight(0xf8fafc, 0x070a12, 1.8));
    const keyLight = new THREE.DirectionalLight(accentColor, 7);
    keyLight.position.set(4, 5, 6);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0xffffff, 24, 16);
    rimLight.position.set(-4, -2, 4);
    scene.add(rimLight);

    const baseHue = {};
    new THREE.Color(sceneColor).getHSL(baseHue);

    const pointer = { x: 0, y: 0 };
    const smoothPointer = { x: 0, y: 0 };
    let targetScroll = 0;
    let smoothScroll = 0;
    let chapterStops = [];
    let frameId = 0;
    let previousTime = 0;
    let hidden = document.hidden;

    const calculateChapterStops = () => {
      const available = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      chapterStops = chapters.map(({ id }) => {
        const element = document.getElementById(id);
        if (!element) return 0;
        return clamp((element.getBoundingClientRect().top + window.scrollY) / available, 0, 1);
      });
    };

    const updateScroll = () => {
      if (reducedMotion) {
        targetScroll = 0;
        smoothScroll = 0;
        setActiveChapter(0);
        return;
      }

      const available = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      const pageProgress = clamp(window.scrollY / available, 0, 1);
      let segment = chapters.length - 2;
      for (let index = 0; index < chapterStops.length - 1; index += 1) {
        if (pageProgress < chapterStops[index + 1]) {
          segment = index;
          break;
        }
      }
      const start = chapterStops[segment] ?? 0;
      const end = chapterStops[segment + 1] ?? 1;
      const localProgress = clamp((pageProgress - start) / Math.max(end - start, 0.001), 0, 1);
      targetScroll = clamp((segment + localProgress) / (chapters.length - 1), 0, 1);
      setActiveChapter((current) => (current === Math.round(targetScroll * (chapters.length - 1))
        ? current
        : Math.round(targetScroll * (chapters.length - 1))));

      if (reducedMotion) {
        smoothScroll = targetScroll;
      }
    };

    const updatePointer = (event) => {
      if (compact || reducedMotion) return;
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      calculateChapterStops();
      updateScroll();
    };

    const renderFrame = (time = 0) => {
      if (hidden) return;

      const delta = Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;
      smoothScroll = reducedMotion ? targetScroll : lerp(smoothScroll, targetScroll, 0.065);
      smoothPointer.x = lerp(smoothPointer.x, pointer.x, 0.045);
      smoothPointer.y = lerp(smoothPointer.y, pointer.y, 0.045);

      const { index, mix } = getChapterProgress(smoothScroll);
      const from = chapterPoses[index];
      const to = chapterPoses[Math.min(index + 1, chapterPoses.length - 1)];
      const ease = mix * mix * (3 - 2 * mix);
      const mobileX = compact ? 0 : lerp(from.x, to.x, ease);

      world.position.x = mobileX + smoothPointer.x * 0.18;
      world.position.y = (compact ? 1.45 : lerp(from.y, to.y, ease)) - smoothPointer.y * 0.12;
      world.position.z = lerp(from.z, to.z, ease);
      const sceneScale = (compact ? 0.68 : lerp(from.scale, to.scale, ease));
      world.scale.setScalar(sceneScale);

      if (!reducedMotion) {
        core.rotation.x = time * 0.00017 + smoothScroll * Math.PI * 2.2;
        core.rotation.y = time * 0.00024 + smoothScroll * Math.PI * 3.4;
        shell.rotation.x = -time * 0.00007 + smoothScroll * 1.6;
        shell.rotation.y = time * 0.0001 - smoothScroll * 2.1;
        ringGroup.rotation.z = time * 0.00006 + smoothScroll * Math.PI * 1.7;
        particles.rotation.y = time * 0.000025 + smoothScroll * 0.9;
      }

      camera.position.z = (compact ? 8.5 : 7.2) - Math.sin(smoothScroll * Math.PI) * 0.55;
      camera.position.x = smoothPointer.x * 0.12;
      camera.position.y = -smoothPointer.y * 0.1;
      camera.lookAt(0, 0, 0);

      const hueShift = lerp(from.hue, to.hue, ease);
      coreMaterial.color.setHSL(baseHue.h + hueShift * 0.08, Math.max(baseHue.s, .72), Math.max(baseHue.l, .56));
      coreMaterial.emissiveIntensity = 0.28 + Math.sin(smoothScroll * Math.PI * 4) * 0.08;
      shellMaterial.opacity = 0.08 + (1 - Math.abs(mix - 0.5) * 2) * 0.1;

      renderer.render(scene, camera);
      if (!reducedMotion) {
        frameId = window.requestAnimationFrame(renderFrame);
      }
    };

    const handleVisibility = () => {
      hidden = document.hidden;
      if (!hidden) {
        previousTime = performance.now();
        if (reducedMotion) {
          renderFrame(previousTime);
        } else {
          frameId = window.requestAnimationFrame(renderFrame);
        }
      } else {
        window.cancelAnimationFrame(frameId);
      }
    };

    calculateChapterStops();
    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('pointermove', updatePointer, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);
    frameId = window.requestAnimationFrame(renderFrame);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('pointermove', updatePointer);
      document.removeEventListener('visibilitychange', handleVisibility);
      coreGeometry.dispose();
      coreMaterial.dispose();
      shellGeometry.dispose();
      shellMaterial.dispose();
      ringGroup.children.forEach((ring) => ring.geometry.dispose());
      ringMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="webgl-shell" aria-hidden="true">
      <canvas ref={canvasRef} className="webgl-canvas" />
      <div className="chapter-hud">
        <span className="chapter-hud__count">{chapters[activeChapter].number} / 05</span>
        <span className="chapter-hud__line" />
        <span className="chapter-hud__label">{chapters[activeChapter].label}</span>
      </div>
    </div>
  );
});

ScrollScene3D.displayName = 'ScrollScene3D';

export default ScrollScene3D;
