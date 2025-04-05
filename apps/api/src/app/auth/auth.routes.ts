import { FastifyPluginCallbackZodOpenApi } from "fastify-zod-openapi";

const routes: FastifyPluginCallbackZodOpenApi = (fastify, _opts, done) => {
  fastify.get("/google", {}, (req, res) => {
    return fastify.oauth2Google.generateAuthorizationUri(req, res, (err, uri) => {
      if (err) {
        fastify.log.error(err);
        return res.status(500).send("Error generating authorization URI");
      }
      return res.redirect(uri);
    });
  });

  fastify.get("/google/callback", {}, (req, res) => {
    return fastify.oauth2Google.getAccessTokenFromAuthorizationCodeFlow(req, res, (err, token) => {
      if (err) {
        fastify.log.error(err);
        return res.status(500).send("Error getting access token");
      }

      // create user
      // const user = await fastify.db
      //   .insertInto("users")
      //   .values({
      //     email: token.email,
      //     name: token.name,
      //     avatar: token.picture,
      //   })
      //   .execute();
    });
  });
  done();
};

export default routes;
