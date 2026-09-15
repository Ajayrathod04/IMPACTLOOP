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

import { HeroLanding } from './landing/HeroLanding';
import { ImpactObservatory } from './experience/ImpactObservatory';
import { CommandBar } from './navigation/CommandBar';
import { LifecycleRail, LifecycleStage } from './navigation/LifecycleRail';
import { SpatialControls } from './navigation/SpatialControls';

import { ImpactInspector } from './panels/ImpactInspector';
import { EvidencePanel } from './panels/EvidencePanel';
import { UnknownsPanel } from './panels/UnknownsPanel';
import { ScenarioPanel } from './panels/ScenarioPanel';
import { DecisionPanel } from './panels/DecisionPanel';
import { LearningPanel } from './panels/LearningPanel';
import { IntakeModal } from './components/analysis/IntakeModal';
import { ToastContainer } from './components/ui/Toast';

const CANONICAL_DEMO_CHANGE: ProposedChange = {
  id: 'ch-001',
  title: 'Free Trial: 14 days → 7 days',
  description: 'Shorten free trial duration from 14 days to 7 days to accelerate customer conversion velocity.',
  category: 'ONBOARDING',
  current_state: '14-day free trial',
  proposed_state: '7-day free trial',
  target_metric: 'Trial-to-Paid Conversion Rate',
  owner: 'Product Growth Team',
  risk_level: 'high',
  status: 'analyzing',
  affected_area_count: 5,
  unknown_count: 3,
  recommended_action_count: 2,
  affected_areas: ['Onboarding', 'Conversion', 'Billing', 'Activation', 'Support'],
  is_demo: true,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

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

  // Intelligence Objects
  const [graph, setGraph] = useState<ImpactGraph | null>(null);
  const [evidence, setEvidence] = useState<EvidenceRecord[]>([]);
  const [unknowns, setUnknowns] = useState<ExplicitUnknown[]>([]);
  const [recommendations, setRecommendations] = useState<GuardrailRecommendation[]>([]);
  const [decision, setDecision] = useState<HumanDecision | null>(null);

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

  // Initial Load: Health & Seeded Changes
  useEffect(() => {
    const checkHealthAndLoad = async () => {
      try {
        const health = await fetchHealth();
        setApiConnected(!!health);

        const changeList = await fetchChanges();
        if (changeList && changeList.length > 0) {
          setChanges(changeList);
          setActiveChange(changeList[0]);
        }
      } catch (err) {
        console.error('FastAPI Engine health check failed:', err);
        setApiConnected(false);
      }
    };
    checkHealthAndLoad();
  }, []);

  // Fetch graph & intelligence whenever activeChange updates
  useEffect(() => {
    if (!activeChange?.id) return;

    const loadChangeIntelligence = async () => {
      try {
        const graphData = await fetchImpactGraph(activeChange.id);
        if (graphData) {
          setGraph(graphData);
          setUnknowns(graphData.unknowns || []);
        }

        const evidenceData = await fetchEvidence(activeChange.id);
        if (evidenceData) setEvidence(evidenceData);

        const recData = await fetchRecommendations(activeChange.id);
        if (recData) setRecommendations(recData);

      } catch (err) {
        console.error(`Failed loading intelligence for change ${activeChange.id}:`, err);
      }
    };

    loadChangeIntelligence();
  }, [activeChange.id]);

  // Demo Trigger Action
  const handleExploreDemo = () => {
    const demo = changes.find(c => c.id === 'ch-[#001]' || c.id === 'ch-001') || CANONICAL_DEMO_CHANGE;
    setActiveChange(demo);
    setViewMode('OBSERVATORY');
    setCurrentStage('PREDICT');
    addToast('info', 'Loaded Canonical Demo', `Focusing change scenario: ${demo.title}`);
  };

  // Replay Impact Animation Handler
  const handleReplayImpact = () => {
    setIsPulsing(true);
    addToast('info', 'Replaying Impact Propagation', 'Visualizing causal signal traveling through downstream nodes.');
    setTimeout(() => setIsPulsing(false), 3000);
  };

  // New Analysis Creation Callback
  const handleAnalysisStarted = (newChange: ProposedChange) => {
    setChanges(prev => [newChange, ...prev]);
    setActiveChange(newChange);
    setViewMode('OBSERVATORY');
    setCurrentStage('PREDICT');
    addToast('success', 'Impact Simulation Complete', `Analyzed '${newChange.title}' with spatial consequence graph.`);
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#080B12] text-[#F5F3EE] font-sans selection:bg-[#F4C95D] selection:text-[#080B12]">
      {viewMode === 'LANDING' ? (
        <HeroLanding
          onExploreDemo={handleExploreDemo}
          onOpenAnalysis={() => setIsIntakeOpen(true)}
          apiConnected={apiConnected}
        />
      ) : (
        <div className="w-full h-full relative">
          {/* Top Floating Command Bar */}
          <CommandBar
            changeTitle={activeChange.title}
            apiConnected={apiConnected}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            onOpenIntake={() => setIsIntakeOpen(true)}
            onResetDemo={handleExploreDemo}
            onReturnLanding={() => setViewMode('LANDING')}
          />

          {/* Spatial Canvas (3D WebGL / 2D Graph) */}
          <ImpactObservatory
            changeTitle={activeChange.title}
            graph={graph}
            selectedNode={selectedNode}
            onSelectNode={(node) => {
              setSelectedNode(node);
              setActivePanel(null); // Dismiss other panels on node click
            }}
            is3DMode={is3DMode}
            activeFilter={activeFilter}
            isPulsing={isPulsing}
          />

          {/* Floating Spatial Toolbar Controls */}
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
              if (stage === 'PROVE') setActivePanel('SCENARIOS');
              else if (stage === 'SHIP') setActivePanel('DECISION');
              else if (stage === 'OBSERVE' || stage === 'LEARNED') setActivePanel('LEARNING');
              else setActivePanel(null);
            }}
          />

          {/* Contextual Side Panels */}
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
            <DecisionPanel
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

          {activePanel === 'LEARNING' && (
            <LearningPanel
              changeId={activeChange.id}
              onClose={() => setActivePanel(null)}
            />
          )}
        </div>
      )}

      {/* Propose Change Intake Modal */}
      <IntakeModal
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
