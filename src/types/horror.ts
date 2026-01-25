/**
 * Horror-specific type definitions for CRAYTE STUDIO ARG
 *
 * This file defines types for the "uncanny" horror elements:
 * - Anomaly levels and progression
 * - Content sealing and rewriting
 * - Horror state management
 * - Observation metadata
 */

// ============================================================================
// Anomaly System
// ============================================================================

/**
 * Anomaly intensity level
 * - none: Normal state, no anomalies
 * - subtle: Barely noticeable glitches (typos, dates)
 * - noticeable: Clear anomalies (missing staff, sealed content)
 * - severe: Major reality breaks (leaked documents, rewritten history)
 */
export type AnomalyLevel = "none" | "subtle" | "noticeable" | "severe";

/**
 * Global horror state for the application
 */
export interface HorrorState {
  /** Current overall anomaly level */
  currentLevel: AnomalyLevel;
  /** List of anomaly IDs that have been exposed to the user */
  exposedAnomalies: string[];
  /** Content IDs that have been sealed/hidden */
  sealedContentIds: string[];
  /** Content IDs that have been rewritten */
  rewrittenContentIds: string[];
}

// ============================================================================
// Sealed Content
// ============================================================================

/**
 * Type of content that can be sealed
 */
export type SealableContentType = "post" | "work" | "staff" | "comment";

/**
 * Record of sealed/hidden content
 */
export interface SealedContent {
  /** Unique identifier for the sealed record */
  id: string;
  /** Type of the original content */
  type: SealableContentType;
  /** Reason for sealing (may be cryptic or redacted) */
  reason: string;
  /** ISO 8601 timestamp of when content was sealed */
  sealedAt: string;
  /** Identifier of who/what sealed it */
  sealedBy: string;
}

// ============================================================================
// Horror Metadata Extensions
// ============================================================================

/**
 * Horror-specific metadata that can be attached to any entity
 * This extends the standard `meta` field in entities
 */
export interface HorrorMeta {
  /** Anomaly level specific to this content */
  anomalyLevel?: AnomalyLevel;
  /** Whether this content is sealed/hidden */
  isSealed?: boolean;
  /** Whether this content has been rewritten */
  isRewritten?: boolean;
  /** Original content before rewriting (for comparison) */
  originalContent?: string;
  /** Cryptic observation notes or warnings */
  observationNotes?: string[];
  /** Timestamp of last anomaly occurrence */
  lastAnomalyAt?: string;
  /** Number of times this content has been affected by anomalies */
  anomalyCount?: number;
}

// ============================================================================
// Anomaly Event
// ============================================================================

/**
 * Type of anomaly event
 */
export type AnomalyEventType =
  | "glitch" // Text glitches, typos
  | "temporal" // Date/time anomalies
  | "deletion" // Content disappearance
  | "rewrite" // Content alteration
  | "appearance" // New content appearing
  | "corruption" // Data corruption
  | "warning"; // System warnings

/**
 * Record of an anomaly occurrence
 */
export interface AnomalyEvent {
  /** Unique identifier */
  id: string;
  /** Type of anomaly */
  type: AnomalyEventType;
  /** Severity level */
  level: AnomalyLevel;
  /** Affected content ID */
  targetId: string;
  /** Type of affected content */
  targetType: SealableContentType;
  /** Description of what happened */
  description: string;
  /** Additional context data */
  metadata: Record<string, unknown>;
  /** ISO 8601 timestamp */
  occurredAt: string;
  /** Whether user has observed this event */
  isObserved: boolean;
}

// ============================================================================
// Observation Log
// ============================================================================

/**
 * User observation/discovery of anomalies
 * Tracks what the user has noticed
 */
export interface ObservationLog {
  /** Unique identifier */
  id: string;
  /** Session identifier */
  sessionId: string;
  /** Anomaly event that was observed */
  anomalyEventId: string;
  /** User's interaction that triggered the observation */
  trigger: string;
  /** ISO 8601 timestamp */
  observedAt: string;
  /** Any user notes or reactions */
  notes?: string;
}

// ============================================================================
// Rewritten Content
// ============================================================================

/**
 * Record of content that has been rewritten by the horror system
 */
export interface RewrittenContent {
  /** Unique identifier */
  id: string;
  /** Original content ID */
  originalId: string;
  /** Content type */
  type: SealableContentType;
  /** Original content snapshot */
  originalSnapshot: string;
  /** Rewritten content */
  rewrittenSnapshot: string;
  /** Reason for rewriting */
  rewriteReason: string;
  /** ISO 8601 timestamp of rewrite */
  rewrittenAt: string;
  /** Whether the rewrite is currently active */
  isActive: boolean;
}

// ============================================================================
// Type Guards
// ============================================================================

/**
 * Type guard for HorrorMeta
 */
export function isHorrorMeta(obj: unknown): obj is HorrorMeta {
  if (typeof obj !== "object" || obj === null) return false;
  const meta = obj as Record<string, unknown>;

  // Check that if anomalyLevel exists, it's a valid value
  if (meta.anomalyLevel !== undefined) {
    const validLevels: AnomalyLevel[] = [
      "none",
      "subtle",
      "noticeable",
      "severe",
    ];
    if (!validLevels.includes(meta.anomalyLevel as AnomalyLevel)) {
      return false;
    }
  }

  // Check boolean flags if they exist
  if (meta.isSealed !== undefined && typeof meta.isSealed !== "boolean") {
    return false;
  }
  if (meta.isRewritten !== undefined && typeof meta.isRewritten !== "boolean") {
    return false;
  }

  return true;
}

/**
 * Type guard for SealedContent
 */
export function isSealedContent(obj: unknown): obj is SealedContent {
  if (typeof obj !== "object" || obj === null) return false;
  const s = obj as Record<string, unknown>;
  return (
    typeof s.id === "string" &&
    typeof s.type === "string" &&
    typeof s.reason === "string" &&
    typeof s.sealedAt === "string" &&
    typeof s.sealedBy === "string"
  );
}

/**
 * Type guard for AnomalyEvent
 */
export function isAnomalyEvent(obj: unknown): obj is AnomalyEvent {
  if (typeof obj !== "object" || obj === null) return false;
  const e = obj as Record<string, unknown>;
  return (
    typeof e.id === "string" &&
    typeof e.type === "string" &&
    typeof e.level === "string" &&
    typeof e.targetId === "string" &&
    typeof e.targetType === "string" &&
    typeof e.isObserved === "boolean"
  );
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Check if an anomaly level is more severe than another
 */
export function isMoreSevere(
  level: AnomalyLevel,
  compared: AnomalyLevel,
): boolean {
  const severity: Record<AnomalyLevel, number> = {
    none: 0,
    subtle: 1,
    noticeable: 2,
    severe: 3,
  };
  return severity[level] > severity[compared];
}

/**
 * Get the next anomaly level in progression
 */
export function getNextAnomalyLevel(
  current: AnomalyLevel,
): AnomalyLevel | null {
  const progression: Record<AnomalyLevel, AnomalyLevel | null> = {
    none: "subtle",
    subtle: "noticeable",
    noticeable: "severe",
    severe: null, // Max level
  };
  return progression[current];
}

/**
 * Check if content has horror metadata
 */
export function hasHorrorMeta(meta: Record<string, unknown>): boolean {
  return (
    meta.anomalyLevel !== undefined ||
    meta.isSealed !== undefined ||
    meta.isRewritten !== undefined ||
    meta.observationNotes !== undefined
  );
}
