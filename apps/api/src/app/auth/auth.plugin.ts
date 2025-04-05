import { FastifyPluginCallback } from "fastify";
import path from "path";
import autoload from "@fastify/autoload";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const plugin: FastifyPluginCallback = (fastify, _opts, done) => {
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
