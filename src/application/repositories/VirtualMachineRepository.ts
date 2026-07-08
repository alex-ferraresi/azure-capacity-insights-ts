import type { VirtualMachine } from '../../domain/entities/VirtualMachine.js';

export interface VirtualMachineRepository {
  findAll(): Promise<ReadonlyArray<VirtualMachine>>;
  findByName(name: string): Promise<VirtualMachine | null>;
}
