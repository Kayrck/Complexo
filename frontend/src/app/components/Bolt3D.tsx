import { Suspense, useMemo, useRef, Component, ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { motion } from "motion/react";
import { BoltMark } from "./BoltMark";

/**
 * The hero artifact: a single, tasteful 3D rendition of the brand bolt. It
 * rotates slowly and leans toward the cursor with dynamic red/white lighting.
 * This is the ONLY heavy 3D element on the site — used purely to anchor the
 * hero. If WebGL is unavailable it degrades to an animated 2D mark.
 */

function BoltMesh() {
  const ref = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const pts: [number, number][] = [
      [0.0, 1.7],
      [-0.95, -0.05],
      [-0.28, -0.05],
      [-0.6, -1.7],
      [0.95, 0.35],
      [0.22, 0.35],
      [0.62, 1.7],
    ];
    shape.moveTo(pts[0][0], pts[0][1]);
    pts.slice(1).forEach(([x, y]) => shape.lineTo(x, y));
    shape.closePath();

    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.55,
      bevelEnabled: true,
      bevelThickness: 0.14,
      bevelSize: 0.12,
      bevelSegments: 5,
      curveSegments: 12,
    });
    geo.center();
    return geo;
  }, []);

  useFrame((_, delta) => {
    const mesh = ref.current;
    if (!mesh) return;
    // gentle continuous spin
    mesh.rotation.y += delta * 0.35;
    // subtle parallax lean toward the pointer
    const targetX = -pointer.y * 0.25;
    mesh.rotation.x += (targetX - mesh.rotation.x) * 0.05;
    mesh.position.x += (pointer.x * 0.15 - mesh.position.x) * 0.05;
  });

  return (
    <mesh ref={ref} geometry={geometry} castShadow>
      <meshStandardMaterial
        color="#E10600"
        metalness={0.85}
        roughness={0.25}
        emissive="#5a0300"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 6, 5]} intensity={2.4} color="#ffffff" />
      <pointLight position={[-5, -2, 4]} intensity={2.2} decay={0} color="#ff2b22" />
      <pointLight position={[4, 4, -4]} intensity={1.4} decay={0} color="#ffd9d6" />
      <BoltMesh />
    </>
  );
}

/** Animated 2D fallback that keeps the hero alive without WebGL. */
const BoltFallback = () => (
  <div className="flex h-full w-full items-center justify-center">
    <motion.div
      animate={{ rotateY: [0, 360] }}
      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      style={{ transformStyle: "preserve-3d" }}
      className="text-complexo-red"
    >
      <BoltMark className="h-32 w-32 drop-shadow-[0_16px_40px_rgba(225,6,0,0.45)]" />
    </motion.div>
  </div>
);

class BoltBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <BoltFallback /> : this.props.children;
  }
}

export const Bolt3D = ({ className = "" }: { className?: string }) => (
  <div className={className}>
    <BoltBoundary>
      <Suspense fallback={<BoltFallback />}>
        <Canvas
          camera={{ position: [0, 0, 9.5], fov: 32 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </BoltBoundary>
  </div>
);
