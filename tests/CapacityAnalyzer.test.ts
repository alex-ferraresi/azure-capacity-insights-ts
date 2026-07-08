import { describe, expect, it } from 'vitest';
import { CapacityClassification } from '../src/domain/enums/CapacityClassification.js';
import { CapacityAnalyzer } from '../src/domain/services/CapacityAnalyzer.js';

describe('CapacityAnalyzer', () => {
  const analyzer = new CapacityAnalyzer();

  it('classifica VM como subdimensionada quando há pico alto', () => {
    const result = analyzer.analyze({
      cpuAverage: 30,
      cpuPeak: 92,
      memoryAverage: 65,
      memoryPeak: 90,
      diskReadGb: 100,
      diskWriteGb: 200
    });

    expect(result.classification).toBe(CapacityClassification.UnderProvisioned);
  });

  it('classifica VM como superdimensionada quando há baixa utilização', () => {
    const result = analyzer.analyze({
      cpuAverage: 5,
      cpuPeak: 22,
      memoryAverage: 20,
      memoryPeak: 35,
      diskReadGb: 10,
      diskWriteGb: 15
    });

    expect(result.classification).toBe(CapacityClassification.OverProvisioned);
  });

  it('classifica VM como adequada quando uso está equilibrado', () => {
    const result = analyzer.analyze({
      cpuAverage: 35,
      cpuPeak: 70,
      memoryAverage: 55,
      memoryPeak: 72,
      diskReadGb: 50,
      diskWriteGb: 80
    });

    expect(result.classification).toBe(CapacityClassification.Adequate);
  });

  it('rejeita percentual inválido', () => {
    expect(() =>
      analyzer.analyze({
        cpuAverage: 101,
        cpuPeak: 10,
        memoryAverage: 10,
        memoryPeak: 10,
        diskReadGb: 0,
        diskWriteGb: 0
      })
    ).toThrow();
  });
});
