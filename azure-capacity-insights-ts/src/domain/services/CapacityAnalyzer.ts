import { CapacityClassification, Severity } from '../enums/CapacityClassification.js';
import type { CapacityMetrics } from '../value-objects/CapacityMetrics.js';

export interface CapacityAnalysisResult {
  readonly classification: CapacityClassification;
  readonly severity: Severity;
  readonly recommendation: string;
  readonly score: number;
}

export class CapacityAnalyzer {
  analyze(metrics: CapacityMetrics): CapacityAnalysisResult {
    this.validate(metrics);

    const pressureScore = Math.round(
      metrics.cpuAverage * 0.25 +
        metrics.cpuPeak * 0.25 +
        metrics.memoryAverage * 0.25 +
        metrics.memoryPeak * 0.25
    );

    if (metrics.cpuPeak >= 85 || metrics.memoryPeak >= 85 || metrics.cpuAverage >= 70 || metrics.memoryAverage >= 75) {
      return {
        classification: CapacityClassification.UnderProvisioned,
        severity: pressureScore >= 80 ? Severity.High : Severity.Medium,
        recommendation: 'Avaliar resize para SKU superior devido a pico elevado de CPU ou memória.',
        score: pressureScore
      };
    }

    if (metrics.cpuAverage <= 10 && metrics.memoryAverage <= 35 && metrics.cpuPeak <= 45 && metrics.memoryPeak <= 55) {
      return {
        classification: CapacityClassification.OverProvisioned,
        severity: Severity.Medium,
        recommendation: 'Avaliar redução de SKU ou consolidação para otimização de custos.',
        score: pressureScore
      };
    }

    return {
      classification: CapacityClassification.Adequate,
      severity: Severity.Low,
      recommendation: 'Capacidade adequada. Manter monitoramento e revisão periódica.',
      score: pressureScore
    };
  }

  private validate(metrics: CapacityMetrics): void {
    const values = Object.entries(metrics);

    for (const [key, value] of values) {
      if (!Number.isFinite(value) || value < 0) {
        throw new Error(`Métrica inválida: ${key}`);
      }
    }

    for (const key of ['cpuAverage', 'cpuPeak', 'memoryAverage', 'memoryPeak'] as const) {
      if (metrics[key] > 100) {
        throw new Error(`Percentual inválido: ${key}`);
      }
    }
  }
}
