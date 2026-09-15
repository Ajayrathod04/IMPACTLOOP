import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float } from '@react-three/drei';
import * as THREE from 'three';
import { ImpactNode } from '../types';

interface ObservatorySceneProps {
  changeTitle: string;
  nodes: ImpactNode[];
  selectedNodeId?: string;
  onSelectNode: (node: ImpactNode) => void;
  isPulsing: boolean;
}

// 1. Central Crystalline Change Core Object
const ChangeCoreCore: React.FC<{ title: string; isPulsing: boolean }> = ({ title, isPulsing }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x += delta * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={[0, 0, 0]}>
        <mesh ref={meshRef}>
          <octahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial
            color="#F4C95D"
            emissive="#FF6B5E"
            emissiveIntensity={isPulsing ? 1.5 : 0.6}
            wireframe={false}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        
        {/* Core Title Label */}
        <Text
          position={[0, -1.8, 0]}
          fontSize={0.35}
          color="#F4C95D"
          font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tB3g57-wTXG17725pAa5q5X407CGF3U.woff"
          anchorX="center"
          anchorY="middle"
        >
          {title}
        </Text>
      </group>
    </Float>
  );
};

// 2. Spatial System Node 3D Object
const SystemNode3D: React.FC<{
  node: ImpactNode;
  position: [number, number, number];
  isSelected: boolean;
  onSelect: () => void;
}> = ({ node, position, isSelected, onSelect }) => {
  const groupRef = useRef<THREE.Group>(null);

  const getNodeColor = (provenance: string, severity: number) => {
    if (severity >= 0.7) return '#FF6B5E'; // Warm coral
    if (provenance === 'VERIFIED_FACT') return '#35D6C5'; // Aqua
    if (provenance === 'EXPLICIT_UNKNOWN') return '#F4C95D'; // Gold
    return '#8B7CFF'; // Electric violet
  };

  const nodeTitle = node.title || node.name || 'System Node';
  const nodeColor = getNodeColor(node.provenance || 'PROBABILISTIC_INFERENCE', node.severity_score || 0.5);

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <group
        ref={groupRef}
        position={position}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
      >
        <mesh>
          <boxGeometry args={[1.4, 0.8, 0.4]} />
          <meshStandardMaterial
            color={isSelected ? '#F5F3EE' : nodeColor}
            emissive={nodeColor}
            emissiveIntensity={isSelected ? 1.2 : 0.4}
            roughness={0.3}
            metalness={0.6}
          />
        </mesh>

        <Text
          position={[0, 0, 0.22]}
          fontSize={0.2}
          color="#080B12"
          anchorX="center"
          anchorY="middle"
        >
          {nodeTitle.toUpperCase()}
        </Text>
      </group>
    </Float>
  );
};

// 3. Main 3D Observatory Canvas Scene
export const ObservatoryScene: React.FC<ObservatorySceneProps> = ({
  changeTitle,
  nodes,
  selectedNodeId,
  onSelectNode,
  isPulsing
}) => {
  // Compute orbital positions for system nodes
  const nodePositions: [number, number, number][] = [
    [-3.5, 2.0, 0],   // Signup / Conversion
    [3.5, 2.0, 0],    // Billing
    [-4.5, -0.5, 0],  // Onboarding
    [4.5, -0.5, 0],   // Lifecycle Email
    [-2.5, -3.0, 0],  // Activation
    [2.5, -3.0, 0],   // Customer Success
    [0, -4.5, 0]      // Revenue Exposure
  ];

  return (
    <div className="w-full h-full bg-[#080B12] relative">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#F4C95D" />
        <pointLight position={[-10, -10, -10]} intensity={0.8} color="#8B7CFF" />

        {/* Central Change Core */}
        <ChangeCoreCore title={changeTitle} isPulsing={isPulsing} />

        {/* System Nodes in 3D Space */}
        {nodes.map((node, index) => {
          const pos = nodePositions[index % nodePositions.length];
          return (
            <SystemNode3D
              key={node.id}
              node={node}
              position={pos}
              isSelected={selectedNodeId === node.id}
              onSelect={() => onSelectNode(node)}
            />
          );
        })}

        {/* Camera Controls */}
        <OrbitControls enableZoom={true} enablePan={true} maxPolarAngle={Math.PI / 1.8} />
      </Canvas>
    </div>
  );
};
