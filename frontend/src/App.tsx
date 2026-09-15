import React, { useState, useEffect } from 'react';
import {
  Network,
  ShieldAlert,
  Sliders,
} from 'lucide-react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Button } from './components/ui/Button';
import { ToastContainer } from './components/ui/Toast';
import { AnalyzeModal } from './components/dashboard/AnalyzeModal';
import { AnalysisDetailView } from './components/dashboard/AnalysisDetailView';
import { DecisionHeroHeader } from './components/analysis/DecisionHeroHeader';
import { ImpactNetworkGraph } from './components/analysis/ImpactNetworkGraph';
import { NodeDetailPanel } from './components/analysis/NodeDetailPanel';
import { RiskStorySection } from './components/analysis/RiskStorySection';
import { DecisionTimeline } from './components/analysis/DecisionTimeline';
import { UnknownsSection } from './components/analysis/UnknownsSection';
import { ChangeInvestigationHeader } from './components/analysis/ChangeInvestigationHeader';
import { ScenarioComparisonView } from './components/scenarios/ScenarioComparisonView';
import { LearningLoopView } from './components/outcomes/LearningLoopView';
import { OrgMemoryView } from './components/memory/OrgMemoryView';
import { ChangesListView } from './components/changes/ChangesListView';
import { Change, CreateChangePayload, ImpactNode, ToastMessage, ChangeStatus } from './types';
import {
  fetchHealth,
  fetchChanges,
  createChange,
  analyzeChange,
} from './services/api';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [changes, setChanges] = useState<Change[]>([]);
  const [selectedChange, setSelectedChange] = useState<Change | null>(null);
  const [selectedGraphNode, setSelectedGraphNode] = useState<ImpactNode | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNetworkGraph, setShowNetworkGraph] = useState(true);
  const [activeScenarioId, setActiveScenarioId] = useState<string>('expected');

  const [apiConnected, setApiConnected] = useState(false);

  // Toast feedback notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: ToastMessage['type'], title: string, description?: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, title, description }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Load API health and change records on mount
  const loadInitialData = async () => {
    const health = await fetchHealth();
    const isConnected = !!health;
    setApiConnected(isConnected);

    const changeList = await fetchChanges();
    setChanges(changeList);

    if (isConnected) {
      addToast('success', 'FastAPI Engine Online', 'Connected via Vite API proxy (v0.2.0)');
    } else {
      addToast('warning', 'Backend Offline Fallback', 'Running local demonstration fallback.');
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  // Submit new change intake form -> API POST /api/changes -> API POST /api/changes/{id}/analyze
  const handleCreateChange = async (payload: CreateChangePayload) => {
    try {
      const newChange = await createChange(payload);
      const analyzedChange = await analyzeChange(newChange.id);

      setChanges((prev) => [analyzedChange, ...prev.filter((c) => c.id !== analyzedChange.id)]);
      setSelectedChange(analyzedChange);
      setShowNetworkGraph(true);
      setActiveTab('overview');

      addToast(
        'success',
        'Impact Analysis Complete',
        `Evaluated '${analyzedChange.title}' with Risk Score ${analyzedChange.analysis_result?.risk_score}/100.`
      );
    } catch (error) {
      console.error('Failed to submit and analyze change:', error);
      addToast('error', 'Analysis Failed', 'Could not communicate with FastAPI analysis engine.');
    }
  };

  // Re-run analysis on an existing change
  const handleReAnalyze = async (changeId: string) => {
    try {
      const updated = await analyzeChange(changeId);
      setChanges((prev) => prev.map((c) => (c.id === changeId ? updated : c)));
      setSelectedChange(updated);
      addToast('info', 'Re-Analysis Complete', `Updated consequence canvas for ${changeId}`);
    } catch (error) {
      console.error('Failed to re-analyze change:', error);
      addToast('error', 'Re-Analysis Failed');
    }
  };

  const handleExploreDemo = () => {
    const demo = changes.find((c) => c.is_demo) || changes[0];
    if (demo) {
      setSelectedChange(demo);
      setShowNetworkGraph(true);
      setActiveTab('overview');
      addToast('info', 'Loaded Demo Scenario', `Focusing scenario: ${demo.title}`);
    }
  };

  const activeDemoChange = changes.find((c) => c.is_demo) || changes[0];
  const currentStatus: ChangeStatus = activeDemoChange?.status || 'analyzing';

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#07090e] text-ivory-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Left Navigation Compact Rail */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} apiConnected={apiConnected} />

      {/* Main Observatory Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header Command Strip */}
        <Header onAnalyzeClick={() => setIsModalOpen(true)} apiConnected={apiConnected} />

        {/* Main Content Body */}
        <div className="flex-1 flex overflow-hidden">
          <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
            {/* DECISION ROOM (OVERVIEW TAB) */}
            {activeTab === 'overview' && (
              <>
                {/* 1. EDITORIAL DECISION HERO INTRO */}
                <DecisionHeroHeader
                  onAnalyzeClick={() => setIsModalOpen(true)}
                  onExploreDemoClick={handleExploreDemo}
                />

                {/* 2. DECISION TIMELINE LIFECYCLE PIPELINE */}
                <DecisionTimeline currentStatus={currentStatus} />

                {/* 3. COMPACT CHANGE INVESTIGATION TELEMETRY HEADER */}
                {activeDemoChange && (
                  <ChangeInvestigationHeader
                    change={activeDemoChange}
                    onInspectClick={() => setSelectedChange(activeDemoChange)}
                  />
                )}

                {/* 4. PRIMARY CANVAS — REACT FLOW CONSEQUENCE MAP */}
                <section className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xs font-bold text-ivory-100 flex items-center gap-2 font-mono uppercase tracking-wider">
                        WHAT COULD THIS BREAK? — System Consequence Canvas
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-950 text-amber-300 border border-amber-800/60 font-semibold">
                          INTERACTIVE SPATIAL CANVAS
                        </span>
                      </h2>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<Network className="w-3.5 h-3.5 text-amber-400" />}
                        onClick={() => setShowNetworkGraph(!showNetworkGraph)}
                      >
                        {showNetworkGraph ? 'Hide Canvas' : 'Show Canvas'}
                      </Button>
                    </div>
                  </div>

                  {/* React Flow Spatial System Map */}
                  {showNetworkGraph && (
                    <ImpactNetworkGraph
                      changeTitle={activeDemoChange?.title || 'Free Trial: 14 days → 7 days'}
                      onNodeSelect={(node) => setSelectedGraphNode(node)}
                      selectedNodeId={selectedGraphNode?.id}
                      activeScenarioId={activeScenarioId}
                    />
                  )}
                </section>

                {/* 5. VISUAL RISK NARRATIVE ("WHY THIS MATTERS") */}
                <RiskStorySection />

                {/* 6. SURFACED UNKNOWNS & UNCERTAINTY MATRIX */}
                <UnknownsSection unknowns={activeDemoChange?.analysis_result?.assumptions_unknowns} />
              </>
            )}

            {/* CHANGES TAB */}
            {activeTab === 'changes' && (
              <ChangesListView
                changes={changes}
                onSelectChange={(item) => setSelectedChange(item)}
                onAnalyzeChange={handleReAnalyze}
                onNewAnalysisClick={() => setIsModalOpen(true)}
              />
            )}

            {/* SCENARIOS TAB */}
            {activeTab === 'scenarios' && (
              <ScenarioComparisonView
                onSelectScenario={(scId) => {
                  setActiveScenarioId(scId);
                  addToast('info', 'Scenario Active', `Switched network emphasis to ${scId.toUpperCase()} scenario.`);
                }}
              />
            )}

            {/* OUTCOMES TAB */}
            {activeTab === 'outcomes' && <LearningLoopView />}

            {/* ORG MEMORY TAB */}
            {activeTab === 'org_memory' && <OrgMemoryView />}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div className="space-y-6 max-w-3xl">
                <div className="bg-[#0b0e17] border border-slate-800/90 rounded-xl p-6 shadow-xl">
                  <h2 className="text-xl font-bold text-ivory-100 font-sans">Observatory Configuration & Telemetry</h2>
                  <p className="text-xs text-slate-400 mt-1 font-mono">
                    Manage workspace environment, API endpoints, risk thresholds, and notification webhooks.
                  </p>
                </div>

                <div className="bg-[#0b0e17] border border-slate-800/90 rounded-xl p-6 space-y-5 shadow-xl">
                  <h3 className="text-sm font-bold text-ivory-100 flex items-center gap-2 font-mono">
                    <Sliders className="w-4 h-4 text-amber-400" />
                    Vite Proxy & FastAPI Telemetry
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">FastAPI Proxy Endpoint</label>
                      <input
                        type="text"
                        readOnly
                        value="/api (Proxied to http://127.0.0.1:8000)"
                        className="w-full bg-[#07090e] border border-slate-800 rounded px-3 py-2 text-amber-300 font-mono"
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded bg-[#07090e] border border-slate-800 font-mono">
                      <div>
                        <span className="font-semibold text-slate-200 block">FastAPI Telemetry Probe</span>
                        <span className="text-slate-400 text-[11px]">GET /api/health monitoring</span>
                      </div>
                      <span className={`px-2.5 py-1 rounded text-xs font-mono font-bold ${apiConnected ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-rose-950 text-rose-300 border border-rose-800'}`}>
                        API {apiConnected ? 'ONLINE (HTTP 200)' : 'OFFLINE'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0b0e17] border border-slate-800/90 rounded-xl p-6 space-y-4 shadow-xl">
                  <h3 className="text-sm font-bold text-ivory-100 flex items-center gap-2 font-mono">
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                    Risk Guardrail Thresholds
                  </h3>
                  <div className="space-y-2 text-xs text-slate-300 font-mono">
                    <div className="flex items-center justify-between p-3 rounded bg-[#07090e] border border-slate-800">
                      <span>Require mandatory team review for risk scores &gt; 80/100</span>
                      <span className="text-emerald-400 font-bold">Enabled</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded bg-[#07090e] border border-slate-800">
                      <span>Automated Slack alert on critical downstream node identification</span>
                      <span className="text-emerald-400 font-bold">Enabled</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>

          {/* RIGHT SIDE CONTEXTUAL INVESTIGATION INSPECTOR PANEL */}
          {selectedGraphNode && (
            <NodeDetailPanel
              node={selectedGraphNode}
              onClose={() => setSelectedGraphNode(null)}
              onGuardrailAdd={(guardrail) => addToast('success', 'Guardrail Added', guardrail)}
            />
          )}
        </div>
      </div>

      {/* Modal for Creating / Analyzing a Change */}
      <AnalyzeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateChange}
      />

      {/* Detailed Analysis Decision Intelligence View */}
      {selectedChange && (
        <AnalysisDetailView
          change={selectedChange}
          onClose={() => setSelectedChange(null)}
        />
      )}

      {/* Toast Notifications Container */}
      <ToastContainer toasts={toasts} onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))} />
    </div>
  );
};

export default App;
