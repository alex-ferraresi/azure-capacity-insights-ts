import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import Fastify from 'fastify';
import { env } from '../../shared/config/env.js';
import { capacityRoutes } from './routes/capacity.routes.js';
import { healthRoutes } from './routes/health.routes.js';
import { vmRoutes } from './routes/vm.routes.js';

export async function buildApp() {
  const app = Fastify({
    logger: {
      level: env.LOG_LEVEL
    }
  });

  await app.register(cors);
  await app.register(helmet);

  await app.register(healthRoutes);
  await app.register(vmRoutes);
  await app.register(capacityRoutes);

  app.setErrorHandler((error, _request, reply) => {
    app.log.error(error);

    return reply.status(500).send({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Erro interno inesperado.'
    });
  });

  return app;
}
