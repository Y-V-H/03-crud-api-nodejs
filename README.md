# CRUD API

## Description
This repository contains a REST API server built with Fastify Node.js framework. 
Zod is used for request validation. All endpoints have test coverage via built-in `node:test` module.

## Requirements
- Node.js version: >=24.10.0
- npm version: >=10.9.2

## Installation
1. Clone the repository
2. Run `npm install`
3. Create `.env` file based on `.env.example`

## Running the app

Development mode:
```bash
npm run start:dev
```

Production mode:
```bash
npm run start:prod
```

## Testing
```bash
npm test
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | Get all products |
| GET | /api/products/:id | Get product by ID |
| POST | /api/products | Create new product |
| PUT | /api/products/:id | Update product |
| DELETE | /api/products/:id | Delete product |

## Product schema
```json
{
  "name": "string",
  "description": "string", 
  "price": "number (> 0)",
  "category": "string",
  "inStock": "boolean"
}
```