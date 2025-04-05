import { FastifyPluginCallback } from "fastify";
import authRoutes from "./auth.routes.js";
import { AuthService } from "./auth.service.js";

const auth: FastifyPluginCallback = (fastify, _opts, done) => {
  fastify.decorate("auth", {
    services: {
      auth: new AuthService(fastify),
    },
  });

  fastify.register(authRoutes, {
    prefix: "/auth",
  });

  done();
};

export default auth;

declare module "fastify" {
  interface FastifyInstance {
    auth: {
      services: { auth: AuthService };
    };
  }
}
