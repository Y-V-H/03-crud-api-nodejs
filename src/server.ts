import 'dotenv/config';
import fastify from './app.js';

const PORT = Number(process.env.PORT) || 4000;

const start = async () => {
  try {
    await fastify.listen({ port: PORT });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
