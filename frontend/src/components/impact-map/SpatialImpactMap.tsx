import React, { useMemo } from 'react';
import { ReactFlow, Background, Controls, Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ImpactGraph, ImpactNode } from '../../types';

interface SpatialImpactMapProps {
  graph: ImpactGraph | null;
  onSelectNode: (node: ImpactNode) => void;
  selectedNodeId?: string;
}

export const SpatialImpactMap: React.FC<SpatialImpactMapProps> = ({
  graph,
  onSelectNode,
  selectedNodeId
}) => {
  const nodes: ImpactNode[] = graph?.nodes || [
    { id: 'root', title: 'Free Trial 14d → 7d', domain_type: 'Product', depth: 0, confidence_score: 1.0, provenance: 'VERIFIED_FACT', severity_score: 0.9 },
    { id: 'conversion', title: 'Conversion Rate', domain_type: 'Revenue', depth: 1, confidence_score: 0.88, provenance: 'VERIFIED_FACT', severity_score: 0.75 },
    { id: 'onboarding', title: 'Onboarding Velocity', domain_type: 'Product', depth: 2, confidence_score: 0.85, provenance: 'PROBABILISTIC_INFERENCE', severity_score: 0.6 },
    { id: 'activation', title: 'First Week Activation', domain_type: 'Product', depth: 3, confidence_score: 0.78, provenance: 'PROBABILISTIC_INFERENCE', severity_score: 0.82 },
    { id: 'support', title: 'Support Ticket Volume', domain_type: 'Ops', depth: 4, confidence_score: 0.92, provenance: 'EXPLICIT_UNKNOWN', severity_score: 0.65 },
    { id: 'revenue', title: 'Annual ARR Exposure', domain_type: 'Revenue', depth: 5, confidence_score: 0.87, provenance: 'VERIFIED_FACT', severity_score: 0.88 }
  ];

  const flowNodes: Node[] = useMemo(() => {
    const layoutCoords: Record<string, { x: number; y: number }> = {
      root: { x: 300, y: 30 },
      conversion: { x: 150, y: 150 },
      billing: { x: 450, y: 150 },
      onboarding: { x: 150, y: 270 },
      activation: { x: 150, y: 390 },
      support: { x: 450, y: 390 },
      revenue: { x: 300, y: 510 }
    };

    return nodes.map((n, idx) => {
      const pos = layoutCoords[n.id] || { x: 150 + (idx % 3) * 200, y: 100 + Math.floor(idx / 3) * 130 };
      const isSelected = n.id === selectedNodeId;
      const isHighRisk = (n.severity_score || 0) >= 0.7;

      return {
        id: n.id,
        position: pos,
        data: { label: n },
        style: {
          background: isSelected ? '#121829' : '#0E1320',
          color: '#F5F3EE',
          border: isSelected 
            ? '2px solid #F4C95D' 
            : isHighRisk 
            ? '1px solid #FF6B5E' 
            : '1px solid #262838',
          borderRadius: '12px',
          padding: '12px 16px',
          width: '200px',
          boxShadow: isSelected 
            ? '0 0 25px rgba(244, 201, 93, 0.3)' 
            : '0 4px 15px rgba(0,0,0,0.4)',
          fontFamily: 'JetBrains Mono, monospace'
        }
      };
    });
  }, [nodes, selectedNodeId]);

  const flowEdges: Edge[] = useMemo(() => {
    if (graph?.edges && graph.edges.length > 0) {
      return graph.edges.map((e, idx) => ({
        id: e.id || `e-${idx}`,
        source: e.source_id,
        target: e.target_id,
        animated: true,
        style: { stroke: '#8B7CFF', strokeWidth: 2 }
      }));
    }

    return [
      { id: 'e1', source: 'root', target: 'conversion', animated: true, style: { stroke: '#FF6B5E', strokeWidth: 2 } },
      { id: 'e2', source: 'conversion', target: 'onboarding', animated: true, style: { stroke: '#F4C95D', strokeWidth: 2 } },
      { id: 'e3', source: 'onboarding', target: 'activation', animated: true, style: { stroke: '#8B7CFF', strokeWidth: 2 } },
      { id: 'e4', source: 'activation', target: 'support', animated: true, style: { stroke: '#8B7CFF', strokeWidth: 2 } },
      { id: 'e5', source: 'activation', target: 'revenue', animated: true, style: { stroke: '#35D6C5', strokeWidth: 2 } }
    ];
  }, [graph]);

  return (
    <div className="w-full h-full relative bg-[#080B12]">
      <ReactFlow
        nodes={flowNodes}
        edges={flowEdges}
        onNodeClick={(_, node) => {
          const rawNode = node.data.label as ImpactNode;
          onSelectNode(rawNode);
        }}
        fitView
      >
        <Background color="#121829" gap={30} />
        <Controls />
      </ReactFlow>
    </div>
  );
};
