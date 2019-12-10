const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

/* GET home page */

router.get("/messages", (req, res) => {
  Message.find()
    .then(messages => {
      res.json(messages);
    })
    .catch(err => console.log(err));
});

router.post("/room", (req, res) => {
  console.log(req.body);
});

module.exports = router;
