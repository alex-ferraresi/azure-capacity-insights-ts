import type { FastifyInstance } from 'fastify';
import { InMemoryVirtualMachineRepository } from '../../../infrastructure/repositories/InMemoryVirtualMachineRepository.js';

export async function vmRoutes(app: FastifyInstance): Promise<void> {
  const repository = new InMemoryVirtualMachineRepository();

  app.get('/vms', async () => {
    const data = await repository.findAll();
    return { data };
  });
}
