import React, { useState, useEffect } from 'react';
import {
  ProposedChange,
  ImpactGraph,
  ImpactNode,
  EvidenceRecord,
  ExplicitUnknown,
  GuardrailRecommendation,
  HumanDecision,
  ToastMessage
} from './types';
import {
  fetchHealth,
  fetchChanges,
  fetchImpactGraph,
  fetchEvidence,
  fetchRecommendations
} from './services/api';

import {
  CANONICAL_DEMO_CHANGE,
  DEMO_GRAPH,
  DEMO_EVIDENCE,
  DEMO_RECOMMENDATIONS,
  DEMO_HUMAN_DECISION
} from './data/demo';

import { LandingExperience } from './experience/LandingExperience';
import { ImpactObservatory } from './experience/ImpactObservatory';
import { CommandHUD } from './hud/CommandHUD';
import { LifecycleRail, LifecycleStage } from './hud/LifecycleRail';
import { SpatialControls } from './hud/SpatialControls';

import { ImpactInspector } from './intelligence/ImpactInspector';
import { EvidencePanel } from './intelligence/EvidencePanel';
import { UnknownsPanel } from './intelligence/UnknownsPanel';
import { ScenarioPanel } from './intelligence/ScenarioPanel';
import { DecisionGate } from './intelligence/DecisionGate';
import { OutcomePanel } from './intelligence/OutcomePanel';
import { MemoryPanel } from './intelligence/MemoryPanel';

import { ChangeIntake } from './intake/ChangeIntake';
import { ToastContainer } from './components/ui/Toast';

import './styles/design-system.css';
import './styles/observatory.css';

export const App: React.FC = () => {
  // Navigation & View State
  const [viewMode, setViewMode] = useState<'LANDING' | 'OBSERVATORY'>('LANDING');
  const [is3DMode, setIs3DMode] = useState<boolean>(true);
  const [currentStage, setCurrentStage] = useState<LifecycleStage>('PREDICT');
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [activePanel, setActivePanel] = useState<string | null>(null);

  // Data & Backend Connectivity
  const [apiConnected, setApiConnected] = useState(false);
  const [changes, setChanges] = useState<ProposedChange[]>([CANONICAL_DEMO_CHANGE]);
  const [activeChange, setActiveChange] = useState<ProposedChange>(CANONICAL_DEMO_CHANGE);

  // Intelligence Objects with Deterministic Fallbacks
  const [graph, setGraph] = useState<ImpactGraph | null>(DEMO_GRAPH);
  const [evidence, setEvidence] = useState<EvidenceRecord[]>(DEMO_EVIDENCE);
  const [unknowns, setUnknowns] = useState<ExplicitUnknown[]>(DEMO_GRAPH.unknowns || []);
  const [recommendations, setRecommendations] = useState<GuardrailRecommendation[]>(DEMO_RECOMMENDATIONS);
  const [decision, setDecision] = useState<HumanDecision | null>(DEMO_HUMAN_DECISION);

  // Active Selected Node & Animation Signals
  const [selectedNode, setSelectedNode] = useState<ImpactNode | null>(null);
  const [isPulsing, setIsPulsing] = useState<boolean>(false);
  const [isIntakeOpen, setIsIntakeOpen] = useState<boolean>(false);

  // Toast Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: ToastMessage['type'], title: string, description?: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, title, description }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Initial Load: Health Check & Backend API Sync
  useEffect(() => {
    const checkHealthAndLoad = async () => {
      try {
        const health = await fetchHealth();
        setApiConnected(!!health);

        if (health) {
          const changeList = await fetchChanges();
          if (changeList && changeList.length > 0) {
            setChanges(changeList);
          }
        }
      } catch (err) {
        console.log('FastAPI engine check failed, operating in deterministic local demo mode:', err);
        setApiConnected(false);
      }
    };
    checkHealthAndLoad();
  }, []);

  // Sync API intelligence when active change changes
  useEffect(() => {
    if (!activeChange?.id) return;

    // Default to deterministic demo data
    setGraph(DEMO_GRAPH);
    setEvidence(DEMO_EVIDENCE);
    setUnknowns(DEMO_GRAPH.unknowns || []);
    setRecommendations(DEMO_RECOMMENDATIONS);

    if (!apiConnected) return;

    const loadChangeIntelligence = async () => {
      try {
        const graphData = await fetchImpactGraph(activeChange.id);
        if (graphData && graphData.nodes?.length > 0) {
          setGraph(graphData);
          if (graphData.unknowns) setUnknowns(graphData.unknowns);
        }

        const evidenceData = await fetchEvidence(activeChange.id);
        if (evidenceData && evidenceData.length > 0) setEvidence(evidenceData);

        const recData = await fetchRecommendations(activeChange.id);
        if (recData && recData.length > 0) setRecommendations(recData);
      } catch (err) {
        console.warn(`Local fallback active for change ${activeChange.id}:`, err);
      }
    };

    loadChangeIntelligence();
  }, [activeChange.id, apiConnected]);

  // Explore Demo Action Handler (Guaranteed zero dead-ends)
  const handleExploreDemo = () => {
    const demo = changes.find((c) => c.id === 'ch-[#001]' || c.id === 'ch-001') || CANONICAL_DEMO_CHANGE;
    setActiveChange(demo);
    setGraph(DEMO_GRAPH);
    setEvidence(DEMO_EVIDENCE);
    setUnknowns(DEMO_GRAPH.unknowns || []);
    setRecommendations(DEMO_RECOMMENDATIONS);
    setViewMode('OBSERVATORY');
    setCurrentStage('PREDICT');
    addToast('info', 'Loaded Canonical Demo', `Focusing change scenario: ${demo.title}`);
  };

  // Replay Impact Animation Handler
  const handleReplayImpact = () => {
    setIsPulsing(true);
    addToast('info', 'Replaying Causal Propagation', 'Visualizing signal traveling through downstream system nodes.');
    setTimeout(() => setIsPulsing(false), 3500);
  };

  // New Analysis Intake Handler
  const handleAnalysisStarted = (newChange: ProposedChange) => {
    setChanges((prev) => [newChange, ...prev]);
    setActiveChange(newChange);
    setViewMode('OBSERVATORY');
    setCurrentStage('PREDICT');
    addToast('success', 'Impact Simulation Complete', `Analyzed '${newChange.title}' with spatial consequence graph.`);
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#080B12] text-[#F5F3EE] font-outfit selection:bg-[#F4C95D] selection:text-[#080B12]">
      {viewMode === 'LANDING' ? (
        <LandingExperience
          onExploreDemo={handleExploreDemo}
          onOpenAnalysis={() => setIsIntakeOpen(true)}
          apiConnected={apiConnected}
        />
      ) : (
        <div className="w-full h-full relative overflow-hidden">
          {/* Top Command HUD */}
          <CommandHUD
            changeTitle={activeChange.title}
            apiConnected={apiConnected}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            onOpenIntake={() => setIsIntakeOpen(true)}
            onResetDemo={handleExploreDemo}
            onReturnLanding={() => setViewMode('LANDING')}
          />

          {/* Main Spatial Observatory Canvas (3D WebGL / 2D Graph) */}
          <ImpactObservatory
            changeTitle={activeChange.title}
            graph={graph}
            selectedNode={selectedNode}
            onSelectNode={(node) => {
              setSelectedNode(node);
              setActivePanel(null); // Dismiss global panels on node focus
            }}
            is3DMode={is3DMode}
            activeFilter={activeFilter}
            isPulsing={isPulsing}
          />

          {/* Floating Toolbar Controls */}
          <SpatialControls
            onReplayImpact={handleReplayImpact}
            onFitView={() => setSelectedNode(null)}
            is3DMode={is3DMode}
            onToggle3D={() => setIs3DMode(!is3DMode)}
            activePanel={activePanel}
            onTogglePanel={(pName) => {
              setActivePanel(activePanel === pName ? null : pName);
              if (selectedNode) setSelectedNode(null);
            }}
          />

          {/* Bottom Interactive Lifecycle Rail */}
          <LifecycleRail
            currentStage={currentStage}
            onStageChange={(stage) => {
              setCurrentStage(stage);
              if (stage === 'PROVE') setActivePanel('EVIDENCE');
              else if (stage === 'DECIDE') setActivePanel('DECISION');
              else if (stage === 'OBSERVE') setActivePanel('OUTCOMES');
              else if (stage === 'LEARN') setActivePanel('MEMORY');
              else setActivePanel(null);
            }}
          />

          {/* Contextual Intelligence Panels */}
          {selectedNode && (
            <ImpactInspector
              node={selectedNode}
              evidence={evidence}
              recommendations={recommendations}
              onClose={() => setSelectedNode(null)}
            />
          )}

          {activePanel === 'EVIDENCE' && (
            <EvidencePanel
              evidence={evidence}
              onClose={() => setActivePanel(null)}
            />
          )}

          {activePanel === 'UNKNOWNS' && (
            <UnknownsPanel
              unknowns={unknowns}
              onClose={() => setActivePanel(null)}
            />
          )}

          {activePanel === 'SCENARIOS' && (
            <ScenarioPanel
              changeId={activeChange.id}
              onClose={() => setActivePanel(null)}
            />
          )}

          {activePanel === 'DECISION' && (
            <DecisionGate
              changeId={activeChange.id}
              currentDecision={decision}
              recommendations={recommendations}
              unknowns={unknowns}
              onDecisionSubmitted={(newDec) => {
                setDecision(newDec);
                addToast('success', 'Decision Gate Recorded', `Proposal decision recorded as ${newDec.status}`);
              }}
              onClose={() => setActivePanel(null)}
            />
          )}

          {activePanel === 'OUTCOMES' && (
            <OutcomePanel
              changeId={activeChange.id}
              onClose={() => setActivePanel(null)}
            />
          )}

          {activePanel === 'MEMORY' && (
            <MemoryPanel
              changeId={activeChange.id}
              onClose={() => setActivePanel(null)}
            />
          )}
        </div>
      )}

      {/* Propose Change Intake Modal */}
      <ChangeIntake
        isOpen={isIntakeOpen}
        onClose={() => setIsIntakeOpen(false)}
        onAnalysisStarted={handleAnalysisStarted}
      />

      {/* Toast Feedback */}
      <ToastContainer
        toasts={toasts}
        onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))}
      />
    </div>
  );
};

export default App;
