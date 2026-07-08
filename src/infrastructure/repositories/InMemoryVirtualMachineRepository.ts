import type { VirtualMachineRepository } from '../../application/repositories/VirtualMachineRepository.js';
import type { VirtualMachine } from '../../domain/entities/VirtualMachine.js';

const virtualMachines: ReadonlyArray<VirtualMachine> = [
  {
    id: '/subscriptions/demo/resourceGroups/rg-production/providers/Microsoft.Compute/virtualMachines/prd-app-01',
    name: 'prd-app-01',
    resourceGroup: 'rg-production',
    location: 'brazilsouth',
    sku: 'Standard_B2ms'
  },
  {
    id: '/subscriptions/demo/resourceGroups/rg-production/providers/Microsoft.Compute/virtualMachines/prd-db-01',
    name: 'prd-db-01',
    resourceGroup: 'rg-production',
    location: 'brazilsouth',
    sku: 'Standard_D4s_v5'
  }
];

export class InMemoryVirtualMachineRepository implements VirtualMachineRepository {
  async findAll(): Promise<ReadonlyArray<VirtualMachine>> {
    return virtualMachines;
  }

  async findByName(name: string): Promise<VirtualMachine | null> {
    return virtualMachines.find(vm => vm.name.toLowerCase() === name.toLowerCase()) ?? null;
  }
}
