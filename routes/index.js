const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Room = require("../models/Room");

// router.get("/", (req, res, next) => {
//   res.send({});
// });

router.get("/users/:search", (req, res) => {
  User.find({ $text: { $search: req.params.search } })
    .then(users => res.json(users))
    .catch(err => console.log(err));
});

router.get("/rooms", (req, res) => {
  Room.find({ _id: { $in: req.user.rooms } })
    .populate("users")
    .then(rooms => {
      res.json(rooms);
    })
    .catch(err => console.log(err));
});

router.get("/messages/:roomid", (req, res) => {
  Room.findOne({ _id: req.params.roomid })
    .populate("messages")
    .then(room => {
      res.json(room.messages);
    })
    .catch(err => console.log(err));
});

module.exports = router;
