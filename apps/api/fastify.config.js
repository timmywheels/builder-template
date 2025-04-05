/** @type {import('fastify-cli').FastifyConfig} */
export default {
  // This requires tsx to be installed
  options: {
    tsconfig: "tsconfig.json",
    watch: true,
    port: 5001,
    ignore: ["node_modules"],
    logLevel: "info",
  },
};
