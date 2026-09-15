import { Change, CreateChangePayload } from "../types";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

export async function fetchHealth(): Promise<{
  status: string;
  service: string;
  version: string;
} | null> {
  try {
    const res = await fetch(`${API_BASE}/api/health`);
    if (!res.ok) {
      // Fallback try direct localhost:8000
      const directRes = await fetch("http://localhost:8000/api/health");
      if (!directRes.ok) return null;
      return await directRes.json();
    }
    return await res.json();
  } catch (error) {
    try {
      const directRes = await fetch("http://localhost:8000/api/health");
      if (!directRes.ok) return null;
      return await directRes.json();
    } catch {
      console.error("API health check failed:", error);
      return null;
    }
  }
}

export async function fetchChanges(): Promise<Change[]> {
  try {
    const res = await fetch(`${API_BASE}/api/changes`);
    if (!res.ok) {
      const fallback = await fetch("http://localhost:8000/api/changes");
      if (!fallback.ok) return [];
      return await fallback.json();
    }
    return await res.json();
  } catch (error) {
    try {
      const fallback = await fetch("http://localhost:8000/api/changes");
      if (!fallback.ok) return [];
      return await fallback.json();
    } catch {
      console.error("Failed to fetch changes:", error);
      return [];
    }
  }
}

export async function fetchChangeById(
  changeId: string,
): Promise<Change | null> {
  try {
    const res = await fetch(`${API_BASE}/api/changes/${changeId}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error(`Failed to fetch change ${changeId}:`, error);
    return null;
  }
}

export async function createChange(
  payload: CreateChangePayload,
): Promise<Change> {
  const url = `${API_BASE}/api/changes`;
  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      res = await fetch("http://localhost:8000/api/changes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
  } catch {
    res = await fetch("http://localhost:8000/api/changes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }
  if (!res.ok) throw new Error(`Failed to create change: ${res.statusText}`);
  return await res.json();
}

export async function analyzeChange(changeId: string): Promise<Change> {
  const url = `${API_BASE}/api/changes/${changeId}/analyze`;
  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      res = await fetch(
        `http://localhost:8000/api/changes/${changeId}/analyze`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  } catch {
    res = await fetch(`http://localhost:8000/api/changes/${changeId}/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  }
  if (!res.ok)
    throw new Error(`Failed to analyze change ${changeId}: ${res.statusText}`);
  return await res.json();
}
