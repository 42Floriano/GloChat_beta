const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../models/User");
const uploadCloud = require("../config/cloudinary");

router.post("/signup", uploadCloud.single("imagePath"), (req, res, next) => {
  const { username, password, profilePic, bio, email } = req.body;
  console.log(profilePic);
  const defaultUserImage =
    "https://res.cloudinary.com/djulje0nb/image/upload/v1575889852/glochat/dummy-profile-pic1_jltxbg.png";

  let imagePath = profilePic.length ? profilePic : defaultUserImage;

  if (!username) {
    return res.status(400).json({ message: "Username can't be empty" });
  }
  if (password.length < 8) {
    return res.status(400).json({ message: "Password is too short" });
  }

  User.findOne({ username: username })
    .then(found => {
      if (found) {
        return res.status(400).json({ message: "Username is already taken" });
      }
      return bcrypt
        .genSalt()
        .then(salt => {
          return bcrypt.hash(password, salt);
        })
        .then(hash => {
          return User.create({
            username: username,
            password: hash,
            profilePic: imagePath,
            bio: bio,
            email: email
          });
        })
        .then(newUser => {
          req.login(newUser, err => {
            if (err) res.status(500).json(err);
            else res.json(newUser);
          });
        });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/login" }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log(res);
  }
);

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Error while authenticating" });
    }
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    req.login(user, err => {
      if (err) res.status(500).json(err);
      res.json(user);
    });
  })(req, res, next);
});

router.delete("/logout", (req, res) => {
  req.logout();
  res.json({ message: "Successful logout" });
});

router.get("/loggedin", (req, res) => {
  res.json(req.user);
  console.log(req.session);
});

router.post("/changeDetails", (req, res) => {
  const { password, bio, profilePic } = req.body;

  bcrypt
    .genSalt()
    .then(salt => {
      return bcrypt.hash(password, salt);
    })
    .then(hash => {
      return User.findByIdAndUpdate(
        { _id: req.user._id },
        { password: hash, bio, profilePic },
        { new: true }
      );
    })
    .then(User => {
      return res.json(User);
    })
    .catch(err => {
      return res.status(500).json(err);
    });
});

module.exports = router;
