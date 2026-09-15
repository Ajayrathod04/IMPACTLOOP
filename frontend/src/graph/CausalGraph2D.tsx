import React, { useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ImpactGraph, ImpactNode } from '../types';

interface CausalGraph2DProps {
  graph: ImpactGraph | null;
  selectedNode: ImpactNode | null;
  onSelectNode: (node: ImpactNode | null) => void;
  isPulsing?: boolean;
}

export const CausalGraph2D: React.FC<CausalGraph2DProps> = ({
  graph,
  selectedNode,
  onSelectNode,
  isPulsing = false
}) => {
  const nodes: Node[] = useMemo(() => {
    if (!graph || !graph.nodes || graph.nodes.length === 0) {
      return [
        {
          id: 'core-demo',
          position: { x: 350, y: 50 },
          data: { label: '14 DAYS → 7 DAYS (CHANGE CORE)' },
          style: { background: '#F4C95D', color: '#080B12', fontWeight: 'bold', padding: 12, borderRadius: 8 }
        }
      ];
    }

    // Spatial arrangement in 2D grid/tree layout
    const layoutCoords: Record<string, { x: number; y: number }> = {
      'node-core': { x: 450, y: 40 },
      'node-signup': { x: 200, y: 180 },
      'node-onboarding': { x: 700, y: 180 },
      'node-activation': { x: 200, y: 340 },
      'node-support': { x: 700, y: 340 },
      'node-billing': { x: 200, y: 500 },
      'node-revenue': { x: 450, y: 620 },
      'node-success': { x: 700, y: 500 }
    };

    return graph.nodes.map((node, index) => {
      const isSelected = selectedNode?.id === node.id;
      const coord = layoutCoords[node.id] || {
        x: 150 + (index % 3) * 300,
        y: 120 + Math.floor(index / 3) * 160
      };

      let bgColor = '#0E1320';
      let borderColor = 'rgba(139, 124, 255, 0.3)';
      let textColor = '#F5F3EE';

      if (node.domain_type === 'CHANGE_CORE' || node.id === 'node-core') {
        bgColor = '#131826';
        borderColor = '#F4C95D';
        textColor = '#F4C95D';
      } else if (node.severity === 'high' || node.severity === 'critical') {
        borderColor = '#FF6B5E';
      } else if (node.provenance === 'VERIFIED_FACT') {
        borderColor = '#35D6C5';
      } else if (node.provenance === 'EXPLICIT_UNKNOWN') {
        borderColor = '#8B7CFF';
      }

      if (isSelected) {
        borderColor = '#F4C95D';
        bgColor = '#1A2234';
      }

      return {
        id: node.id,
        position: coord,
        data: {
          label: (
            <div className="flex flex-col gap-1 p-1">
              <div className="flex items-center justify-between gap-2">
                <span className="font-outfit font-bold text-xs" style={{ color: textColor }}>
                  {node.title || node.name}
                </span>
                {node.severity_score && (
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#080B12] text-[#FF6B5E] border border-[#FF6B5E]/30">
                    {node.severity_score}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono opacity-80">
                <span>{node.domain_type}</span>
                <span>Depth {node.depth}</span>
              </div>
            </div>
          )
        },
        style: {
          background: bgColor,
          border: `2px solid ${borderColor}`,
          borderRadius: '10px',
          color: textColor,
          boxShadow: isSelected
            ? '0 0 25px rgba(244, 201, 93, 0.4)'
            : isPulsing
            ? '0 0 20px rgba(139, 124, 255, 0.3)'
            : '0 8px 24px rgba(0, 0, 0, 0.5)',
          width: 220,
          cursor: 'pointer'
        }
      };
    });
  }, [graph, selectedNode, isPulsing]);

  const edges: Edge[] = useMemo(() => {
    if (!graph || !graph.edges) return [];

    return graph.edges.map((edge, idx) => ({
      id: edge.id || `edge-${idx}`,
      source: edge.source_id,
      target: edge.target_id,
      label: edge.relationship,
      animated: isPulsing,
      style: { stroke: isPulsing ? '#F4C95D' : '#8B7CFF', strokeWidth: isPulsing ? 3 : 1.5 },
      labelStyle: { fill: '#8E9BAE', fontSize: 10, fontFamily: 'JetBrains Mono' },
      labelBgStyle: { fill: '#080B12', fillOpacity: 0.8 },
      markerEnd: { type: MarkerType.ArrowClosed, color: isPulsing ? '#F4C95D' : '#8B7CFF' }
    }));
  }, [graph, isPulsing]);

  return (
    <div className="w-full h-full relative bg-[#080B12] overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodeClick={(_, node) => {
          const match = graph?.nodes.find((n) => n.id === node.id);
          if (match) onSelectNode(match);
        }}
        onPaneClick={() => onSelectNode(null)}
        fitView
      >
        <Background color="#131826" gap={30} size={1} />
        <Controls className="!bg-[#0E1320] !border-[#8B7CFF]/30 !text-[#F5F3EE] !rounded-lg" />
        <MiniMap
          nodeColor={(node) => (node.style?.border as string)?.split(' ')[2] || '#8B7CFF'}
          maskColor="rgba(8, 11, 18, 0.85)"
          className="!bg-[#0E1320] !border-[#8B7CFF]/30 !rounded-lg"
        />
      </ReactFlow>

      {/* 2D HUD Indicator */}
      <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-lg bg-[#0E1320]/90 border border-[#8B7CFF]/30 backdrop-blur-md flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#8B7CFF]" />
        <span className="font-mono text-xs text-[#F5F3EE]">CAUSAL GRAPH 2D OBSERVATORY MODE</span>
      </div>
    </div>
  );
};
