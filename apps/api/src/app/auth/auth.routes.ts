import { FastifyPluginCallbackZodOpenApi } from "fastify-zod-openapi";
import { GoogleUser } from "./auth.schema.js";

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

  fastify.get("/google/callback", {}, async (req, res) => {
    return fastify.oauth2Google.getAccessTokenFromAuthorizationCodeFlow(
      req,
      res,
      async (err, result) => {
        if (err) {
          fastify.log.error(err);
          return res.status(500).send("Error getting access token");
        }

        const userInfo = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo`, {
          headers: {
            Authorization: `Bearer ${result.token.access_token}`,
          },
        });

        const userInfoData: GoogleUser = await userInfo.json();

        // check if user exists
        const existingUser = await fastify.user.repository.user.getUserByEmail(userInfoData.email);

        if (existingUser) {
          return res.status(200).send("User already exists");
        }

        const user = await fastify.user.repository.user.createUser({
          email: userInfoData.email,
          name: userInfoData.name,
          avatar: userInfoData.picture,
        });

        return res.status(200).send("User created");
      }
    );
  });
  done();
};

export default routes;
