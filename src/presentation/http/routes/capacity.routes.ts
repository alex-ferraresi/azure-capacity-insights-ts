import type { FastifyInstance } from 'fastify';
import { ZodError } from 'zod';
import { AnalyzeCapacitySchema } from '../../../application/dtos/AnalyzeCapacityDto.js';
import { AnalyzeVmCapacityUseCase } from '../../../application/use-cases/AnalyzeVmCapacityUseCase.js';

export async function capacityRoutes(app: FastifyInstance): Promise<void> {
  const useCase = new AnalyzeVmCapacityUseCase();

  app.post('/capacity/analyze', async (request, reply) => {
    try {
      const input = AnalyzeCapacitySchema.parse(request.body);
      const output = useCase.execute(input);
      return reply.status(200).send(output);
    } catch (error) {
      if (error instanceof ZodError) {
        return reply.status(422).send({
          code: 'VALIDATION_ERROR',
          issues: error.issues
        });
      }

      throw error;
    }
  });
}
