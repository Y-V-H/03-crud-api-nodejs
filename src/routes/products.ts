import type { FastifyInstance } from 'fastify';
import { db } from '../db/index.js';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { productSchema, type ProductInput } from '../schemas/product.js';

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

  fastify.post<{ Body: ProductInput }>('/api/products', async (request, reply) => {
    const result = productSchema.safeParse(request.body);

    if (!result.success) {
      reply.status(400).send({ message: 'Invalid request body' });
      return;
    } else {
      const newProduct = {
        id: randomUUID(),
        ...result.data,
      };

      db.push(newProduct);
      reply.status(201).send(newProduct);
    }
  });

  fastify.put<{
    Params: Params;
  }>('/api/products/:productId', async (request, reply) => {
    const { productId } = request.params;
    const isValidUUID = z.uuid().safeParse(productId).success;
    const result = productSchema.safeParse(request.body);

    if (!isValidUUID) {
      reply.status(400).send({ message: 'Invalid product ID' });
      return;
    }

    if (result.success) {
      const product = db.find((el) => el.id === productId);
      if (product) {
        const index = db.findIndex((el) => el.id === productId);

        db[index] = { ...result.data, id: productId };

        reply.status(201).send(db[index]);
      } else {
        reply.status(404).send({ message: 'Product not found' });
      }
    } else {
      reply.status(400).send({ message: 'Invalid request body' });
      return;
    }
  });
}

export { routes };
