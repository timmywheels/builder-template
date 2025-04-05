import { FastifyPluginCallback } from "fastify";
import healthRoutes from "./health.routes.js";

const health: FastifyPluginCallback = (fastify, _opts, done) => {
  // add decorators

  // register routes
  fastify.register(healthRoutes, {
    prefix: "/health",
  });

  done();
};

export default health;
