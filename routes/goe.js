const express = require("express");
const geoip = require("geoip-lite");
const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const geo = geoip.lookup(ip) || {
    country: "DE",
    region: "Berlin"
  };
  res.json(geo);
});

module.exports = router;
