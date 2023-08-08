var express = require("express");
var router = express.Router();
const spotifyWebApi = require("spotify-web-api-node");
const asynchandler = require("express-async-handler");
require("dotenv").config();

/* GET home page. */
const credentials = {
  clientId: process.env.CLIENTID,
  clientSecret: process.env.CLIENTSECRET,
  redirectUri: process.env.REDIRECTURI,
};

const spotifyApi = new spotifyWebApi(credentials);

router.post(
  "/login",
  asynchandler(async (req, res) => {
    try {
      const response = await spotifyApi.authorizationCodeGrant(req.body.code);
      const data = await response.body;
      spotifyApi.setAccessToken(data.access_token);
      spotifyApi.setRefreshToken(data.refresh_token);
      res.json({
        token_expiry: data.expires_in,
        access_token: data.access_token,
        refresh_token: data.refresh_token,
      });
    } catch (err) {
      console.error(err);
    }
  })
);

router.get(
  "/refresh_token",
  asynchandler(async (req, res) => {
    try {
      const response = await spotifyApi.refreshAccessToken();
      // const data = await response.json();
      console.log("token refreshed");
      res.json({
        access_token: response.body["access_token"],
        token_expiry: response.body["expires_in"],
        refresh_token: response.body["refresh_token"],
      });
    } catch (err) {
      console.error("Unable to refresh", err);
    }
  })
);

module.exports = router;
