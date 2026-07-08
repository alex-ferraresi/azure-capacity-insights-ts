export interface CapacityMetrics {
  readonly cpuAverage: number;
  readonly cpuPeak: number;
  readonly memoryAverage: number;
  readonly memoryPeak: number;
  readonly diskReadGb: number;
  readonly diskWriteGb: number;
}
