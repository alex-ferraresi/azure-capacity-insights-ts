import { z } from 'zod';

export const AnalyzeCapacitySchema = z.object({
  vmName: z.string().min(2),
  resourceGroup: z.string().min(2),
  location: z.string().min(2),
  sku: z.string().min(2),
  metrics: z.object({
    cpuAverage: z.number().min(0).max(100),
    cpuPeak: z.number().min(0).max(100),
    memoryAverage: z.number().min(0).max(100),
    memoryPeak: z.number().min(0).max(100),
    diskReadGb: z.number().min(0),
    diskWriteGb: z.number().min(0)
  })
});

export type AnalyzeCapacityDto = z.infer<typeof AnalyzeCapacitySchema>;
