import {
  ProposedChange,
  ImpactGraph,
  EvidenceRecord,
  GuardrailRecommendation,
  HumanDecision,
  MetricObservation,
  LearningRecord,
  OrgMemoryItem,
  RiskAssessment
} from '../types';

export const CANONICAL_DEMO_CHANGE: ProposedChange = {
  id: 'ch-001',
  title: 'Free Trial: 14 days → 7 days',
  description: 'Reduce free trial duration from 14 days to 7 days across self-serve acquisition channels to accelerate customer conversion velocity and reduce infrastructure overhead.',
  category: 'ONBOARDING',
  current_state: '14-day free trial',
  proposed_state: '7-day free trial',
  target_metric: 'Trial-to-Paid Conversion Velocity & ARR',
  owner: 'Growth & Product Operations',
  risk_level: 'high',
  status: 'analyzing',
  affected_area_count: 6,
  unknown_count: 3,
  recommended_action_count: 3,
  affected_areas: ['Signup', 'Onboarding', 'Activation', 'Support', 'Billing', 'Revenue'],
  is_demo: true,
  created_at: '2026-09-15T12:00:00Z',
  updated_at: '2026-09-15T12:00:00Z'
};

export const DEMO_RISK_ASSESSMENT: RiskAssessment = {
  overall_risk_score: 82,
  risk_level: 'high',
  model_confidence: 0.88,
  risk_factors: {
    breadth: 0.85,
    downstream_depth: 4,
    severity: 0.80,
    uncertainty: 0.42,
    evidence_strength: 0.89
  },
  explanation: 'High systemic impact: shortening trial window directly forces user activation timeline into 7 days, risking support queue spikes (+34%) and mid-funnel drop-off if onboarding friction is unresolved.'
};

export const DEMO_GRAPH: ImpactGraph = {
  graph_id: 'graph-ch-001',
  change_id: 'ch-001',
  risk_assessment: DEMO_RISK_ASSESSMENT,
  nodes: [
    {
      id: 'node-core',
      title: '14 DAYS → 7 DAYS',
      domain_type: 'CHANGE_CORE',
      depth: 0,
      confidence_score: 1.0,
      severity: 'high',
      severity_score: 82,
      why_affected: 'Primary proposed configuration change.',
      predicted_consequence: 'Shortens user evaluation window by 50%.',
      provenance: 'VERIFIED_FACT',
      node_type: 'known',
      business_effect: 'Accelerates deal velocity or increases bounce rate.'
    },
    {
      id: 'node-signup',
      title: 'SIGNUP & FLOW',
      domain_type: 'ACQUISITION',
      depth: 1,
      confidence_score: 0.94,
      severity: 'low',
      severity_score: 25,
      why_affected: 'Direct entrypoint for new trial signups.',
      predicted_consequence: 'Initial visitor signup volume remains stable (+1.2%).',
      provenance: 'VERIFIED_FACT',
      node_type: 'known',
      evidence_ids: ['ev-001'],
      business_effect: 'No significant top-of-funnel friction.'
    },
    {
      id: 'node-onboarding',
      title: 'ONBOARDING & TOUR',
      domain_type: 'USER_EXPERIENCE',
      depth: 2,
      confidence_score: 0.89,
      severity: 'medium',
      severity_score: 58,
      why_affected: 'User must complete setup in 7 days instead of 14.',
      predicted_consequence: 'Day 3 email nurture campaign triggers 4 days earlier.',
      provenance: 'VERIFIED_FACT',
      node_type: 'known',
      evidence_ids: ['ev-002'],
      business_effect: 'Requires accelerated user time-to-value.'
    },
    {
      id: 'node-activation',
      title: 'ACTIVATION RATE',
      domain_type: 'CORE_METRIC',
      depth: 3,
      confidence_score: 0.76,
      severity: 'high',
      severity_score: 78,
      why_affected: 'Activation window compressed to 168 hours total.',
      predicted_consequence: 'Predicted activation metric shift: +4.2% if guided tour succeeds, -6.1% if unguided.',
      provenance: 'PROBABILISTIC_INFERENCE',
      node_type: 'assumed',
      evidence_ids: ['ev-003'],
      business_effect: 'Critical tipping point for conversion.'
    },
    {
      id: 'node-support',
      title: 'SUPPORT QUEUE',
      domain_type: 'OPERATIONS',
      depth: 3,
      confidence_score: 0.82,
      severity: 'high',
      severity_score: 84,
      why_affected: 'Urgency causes surge in onboarding assistance tickets on Day 5-6.',
      predicted_consequence: 'Ticket volume spike estimated +34% on trial expiry warnings.',
      provenance: 'PROBABILISTIC_INFERENCE',
      node_type: 'high_risk',
      evidence_ids: ['ev-004'],
      business_effect: 'Potential support team burnout and delayed response SLA.'
    },
    {
      id: 'node-revenue',
      title: 'REVENUE & ARR',
      domain_type: 'FINANCIAL',
      depth: 4,
      confidence_score: 0.72,
      severity: 'medium',
      severity_score: 65,
      why_affected: 'Net conversion velocity affects quarterly cash flow.',
      predicted_consequence: 'Estimated +$140k ARR velocity acceleration if churn rate stays < 4%.',
      provenance: 'PROBABILISTIC_INFERENCE',
      node_type: 'assumed',
      business_effect: 'Positive cash flow acceleration with downside churn risk.'
    },
    {
      id: 'node-billing',
      title: 'BILLING & PAYMENT',
      domain_type: 'INFRASTRUCTURE',
      depth: 3,
      confidence_score: 0.95,
      severity: 'low',
      severity_score: 30,
      why_affected: 'Stripe webhook triggers auto-charge on Day 7.',
      predicted_consequence: 'Automatic billing charge sequence executes without system latency.',
      provenance: 'VERIFIED_FACT',
      node_type: 'known',
      business_effect: 'Infrastructure handles billing transition reliably.'
    },
    {
      id: 'node-success',
      title: 'CUSTOMER SUCCESS',
      domain_type: 'ORGANIZATIONAL',
      depth: 4,
      confidence_score: 0.68,
      severity: 'medium',
      severity_score: 62,
      why_affected: 'CS team forced to reach out to high-value leads on Day 4.',
      predicted_consequence: 'High-touch outreach workload increases by 45%.',
      provenance: 'EXPLICIT_UNKNOWN',
      node_type: 'unknown',
      business_effect: 'Resource bottleneck for enterprise sales-assisted trial accounts.'
    }
  ],
  edges: [
    { source_id: 'node-core', target_id: 'node-signup', relationship: 'CONFIGURES', strength: 0.95, confidence: 0.98, provenance: 'VERIFIED_FACT' },
    { source_id: 'node-signup', target_id: 'node-onboarding', relationship: 'TRIGGERS', strength: 0.90, confidence: 0.95, provenance: 'VERIFIED_FACT' },
    { source_id: 'node-onboarding', target_id: 'node-activation', relationship: 'DRIVES', strength: 0.85, confidence: 0.82, provenance: 'PROBABILISTIC_INFERENCE' },
    { source_id: 'node-onboarding', target_id: 'node-support', relationship: 'DELEGATES_FRICTION', strength: 0.78, confidence: 0.80, provenance: 'PROBABILISTIC_INFERENCE' },
    { source_id: 'node-activation', target_id: 'node-billing', relationship: 'INITIATES_CHARGE', strength: 0.92, confidence: 0.96, provenance: 'VERIFIED_FACT' },
    { source_id: 'node-billing', target_id: 'node-revenue', relationship: 'REALIZES', strength: 0.88, confidence: 0.85, provenance: 'VERIFIED_FACT' },
    { source_id: 'node-support', target_id: 'node-success', relationship: 'ESCALATES_TO', strength: 0.65, confidence: 0.70, provenance: 'EXPLICIT_UNKNOWN' }
  ],
  unknowns: [
    {
      id: 'unk-001',
      title: 'Impact on Annual Plan Conversion Rate',
      description: 'Whether 7-day compressed timeline discourages buyers evaluating multi-seat enterprise annual contracts.',
      resolution_method: 'Run 14-day cohort comparison across self-serve vs enterprise sales acquisition channels.',
      impact_level: 'HIGH'
    },
    {
      id: 'unk-002',
      title: 'Support SLA Degradation Threshold',
      description: 'Support queue ticket volume may exceed tier-1 response capacity during peak Monday signup hours.',
      resolution_method: 'Pre-allocate 2 dedicated support engineers during initial rollout week.',
      impact_level: 'MEDIUM'
    },
    {
      id: 'unk-003',
      title: 'Day 5 Re-engagement Email Click-through',
      description: 'Historical email open rate for 7-day trial reminder campaigns is unverified for international cohorts.',
      resolution_method: 'A/B test subject lines with localized urgency messaging.',
      impact_level: 'MEDIUM'
    }
  ]
};

export const DEMO_EVIDENCE: EvidenceRecord[] = [
  {
    id: 'ev-001',
    title: 'Historical Experiment #EXP-2025-04',
    summary: 'Prior 10-day trial test showed 82% of converted accounts completed key activation milestone by Day 5.',
    source_type: 'HISTORICAL_EXPERIMENT',
    strength: 0.91,
    confidence: 0.89,
    node_id: 'node-activation'
  },
  {
    id: 'ev-002',
    title: 'Telemetry Analytics Event Log',
    summary: '94% of users who activate after Day 8 eventually churn within 60 days of payment.',
    source_type: 'TELEMETRY',
    strength: 0.95,
    confidence: 0.94,
    node_id: 'node-onboarding'
  },
  {
    id: 'ev-003',
    title: 'AST Dependency Analysis',
    summary: 'Stripe Billing Webhook listener service handles trial_end events dynamically based on subscriber trial_duration field.',
    source_type: 'AST_DEPENDENCY',
    strength: 0.98,
    confidence: 0.99,
    node_id: 'node-billing'
  },
  {
    id: 'ev-004',
    title: 'Zendesk Ticket Category Distribution',
    summary: '34% increase in "Trial Extension Request" tickets occurred during previous trial limit experiment.',
    source_type: 'SUPPORT_TELEMETRY',
    strength: 0.84,
    confidence: 0.82,
    node_id: 'node-support'
  }
];

export const DEMO_RECOMMENDATIONS: GuardrailRecommendation[] = [
  {
    id: 'rec-001',
    title: 'Automated 3-Day Extension Request Guardrail',
    rationale: 'Provide automated 3-day extension button in-app for user accounts with >3 active team members to protect enterprise leads.',
    category: 'PRODUCT_GUARDRAIL',
    priority: 'HIGH'
  },
  {
    id: 'rec-002',
    title: 'Support Queue Surge Pre-Allocation',
    rationale: 'Schedule extra tier-1 support coverage on Days 5-7 post-launch to maintain <2hr ticket response SLA.',
    category: 'OPERATIONAL',
    priority: 'HIGH'
  },
  {
    id: 'rec-003',
    title: 'Gradual Rollout (25% → 50% → 100%)',
    rationale: 'Roll out 7-day trial config via feature flag to 25% of new traffic for first 72 hours to measure early conversion delta.',
    category: 'DEPLOYMENT_STRATEGY',
    priority: 'CRITICAL'
  }
];

export const DEMO_SCENARIOS = [
  {
    name: 'CONSERVATIVE',
    title: 'Conservative Scenario',
    activation_delta: '+1.5%',
    support_surge: '+45%',
    arr_impact: '+$45,000 ARR',
    risk_score: 72,
    confidence: 0.92,
    description: 'User conversion increases modestly, but support team experiences heavier ticket load due to tight activation deadline.'
  },
  {
    name: 'EXPECTED',
    title: 'Expected Scenario',
    activation_delta: '+4.2%',
    support_surge: '+28%',
    arr_impact: '+$140,000 ARR',
    risk_score: 82,
    confidence: 0.88,
    description: 'Optimized onboarding triggers prompt action. Net activation velocity increases with manageable operational surge.'
  },
  {
    name: 'ADVERSE',
    title: 'Adverse Scenario',
    activation_delta: '-3.8%',
    support_surge: '+60%',
    arr_impact: '-$25,000 ARR',
    risk_score: 94,
    confidence: 0.74,
    description: 'Friction in onboarding causes users to drop off before reaching activation milestone. High ticket bounce rate.'
  }
];

export const DEMO_HUMAN_DECISION: HumanDecision = {
  status: 'APPROVED',
  reviewer: 'Lead Product Manager & Head of Growth',
  rationale: 'Approved for phased rollout (25% initial cohort) with automated 3-day extension guardrail active for multi-seat workspaces.',
  acknowledged_guardrails: ['rec-001', 'rec-003'],
  timestamp: new Date().toISOString()
};

export const DEMO_METRIC_OBSERVATION: MetricObservation[] = [
  {
    metric_name: 'Trial-to-Paid Activation Rate',
    predicted_change: 4.2,
    observed_change: 2.8,
    variance: -1.4,
    confidence_score: 0.86,
    timestamp: new Date().toISOString()
  },
  {
    metric_name: 'Support Ticket Surge Rate',
    predicted_change: 28.0,
    observed_change: 31.5,
    variance: 3.5,
    confidence_score: 0.82,
    timestamp: new Date().toISOString()
  },
  {
    metric_name: 'Time to First Key Action',
    predicted_change: -48.0,
    observed_change: -52.0,
    variance: -4.0,
    confidence_score: 0.91,
    timestamp: new Date().toISOString()
  }
];

export const DEMO_LEARNING: LearningRecord[] = [
  {
    learned_pattern: 'Activation sensitivity to trial length increases by 18% when user onboarding includes multi-seat invite steps.',
    confidence_adjustment: 0.08,
    model_update_summary: 'Updated causal weight for ONBOARDING → ACTIVATION dependency in organizational memory graph.',
    timestamp: new Date().toISOString()
  },
  {
    learned_pattern: 'Automated 3-day trial extension button recovered 64% of at-risk enterprise lead accounts.',
    confidence_adjustment: 0.12,
    model_update_summary: 'Promoted 3-day extension rule to permanent Recommended Guardrail for all onboarding duration changes.',
    timestamp: new Date().toISOString()
  }
];

export const DEMO_ORG_MEMORY: OrgMemoryItem[] = [
  {
    id: 'mem-001',
    title: 'Trial Duration Sensitivity Pattern',
    category: 'LEARNED PATTERN',
    summary: 'Shortening trial periods increases immediate Day 3 engagement but requires active in-app onboarding nudges to prevent Day 6 drop-off.',
    confidence: 0.94,
    source_change_id: 'ch-001',
    provenance: 'VALIDATED_IN_PRODUCTION',
    timestamp: '2026-09-15',
    tags: ['Onboarding', 'Conversion', 'Trial'],
    key_finding: 'Users activate 2.1x faster when trial timer is visible in navigation header.',
    reusable_rule: 'Always pair trial length reductions with in-app milestone progress bar.'
  },
  {
    id: 'mem-002',
    title: 'Stripe Webhook Concurrency Guardrail',
    category: 'KNOWN GUARDRAIL',
    summary: 'Batch trial expiration webhooks to maximum 500 events/sec to prevent downstream analytics DB connection pool exhaustion.',
    confidence: 0.99,
    source_change_id: 'ch-001',
    provenance: 'AST_AND_TELEMETRY',
    timestamp: '2026-09-10',
    tags: ['Billing', 'Infrastructure', 'Stripe'],
    reusable_rule: 'Rate-limit Stripe webhook processing during scheduled mass trial expirations.'
  },
  {
    id: 'mem-003',
    title: 'Support Escalation Ratio Baseline',
    category: 'HISTORICAL OUTCOME',
    summary: 'For every 1,000 active trial users affected by duration changes, anticipate 35 ticket escalations regarding payment dates.',
    confidence: 0.88,
    source_change_id: 'ch-001',
    provenance: 'SUPPORT_TELEMETRY',
    timestamp: '2026-08-28',
    tags: ['Support', 'Operations'],
    historical_outcome: 'Support ticket surge was 31.5% vs 28.0% predicted.'
  }
];
