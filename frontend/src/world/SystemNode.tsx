import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { ImpactNode } from '../types';

interface SystemNodeProps {
  node: ImpactNode;
  position: [number, number, number];
  isSelected: boolean;
  isPulsing?: boolean;
  onSelect: (node: ImpactNode) => void;
}

export const SystemNode: React.FC<SystemNodeProps> = ({
  node,
  position,
  isSelected,
  isPulsing = false,
  onSelect
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Color mapping based on node severity / provenance / type
  const getNodeColor = () => {
    if (node.node_type === 'high_risk' || node.severity === 'high' || node.severity === 'critical') {
      return '#FF6B5E'; // Coral / Red
    }
    if (node.node_type === 'unknown' || node.provenance === 'EXPLICIT_UNKNOWN') {
      return '#8B7CFF'; // Violet
    }
    if (node.node_type === 'observed' || node.provenance === 'VERIFIED_FACT') {
      return '#35D6C5'; // Cyan
    }
    return '#F4C95D'; // Amber
  };

  const nodeColor = getNodeColor();

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      if (hovered || isSelected) {
        meshRef.current.rotation.x += delta * 0.3;
      }
    }
  });

  const scale = isSelected ? 1.4 : hovered ? 1.2 : isPulsing ? 1.3 : 1.0;

  return (
    <group position={position}>
      {/* 3D Node Mesh */}
      <mesh
        ref={meshRef}
        scale={scale}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(node);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial
          color={nodeColor}
          emissive={nodeColor}
          emissiveIntensity={isSelected || isPulsing ? 1.2 : hovered ? 0.7 : 0.3}
          metalness={0.6}
          roughness={0.3}
          wireframe={node.provenance === 'EXPLICIT_UNKNOWN'}
        />
      </mesh>

      {/* Outer Selection / Pulse Glow Ring */}
      {(isSelected || isPulsing || hovered) && (
        <mesh scale={scale * 1.5}>
          <ringGeometry args={[0.9, 1.05, 32]} />
          <meshBasicMaterial color={nodeColor} transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Floating Spatial Label HUD */}
      <Html position={[0, 1.6, 0]} center distanceFactor={14}>
        <div 
          onClick={() => onSelect(node)}
          className={`cursor-pointer transition-all duration-300 select-none flex flex-col items-center ${
            isSelected ? 'scale-110 z-30' : hovered ? 'scale-105 z-20' : 'z-10'
          }`}
        >
          <div 
            className={`px-3 py-1.5 rounded-lg border backdrop-blur-md shadow-xl flex items-center gap-2 whitespace-nowrap transition-all ${
              isSelected 
                ? 'bg-[#131826] border-[#F4C95D] shadow-[0_0_20px_rgba(244,201,93,0.5)]'
                : 'bg-[#0E1320]/90 border-[#8B7CFF]/30 hover:border-[#F4C95D]/60'
            }`}
          >
            <span 
              className="w-2.5 h-2.5 rounded-full inline-block"
              style={{ backgroundColor: nodeColor, boxShadow: `0 0 10px ${nodeColor}` }}
            />
            <span className="font-outfit font-semibold text-xs text-[#F5F3EE] tracking-wide">
              {node.title || node.name}
            </span>
            {node.severity_score && (
              <span 
                className="font-mono text-[10px] px-1.5 py-0.5 rounded font-bold"
                style={{
                  backgroundColor: `${nodeColor}22`,
                  color: nodeColor,
                  border: `1px solid ${nodeColor}55`
                }}
              >
                {node.severity_score}
              </span>
            )}
          </div>
          
          <div className="mt-1 flex items-center gap-1.5">
            <span className="text-[9px] font-mono text-[#8E9BAE] uppercase bg-[#080B12]/80 px-1.5 py-0.5 rounded border border-white/5">
              {node.domain_type || 'SYSTEM'}
            </span>
            {node.provenance === 'VERIFIED_FACT' && (
              <span className="text-[9px] font-mono text-[#35D6C5] bg-[#35D6C5]/10 px-1.5 py-0.5 rounded border border-[#35D6C5]/30">
                VERIFIED
              </span>
            )}
            {node.provenance === 'EXPLICIT_UNKNOWN' && (
              <span className="text-[9px] font-mono text-[#8B7CFF] bg-[#8B7CFF]/10 px-1.5 py-0.5 rounded border border-[#8B7CFF]/30">
                UNKNOWN
              </span>
            )}
          </div>
        </div>
      </Html>
    </group>
  );
};
