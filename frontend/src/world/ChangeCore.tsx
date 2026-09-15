import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface ChangeCoreProps {
  title: string;
  isPulsing?: boolean;
  onClick?: () => void;
}

export const ChangeCore: React.FC<ChangeCoreProps> = ({
  title,
  isPulsing = false,
  onClick
}) => {
  const outerMeshRef = useRef<THREE.Mesh>(null);
  const innerMeshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (outerMeshRef.current) {
      outerMeshRef.current.rotation.y += delta * 0.4;
      outerMeshRef.current.rotation.x += delta * 0.2;
    }
    if (innerMeshRef.current) {
      innerMeshRef.current.rotation.y -= delta * 0.6;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.3;
      ringRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.2;
    }
  });

  const coreScale = isPulsing ? 1.25 : 1.0;

  return (
    <group position={[0, 0, 0]} onClick={onClick}>
      {/* Outer Crystalline Shell */}
      <mesh ref={outerMeshRef} scale={coreScale * 1.5}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#F4C95D"
          wireframe
          transparent
          opacity={0.65}
          emissive="#F4C95D"
          emissiveIntensity={isPulsing ? 1.5 : 0.4}
        />
      </mesh>

      {/* Inner Glowing Core */}
      <mesh ref={innerMeshRef} scale={coreScale * 0.95}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#FF6B5E"
          emissive="#F4C95D"
          emissiveIntensity={isPulsing ? 2.0 : 0.8}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Orbiting Energy Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.2, 0.03, 16, 100]} />
        <meshBasicMaterial color="#F4C95D" transparent opacity={0.7} />
      </mesh>

      {/* Floating 3D Label */}
      <Html position={[0, 2.5, 0]} center distanceFactor={12}>
        <div className="flex flex-col items-center pointer-events-none select-none">
          <div className="px-3 py-1 rounded-full bg-[#080B12]/90 border border-[#F4C95D] shadow-[0_0_20px_rgba(244,201,93,0.4)] backdrop-blur-md flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F4C95D] animate-ping" />
            <span className="text-xs font-mono font-bold tracking-wider text-[#F4C95D] uppercase">CHANGE CORE</span>
          </div>
          <div className="mt-1 text-sm font-display text-[#F5F3EE] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] tracking-wide whitespace-nowrap">
            {title}
          </div>
          <div className="text-[10px] font-mono text-[#35D6C5] bg-[#0E1320]/80 px-2 py-0.5 rounded border border-[#35D6C5]/30 mt-0.5">
            CHG-001 • PROPOSED
          </div>
        </div>
      </Html>
    </group>
  );
};
