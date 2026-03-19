import Fastify from 'fastify';
import { routes } from './routes/products.js';

const fastify = Fastify({
  logger: true,
});

fastify.register(routes);
export default fastify;
