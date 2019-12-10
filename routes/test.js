const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  console.log(req.user);
  res.json(req.user);
});

module.exports = router;
