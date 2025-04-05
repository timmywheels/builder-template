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
    const { token } = await fastify.oauth2Google.getAccessTokenFromAuthorizationCodeFlow(req);

    const userInfo = await fetch(`https://www.googleapis.com/oauth2/v2/userinfo`, {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    });

    const userInfoData: GoogleUser = await userInfo.json();
    console.log("userInfoData__", userInfoData);
    const existingUser = await fastify.user.repository.user.getUserByEmail(userInfoData.email);

    if (existingUser) {
      console.log("existingUser__", existingUser);
      return res.status(200).send(existingUser);
    }

    await fastify.user.repository.user.createUser({
      email: userInfoData.email,
      name: userInfoData.name,
      avatar: userInfoData.picture,
    });
    // get user
    const user = await fastify.user.repository.user.getUserByEmail(userInfoData.email);
    console.log("user__", user);

    return res.status(200).send(user);
  });
  done();
};

export default routes;
