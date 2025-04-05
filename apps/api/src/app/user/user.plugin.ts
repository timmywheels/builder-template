import { FastifyPluginCallback } from "fastify";
import { UserRepository } from "./user.repository.js";
import userRoutes from "./user.routes.js";

const user: FastifyPluginCallback = (fastify, _opts, done) => {
  fastify.decorate("user", {
    repository: {
      user: new UserRepository(fastify),
    },
  });

  fastify.register(userRoutes, {
    prefix: "/user",
  });

  done();
};

export default user;

declare module "fastify" {
  interface FastifyInstance {
    user: {
      repository: {
        user: UserRepository;
      };
    };
  }
}
