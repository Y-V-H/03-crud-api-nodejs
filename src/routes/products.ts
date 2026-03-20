import type { FastifyInstance } from 'fastify';
import { db } from '../db/index.js';
import { z } from 'zod';

interface Params {
  productId: string;
}

async function routes(fastify: FastifyInstance, options: unknown) {
  fastify.get('/api/products', async () => {
    return db;
  });

  fastify.get<{
    Params: Params;
  }>('/api/products/:productId', async (request, reply) => {
    const { productId } = request.params;
    const isValidUUID = z.uuid().safeParse(productId).success;

    if (isValidUUID) {
      const product = db.find((el) => el.id === productId);
      if (product) {
        return product;
      } else {
        reply.status(404).send({ message: 'Product not found' });
      }
    } else {
      reply.status(400).send({ message: 'Invalid product ID' });
    }
  });
}

export { routes };
