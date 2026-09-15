import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ImpactGraph, ImpactNode } from '../types';
import { ObservatoryScene } from './ObservatoryScene';
import { CausalGraph2D } from '../graph/CausalGraph2D';

interface Props {
  changeTitle: string;
  graph: ImpactGraph | null;
  selectedNode: ImpactNode | null;
  onSelectNode: (node: ImpactNode | null) => void;
  is3DMode: boolean;
  activeFilter?: string;
  isPulsing?: boolean;
}

interface State {
  hasWebGLError: boolean;
}

class WebGLErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, State> {
  state: State = { hasWebGLError: false };

  static getDerivedStateFromError(_: Error): State {
    return { hasWebGLError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('WebGL Rendering Error captured, falling back to 2D Causal Graph:', error, errorInfo);
  }

  render() {
    if (this.state.hasWebGLError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export const ImpactObservatory: React.FC<Props> = ({
  changeTitle,
  graph,
  selectedNode,
  onSelectNode,
  is3DMode,
  isPulsing = false
}) => {
  if (!is3DMode) {
    return (
      <CausalGraph2D
        graph={graph}
        selectedNode={selectedNode}
        onSelectNode={onSelectNode}
        isPulsing={isPulsing}
      />
    );
  }

  return (
    <WebGLErrorBoundary
      fallback={
        <CausalGraph2D
          graph={graph}
          selectedNode={selectedNode}
          onSelectNode={onSelectNode}
          isPulsing={isPulsing}
        />
      }
    >
      <ObservatoryScene
        changeTitle={changeTitle}
        graph={graph}
        selectedNode={selectedNode}
        onSelectNode={onSelectNode}
        isPulsing={isPulsing}
      />
    </WebGLErrorBoundary>
  );
};
