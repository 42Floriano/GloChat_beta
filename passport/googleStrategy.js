const passport = require("passport");
const User = require("../models/User");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL + "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
        .then(user => {
          if (user) {
            console.log("User", user);

            done(null, user);
          } else {
            return User.create({
              googleId: profile.id,
              username: profile.displayName
            }).then(newUser => {
              done(null, newUser);
            });
          }
        })
        .catch(err => {
          console.log("error", err);
          done(err);
        });
    }
  )
);
