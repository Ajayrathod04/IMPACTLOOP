import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ImpactGraph, ImpactNode } from '../types';
import { ObservatoryLighting } from '../world/ObservatoryLighting';
import { ParticleField } from '../world/ParticleField';
import { ChangeCore } from '../world/ChangeCore';
import { SystemNode } from '../world/SystemNode';
import { ImpactLinks } from '../world/ImpactLinks';

interface ObservatorySceneProps {
  changeTitle: string;
  graph: ImpactGraph | null;
  selectedNode: ImpactNode | null;
  onSelectNode: (node: ImpactNode | null) => void;
  isPulsing?: boolean;
}

export const ObservatoryScene: React.FC<ObservatorySceneProps> = ({
  changeTitle,
  graph,
  selectedNode,
  onSelectNode,
  isPulsing = false
}) => {
  // Spatial coordinates arrangement for nodes in 3D around core [0,0,0]
  const nodePositions = useMemo(() => {
    if (!graph || !graph.nodes) return [];

    const nodesExceptCore = graph.nodes.filter(
      (n) => n.id !== 'node-core' && n.domain_type !== 'CHANGE_CORE'
    );
    const count = nodesExceptCore.length;
    const radius = 8.5;

    return nodesExceptCore.map((node, i) => {
      const angle = (i / count) * Math.PI * 2;
      const yOffset = Math.sin(i * 1.5) * 2.2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      return {
        node,
        position: [x, yOffset, z] as [number, number, number]
      };
    });
  }, [graph]);

  // Compute links from core [0,0,0] to each system node, and edge connections
  const links = useMemo(() => {
    const list: Array<{ start: [number, number, number]; end: [number, number, number]; color?: string }> = [];

    // Core to system nodes
    nodePositions.forEach((item) => {
      list.push({
        start: [0, 0, 0],
        end: item.position,
        color: item.node.severity === 'high' ? '#FF6B5E' : '#8B7CFF'
      });
    });

    // Inter-system node edges if defined in graph.edges
    if (graph?.edges) {
      const posMap = new Map<string, [number, number, number]>();
      nodePositions.forEach((item) => posMap.set(item.node.id, item.position));
      posMap.set('node-core', [0, 0, 0]);

      graph.edges.forEach((edge) => {
        const p1 = posMap.get(edge.source_id);
        const p2 = posMap.get(edge.target_id);
        if (p1 && p2) {
          list.push({
            start: p1,
            end: p2,
            color: edge.confidence > 0.8 ? '#35D6C5' : '#8B7CFF'
          });
        }
      });
    }

    return list;
  }, [nodePositions, graph]);

  return (
    <div className="w-full h-full relative bg-[#080B12] overflow-hidden select-none">
      <Canvas
        camera={{ position: [0, 6, 18], fov: 50 }}
        onPointerDown={(e) => {
          // Deselect on empty canvas click
          if (e.target === e.currentTarget) onSelectNode(null);
        }}
      >
        <ObservatoryLighting />
        <ParticleField count={300} />

        {/* Central Change Core */}
        <ChangeCore
          title={changeTitle}
          isPulsing={isPulsing}
          onClick={() => onSelectNode(null)}
        />

        {/* Downstream System Nodes */}
        {nodePositions.map((item) => (
          <SystemNode
            key={item.node.id}
            node={item.node}
            position={item.position}
            isSelected={selectedNode?.id === item.node.id}
            isPulsing={isPulsing}
            onSelect={onSelectNode}
          />
        ))}

        {/* 3D Causal Links */}
        <ImpactLinks links={links} isPulsing={isPulsing} />

        <OrbitControls
          enablePan
          enableZoom
          enableRotate
          maxDistance={35}
          minDistance={6}
          autoRotate={!selectedNode && !isPulsing}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};
