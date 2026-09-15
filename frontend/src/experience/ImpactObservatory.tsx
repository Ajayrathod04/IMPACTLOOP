import React from 'react';
import { ImpactGraph, ImpactNode } from '../types';
import { ObservatoryScene } from './ObservatoryScene';
import { SpatialImpactMap } from '../components/impact-map/SpatialImpactMap';
import { Compass } from 'lucide-react';

interface ImpactObservatoryProps {
  changeTitle: string;
  graph: ImpactGraph | null;
  selectedNode: ImpactNode | null;
  onSelectNode: (node: ImpactNode) => void;
  is3DMode: boolean;
  activeFilter: string;
  isPulsing: boolean;
}

export const ImpactObservatory: React.FC<ImpactObservatoryProps> = ({
  changeTitle,
  graph,
  selectedNode,
  onSelectNode,
  is3DMode,
  activeFilter,
  isPulsing
}) => {
  const nodes = graph?.nodes || [];

  // Filter nodes based on activeFilter selection
  const filteredNodes = nodes.filter((n: ImpactNode) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'EVIDENCE') return n.provenance === 'VERIFIED_FACT';
    if (activeFilter === 'INFERRED') return n.provenance === 'PROBABILISTIC_INFERENCE';
    if (activeFilter === 'UNKNOWN') return n.provenance === 'EXPLICIT_UNKNOWN';
    if (activeFilter === 'OBSERVED') return n.provenance === 'VERIFIED_FACT';
    if (activeFilter === 'HIGH_RISK') return (n.severity_score || 0) >= 0.7;
    return true;
  });

  const filteredGraph: ImpactGraph | null = graph ? {
    ...graph,
    nodes: filteredNodes
  } : null;

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#080B12] bg-spatial-grid">
      {/* Visual Mode Renderer */}
      {is3DMode ? (
        <ObservatoryScene
          changeTitle={changeTitle}
          nodes={filteredNodes}
          selectedNodeId={selectedNode?.id}
          onSelectNode={onSelectNode}
          isPulsing={isPulsing}
        />
      ) : (
        <div className="w-full h-full relative">
          <SpatialImpactMap
            graph={filteredGraph}
            onSelectNode={onSelectNode}
            selectedNodeId={selectedNode?.id}
          />
        </div>
      )}

      {/* Floating Orientation Overlay Badge */}
      <div className="absolute top-20 left-6 z-20 pointer-events-none">
        <div className="bg-[#0E1320]/80 border border-[#8B7CFF]/30 px-3.5 py-1.5 rounded-xl backdrop-blur-md flex items-center space-x-2 font-mono text-xs shadow-lg">
          <Compass className="w-4 h-4 text-[#F4C95D] animate-spin" style={{ animationDuration: '20s' }} />
          <span className="text-[#F5F3EE] font-bold">SPATIAL DECISION OBSERVATORY</span>
          <span className="text-[#8B7CFF] text-[10px]">[{is3DMode ? '3D WEBGL' : '2D GRAPH'}]</span>
        </div>
      </div>
    </div>
  );
};
