import { FastifyPluginCallback } from "fastify";
import path from "path";
import autoload from "@fastify/autoload";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { UserRepository } from "./user.repository.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const plugin: FastifyPluginCallback = (fastify, _opts, done) => {
  fastify.decorate("user", {
    repository: {
      user: new UserRepository(fastify),
    },
  });

  fastify.register(autoload, {
    dir: path.join(__dirname),
    matchFilter: /\.routes\.ts$/,
    autoHooks: true,
    cascadeHooks: true,
    encapsulate: false,
  });

  done();
};

export default plugin;

declare module "fastify" {
  interface FastifyInstance {
    user: {
      repository: {
        user: UserRepository;
      };
    };
  }
}
