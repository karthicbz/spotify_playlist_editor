var express = require("express");
var router = express.Router();
const spotifyWebApi = require("spotify-web-api-node");
const asynchandler = require("express-async-handler");

/* GET home page. */
const credentials = {
  clientId: "032f73fa6bac4d4f88026656c01a7654",
  clientSecret: "f7a34671cdee4d4f870a944d743d168e",
  redirectUri: "http://localhost:5173/",
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
