export type AzureRegion = 'brazilsouth' | 'eastus' | 'westus' | 'global' | string;

export interface VirtualMachine {
  readonly id: string;
  readonly name: string;
  readonly resourceGroup: string;
  readonly location: AzureRegion;
  readonly sku: string;
}
