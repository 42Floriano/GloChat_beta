const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// /* GET home page */
// router.get("/", (req, res, next) => {
//   res.send({});
// });

router.get("/messages", (req, res) => {
  Message.find()
    .then(messages => {
      res.json(messages);
    })
    .catch(err => console.log(err));
});

module.exports = router;
