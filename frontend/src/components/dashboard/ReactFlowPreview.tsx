import React from 'react';
import { ReactFlow, Background, Controls, Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [
  {
    id: 'root-change',
    type: 'default',
    data: { label: '🎯 Change: Free Trial (14d → 7d)' },
    position: { x: 250, y: 20 },
    ariaLabel: 'Root Change Node',
    style: {
      background: '#1e1b4b',
      color: '#c7d2fe',
      border: '1px solid #6366f1',
      borderRadius: '12px',
      padding: '10px 16px',
      fontWeight: 600,
      fontSize: '12px',
      boxShadow: '0 0 15px rgba(99, 102, 241, 0.2)',
    },
  },
  {
    id: 'node-conversion',
    type: 'default',
    data: { label: '📉 Signup Conversion Rate' },
    position: { x: 50, y: 140 },
    ariaLabel: 'Conversion Node',
    style: {
      background: '#0f172a',
      color: '#f87171',
      border: '1px solid #ef4444',
      borderRadius: '10px',
      padding: '8px 12px',
      fontSize: '11px',
    },
  },
  {
    id: 'node-onboarding',
    type: 'default',
    data: { label: '⚡ Product Activation Flow' },
    position: { x: 220, y: 140 },
    ariaLabel: 'Onboarding Node',
    style: {
      background: '#0f172a',
      color: '#fbbf24',
      border: '1px solid #f59e0b',
      borderRadius: '10px',
      padding: '8px 12px',
      fontSize: '11px',
    },
  },
  {
    id: 'node-sales',
    type: 'default',
    data: { label: '💼 Enterprise Sales Velocity' },
    position: { x: 390, y: 140 },
    ariaLabel: 'Sales Node',
    style: {
      background: '#0f172a',
      color: '#818cf8',
      border: '1px solid #6366f1',
      borderRadius: '10px',
      padding: '8px 12px',
      fontSize: '11px',
    },
  },
  {
    id: 'node-billing',
    type: 'default',
    data: { label: '💳 Payment Gateway & Invoicing' },
    position: { x: 560, y: 140 },
    ariaLabel: 'Billing Node',
    style: {
      background: '#0f172a',
      color: '#34d399',
      border: '1px solid #10b981',
      borderRadius: '10px',
      padding: '8px 12px',
      fontSize: '11px',
    },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1', source: 'root-change', target: 'node-conversion', animated: true, style: { stroke: '#ef4444' } },
  { id: 'e2', source: 'root-change', target: 'node-onboarding', animated: true, style: { stroke: '#f59e0b' } },
  { id: 'e3', source: 'root-change', target: 'node-sales', animated: true, style: { stroke: '#6366f1' } },
  { id: 'e4', source: 'root-change', target: 'node-billing', animated: true, style: { stroke: '#10b981' } },
];

export const ReactFlowPreview: React.FC = () => {
  return (
    <div className="w-full h-56 bg-slate-950/80 rounded-xl border border-slate-800 overflow-hidden relative">
      <div className="absolute top-3 left-3 z-10 bg-slate-900/90 border border-slate-800 px-2.5 py-1 rounded text-[10px] font-mono text-slate-400">
        React Flow Network Foundation (Step 3 Engine Ready)
      </div>
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#1e293b" gap={16} />
        <Controls className="bg-slate-900 border-slate-800 fill-slate-300" />
      </ReactFlow>
    </div>
  );
};
