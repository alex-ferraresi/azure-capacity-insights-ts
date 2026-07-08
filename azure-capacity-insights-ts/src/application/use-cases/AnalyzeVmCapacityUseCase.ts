import { CapacityAnalyzer } from '../../domain/services/CapacityAnalyzer.js';
import type { AnalyzeCapacityDto } from '../dtos/AnalyzeCapacityDto.js';

export class AnalyzeVmCapacityUseCase {
  constructor(private readonly analyzer = new CapacityAnalyzer()) {}

  execute(input: AnalyzeCapacityDto) {
    const result = this.analyzer.analyze(input.metrics);

    return {
      vmName: input.vmName,
      resourceGroup: input.resourceGroup,
      location: input.location,
      sku: input.sku,
      ...result
    };
  }
}
