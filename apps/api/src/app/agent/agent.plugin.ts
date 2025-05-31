import { FastifyPluginCallback } from "fastify";
import agentRoutes from "./agent.routes.js";

const agent: FastifyPluginCallback = (fastify, _opts, done) => {
  fastify.register(agentRoutes, {
    prefix: "/agent",
  });

  done();
};

export default agent;
