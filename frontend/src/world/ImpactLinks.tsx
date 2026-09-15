import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ImpactLinkProps {
  start: [number, number, number];
  end: [number, number, number];
  color?: string;
  isPulsing?: boolean;
}

export const ImpactLink: React.FC<ImpactLinkProps> = ({
  start,
  end,
  color = '#8B7CFF',
  isPulsing = false
}) => {
  const pulseParticleRef = useRef<THREE.Mesh>(null);

  const startVec = useMemo(() => new THREE.Vector3(...start), [start]);
  const endVec = useMemo(() => new THREE.Vector3(...end), [end]);

  const lineMesh = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints([startVec, endVec]);
    const material = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: isPulsing ? 0.95 : 0.4,
      linewidth: isPulsing ? 3 : 1
    });
    return new THREE.Line(geometry, material);
  }, [startVec, endVec, color, isPulsing]);

  useFrame(() => {
    if (pulseParticleRef.current && isPulsing) {
      const time = (Date.now() * 0.002) % 1;
      pulseParticleRef.current.position.lerpVectors(startVec, endVec, time);
    }
  });

  return (
    <group>
      {/* 3D Causal Line */}
      <primitive object={lineMesh} />

      {/* Travelling Pulse Particle */}
      {isPulsing && (
        <mesh ref={pulseParticleRef} position={startVec}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial color="#F4C95D" />
        </mesh>
      )}
    </group>
  );
};

export const ImpactLinks: React.FC<{
  links: Array<{ start: [number, number, number]; end: [number, number, number]; color?: string }>;
  isPulsing?: boolean;
}> = ({ links, isPulsing = false }) => {
  return (
    <group>
      {links.map((link, idx) => (
        <ImpactLink
          key={`link-${idx}`}
          start={link.start}
          end={link.end}
          color={link.color}
          isPulsing={isPulsing}
        />
      ))}
    </group>
  );
};
