import { memo, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const chapters = [
  { id: 'hero', number: '01', label: 'System core' },
  { id: 'impact', number: '02', label: 'Signals' },
  { id: 'projects', number: '03', label: 'Product worlds' },
  { id: 'skills', number: '04', label: 'Capability map' },
  { id: 'contact', number: '05', label: 'Convergence' },
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
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, compact ? 9.2 : 7.8);

    const world = new THREE.Group();
    scene.add(world);

    const sculpture = new THREE.Group();
    world.add(sculpture);

    const ribbonPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.5, 3.7, -0.7),
      new THREE.Vector3(0.85, 2.75, 0.15),
      new THREE.Vector3(0.75, 1.55, 0.45),
      new THREE.Vector3(-0.35, 0.35, 0.08),
      new THREE.Vector3(-0.65, -0.9, -0.28),
      new THREE.Vector3(0.62, -2.05, 0.35),
      new THREE.Vector3(0.82, -3.55, -0.38),
    ], false, 'catmullrom', 0.58);

    const coreGeometry = new THREE.TubeGeometry(ribbonPath, lowPower ? 90 : 180, 0.42, lowPower ? 12 : 22, false);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: sceneColor,
      roughness: 0.14,
      metalness: 0.02,
      transmission: lowPower ? 0.18 : 0.62,
      thickness: 1.2,
      ior: 1.32,
      transparent: true,
      opacity: 0.86,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      emissive: 0xfff5df,
      emissiveIntensity: 0.08,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    sculpture.add(core);

    const innerGeometry = new THREE.TubeGeometry(ribbonPath, lowPower ? 80 : 160, 0.055, 10, false);
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: 0xfff1dc,
      emissive: 0xf7d9bc,
      emissiveIntensity: 0.82,
      transparent: true,
      opacity: 0.72,
    });
    const innerGlow = new THREE.Mesh(innerGeometry, innerMaterial);
    sculpture.add(innerGlow);

    const shellGeometry = new THREE.TubeGeometry(ribbonPath, lowPower ? 72 : 144, 0.5, 12, false);
    const shellMaterial = new THREE.MeshPhysicalMaterial({
      color: detailColor,
      transparent: true,
      opacity: 0.12,
      roughness: 0.18,
      metalness: 0,
      side: THREE.BackSide,
    });
    const shell = new THREE.Mesh(shellGeometry, shellMaterial);
    sculpture.add(shell);

    const coinGroup = new THREE.Group();
    coinGroup.position.set(-0.22, -0.38, 0.72);
    coinGroup.rotation.set(Math.PI / 2.15, 0.28, -0.2);
    const coinGeometry = new THREE.CylinderGeometry(0.36, 0.36, 0.09, lowPower ? 32 : 64);
    const coinMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xe6ae37,
      metalness: 0.92,
      roughness: 0.16,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
    });
    const coin = new THREE.Mesh(coinGeometry, coinMaterial);
    coinGroup.add(coin);
    const coinRimGeometry = new THREE.TorusGeometry(0.36, 0.026, 10, lowPower ? 36 : 72);
    const coinRimMaterial = new THREE.MeshStandardMaterial({ color: 0xffde7a, metalness: 0.88, roughness: 0.16 });
    const coinRim = new THREE.Mesh(coinRimGeometry, coinRimMaterial);
    coinRim.rotation.x = Math.PI / 2;
    coinGroup.add(coinRim);
    sculpture.add(coinGroup);

    const ringGroup = new THREE.Group();
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: accentColor,
      transparent: true,
      opacity: 0.035,
      side: THREE.DoubleSide,
    });
    [2.8, 3.45].forEach((radius, index) => {
      const geometry = new THREE.TorusGeometry(radius, 0.012 + index * 0.005, 6, lowPower ? 80 : 140);
      const ring = new THREE.Mesh(geometry, ringMaterial);
      ring.rotation.set(index * 0.55, index * 0.72, index * 0.38);
      ringGroup.add(ring);
    });
    world.add(ringGroup);

    const particleCount = lowPower ? 110 : 300;
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
      size: lowPower ? 0.02 : 0.027,
      transparent: true,
      opacity: 0.34,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    world.add(particles);

    scene.add(new THREE.HemisphereLight(0xffffff, 0xc9c2dd, 2.5));
    const keyLight = new THREE.DirectionalLight(0xfff5e9, 5.5);
    keyLight.position.set(4, 5, 6);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0xc98cff, 18, 18);
    rimLight.position.set(-4, -2, 4);
    scene.add(rimLight);

    const baseSceneColor = new THREE.Color(sceneColor);
    const altSceneColor = new THREE.Color(detailColor);

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
      const mobileX = compact ? 1.35 : lerp(from.x, to.x, ease);

      world.position.x = mobileX + smoothPointer.x * 0.18;
      world.position.y = (compact ? 1.45 : lerp(from.y, to.y, ease)) - smoothPointer.y * 0.12;
      world.position.z = lerp(from.z, to.z, ease);
      const sceneScale = (compact ? 0.68 : lerp(from.scale, to.scale, ease));
      world.scale.setScalar(sceneScale);

      if (!reducedMotion) {
        sculpture.rotation.x = -0.05 + smoothPointer.y * 0.055 + Math.sin(time * 0.00018) * 0.025;
        sculpture.rotation.y = -0.18 + smoothPointer.x * 0.11 + smoothScroll * 0.72;
        sculpture.rotation.z = -0.14 + smoothScroll * 0.34;
        coinGroup.rotation.y = 0.28 + time * 0.00028 + smoothScroll * 1.2;
        ringGroup.rotation.z = time * 0.00006 + smoothScroll * Math.PI * 1.7;
        particles.rotation.y = time * 0.000025 + smoothScroll * 0.9;
      }

      camera.position.z = (compact ? 9.2 : 7.8) - Math.sin(smoothScroll * Math.PI) * 0.55;
      camera.position.x = smoothPointer.x * 0.12;
      camera.position.y = -smoothPointer.y * 0.1;
      camera.lookAt(0, 0, 0);

      const colorMix = 0.08 + Math.sin(smoothScroll * Math.PI * 2) * 0.08;
      coreMaterial.color.copy(baseSceneColor).lerp(altSceneColor, colorMix);
      coreMaterial.emissiveIntensity = 0.06 + Math.sin(smoothScroll * Math.PI * 4) * 0.025;
      shellMaterial.opacity = 0.08 + (1 - Math.abs(mix - 0.5) * 2) * 0.055;

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
      world.traverse((object) => {
        object.geometry?.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach((material) => material.dispose());
        } else {
          object.material?.dispose();
        }
      });
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
