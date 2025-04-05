import { FastifyPluginCallback } from "fastify";
import authRoutes from "./auth.routes.js";

const auth: FastifyPluginCallback = (fastify, _opts, done) => {
  fastify.register(authRoutes, {
    prefix: "/auth",
  });

  done();
};

export default auth;
