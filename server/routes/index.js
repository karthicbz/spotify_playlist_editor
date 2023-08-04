var express = require("express");
var router = express.Router();
const spotifyWebApi = require("spotify-web-api-node");
const asynchandler = require("express-async-handler");

/* GET home page. */
router.post(
  "/login",
  asynchandler(async (req, res) => {
    const credentials = {
      clientId: "032f73fa6bac4d4f88026656c01a7654",
      clientSecret: "f7a34671cdee4d4f870a944d743d168e",
      redirectUri: "http://localhost:5173/",
    };

    const spotifyApi = new spotifyWebApi(credentials);
    try {
      const response = await spotifyApi.authorizationCodeGrant(req.body.code);
      const data = await response.body;
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

module.exports = router;
