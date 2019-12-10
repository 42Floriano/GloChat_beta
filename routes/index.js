const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const Room = require("../models/Room");
const User = require("../models/User");

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

router.get("/getRooms", (req, res) => {
  Room.find()
    .then(rooms => {
      const filteredRooms = rooms.filter(room =>
        room.users.includes(req.user._id)
      );
      res.json(filteredRooms);
    })
    .catch(err => console.log(err));
});

router.post("/room", (req, res) => {
  const { name, userId } = req.body;
  Room.create({ name: name, users: [userId], messages: [] })
    .then(room => {
      res.json(room);
      User.findOneAndUpdate(
        { _id: userId },
        { $push: { rooms: room._id } }
      ).then(user => {});
    })
    .catch(err => console.log(err));
});

module.exports = router;
