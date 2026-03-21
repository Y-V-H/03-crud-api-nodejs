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
        return;
      }
    } else {
      reply.status(400).send({ message: 'Invalid product ID' });
      return;
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
      return;
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
      const index = db.findIndex((el) => el.id === productId);
      if (index === -1) {
        reply.status(404).send({ message: 'Product not found' });
        return;
      } else {
        db[index] = { ...result.data, id: productId };

        reply.status(200).send(db[index]);
        return;
      }
    } else {
      reply.status(400).send({ message: 'Invalid request body' });
      return;
    }
  });

  fastify.delete<{
    Params: Params;
  }>('/api/products/:productId', async (request, reply) => {
    const { productId } = request.params;
    const isValidUUID = z.uuid().safeParse(productId).success;

    if (!isValidUUID) {
      reply.status(400).send({ message: 'Invalid product ID' });
      return;
    } else {
      const index = db.findIndex((el) => el.id === productId);
      if (index === -1) {
        reply.status(404).send({ message: 'Product not found' });
        return;
      }
      const deletedElement = db.splice(index, 1);
      reply.status(204).send();
      return;
    }
  });
}

export { routes };
