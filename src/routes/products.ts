import type { FastifyInstance } from 'fastify';
// import { uuidValidate } from 'node';
import { db } from '../db/index.js';
import { z } from 'zod';

async function routes(fastify: FastifyInstance, options: unknown) {
  fastify.get('/api/products', async () => {
    return db;
  });
  // fastify.get('/api/products:productID', async (request, reply) => {
  //   const { productID } = request.params;
  //   const isValidUUID = z.string().uuid().safeParse(productID).success;
  //   if (isValidUUID) {
  //     const requestedProduct = db.filter((el) => el.id === productID);
  //     return requestedProduct;
  //   } else {
  //     return;
  //   }
  //   return db;
  // });
}

export { routes };
