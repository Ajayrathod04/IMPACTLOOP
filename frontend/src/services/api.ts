import { 
  Change, 
  CreateChangePayload, 
  ImpactGraph, 
  EvidenceRecord, 
  GuardrailRecommendation, 
  HumanDecision, 
  MetricObservation, 
  LearningRecord, 
  OrgMemoryItem 
} from "../types";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

async function safeFetch(path: string, options?: RequestInit): Promise<Response> {
  try {
    const res = await fetch(`${API_BASE}${path}`, options);
    if (res.ok) return res;
    return await fetch(`http://localhost:8000${path}`, options);
  } catch {
    return await fetch(`http://localhost:8000${path}`, options);
  }
}

export async function fetchHealth(): Promise<{
  status: string;
  service: string;
  version: string;
} | null> {
  try {
    const res = await safeFetch("/api/health");
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("API health check failed:", error);
    return null;
  }
}

export async function fetchChanges(): Promise<Change[]> {
  try {
    const res = await safeFetch("/api/changes");
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch changes:", error);
    return [];
  }
}

export async function fetchChangeById(changeId: string): Promise<Change | null> {
  try {
    const res = await safeFetch(`/api/changes/${changeId}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error(`Failed to fetch change ${changeId}:`, error);
    return null;
  }
}

export async function createChange(payload: CreateChangePayload): Promise<Change> {
  const res = await safeFetch("/api/changes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to create change: ${res.statusText}`);
  return await res.json();
}

export async function analyzeChange(changeId: string): Promise<Change> {
  const res = await safeFetch(`/api/changes/${changeId}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`Failed to analyze change ${changeId}: ${res.statusText}`);
  return await res.json();
}

export async function fetchImpactGraph(changeId: string): Promise<ImpactGraph | null> {
  try {
    const res = await safeFetch(`/api/changes/${changeId}/impact-graph`);
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error(`Failed to fetch impact graph for ${changeId}:`, error);
    return null;
  }
}

export async function fetchEvidence(changeId: string): Promise<EvidenceRecord[]> {
  try {
    const res = await safeFetch(`/api/changes/${changeId}/evidence`);
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error(`Failed to fetch evidence for ${changeId}:`, error);
    return [];
  }
}

export async function fetchScenarios(changeId: string): Promise<any[]> {
  try {
    const res = await safeFetch(`/api/changes/${changeId}/scenarios`);
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error(`Failed to fetch scenarios for ${changeId}:`, error);
    return [];
  }
}

export async function fetchRecommendations(changeId: string): Promise<GuardrailRecommendation[]> {
  try {
    const res = await safeFetch(`/api/changes/${changeId}/recommendations`);
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error(`Failed to fetch recommendations for ${changeId}:`, error);
    return [];
  }
}

export async function submitDecision(
  changeId: string, 
  decisionData: Partial<HumanDecision>
): Promise<{ change_id: string; decision: HumanDecision }> {
  const res = await safeFetch(`/api/changes/${changeId}/decision`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(decisionData),
  });
  if (!res.ok) throw new Error(`Failed to submit decision: ${res.statusText}`);
  return await res.json();
}

export async function submitOutcome(
  changeId: string, 
  observations: MetricObservation[]
): Promise<{ change_id: string; observations: MetricObservation[] }> {
  const res = await safeFetch(`/api/changes/${changeId}/outcome`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(observations),
  });
  if (!res.ok) throw new Error(`Failed to submit outcome: ${res.statusText}`);
  return await res.json();
}

export async function fetchLearning(changeId: string): Promise<LearningRecord[]> {
  try {
    const res = await safeFetch(`/api/changes/${changeId}/learning`);
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error(`Failed to fetch learning for ${changeId}:`, error);
    return [];
  }
}

export async function fetchOrgMemory(): Promise<OrgMemoryItem[]> {
  try {
    const res = await safeFetch("/api/memory");
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch org memory:", error);
    return [];
  }
}
