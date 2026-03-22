import fastify from '../app.js';
import { describe, it, before } from 'node:test';
import assert from 'node:assert';
import { db } from '../db/index.js';

describe('Products API', () => {
  before(() => {
    db.length = 0;
  });

  let productId: string;
  const mockProduct = {
    name: 'Canon AV-1',
    description: 'Classic film camera',
    price: 300,
    category: 'electronics',
    inStock: true,
  };

  it('GET - /api/products, should return empty products list', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/api/products',
    });
    const result = await response.json();

    assert.strictEqual(response.statusCode, 200);
    assert.deepStrictEqual(result, []);
  });

  it('POST - add a new product to the db', async () => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/api/products',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mockProduct),
    });

    const result = await response.json();
    productId = result.id;
    // console.log(productId, 'productId');

    assert.strictEqual(response.statusCode, 201);
    assert.ok(result.id);
    assert.strictEqual(result.name, mockProduct.name);
    assert.strictEqual(result.price, mockProduct.price);
  });

  it('GET product by ID', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: `/api/products/${productId}`,
    });

    const result = await response.json();
    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(result.id, productId);
  });

  it('PUT /api/products/${productId} update product price', async () => {
    const putProduct = {
      ...mockProduct,
      price: 301,
    };

    const response = await fastify.inject({
      method: 'PUT',
      url: `/api/products/${productId}`,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(putProduct),
    });

    const result = await response.json();
    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(result.price, putProduct.price);
  });

  it('DELETE product with invalid uui', async () => {
    const response = await fastify.inject({
      method: 'DELETE',
      url: `/api/products/${productId}123test`,
    });

    assert.strictEqual(response.statusCode, 400);
  });

  it("DELETE product doesn't exist", async () => {
    const response = await fastify.inject({
      method: 'DELETE',
      url: `/api/products/550e8400-e29b-41d4-a716-446655440001`,
    });

    assert.strictEqual(response.statusCode, 404);
  });

  it('DELETE product api/products/{productId}', async () => {
    const response = await fastify.inject({
      method: 'DELETE',
      url: `/api/products/${productId}`,
    });

    assert.strictEqual(response.statusCode, 204);
  });
});
