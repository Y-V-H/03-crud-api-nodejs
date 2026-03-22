import Fastify from 'fastify';
import { routes } from './routes/products.js';

const fastify = Fastify({
  logger: true,
});

fastify.register(routes);

fastify.setNotFoundHandler((request, reply) => {
  reply.status(404).send({ message: 'Route not found' });
});

fastify.setErrorHandler((error, request, reply) => {
  fastify.log.error(error);
  reply.status(500).send({ message: 'Internal server error' });
});

export default fastify;
