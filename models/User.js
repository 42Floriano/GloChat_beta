const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    password: String,
    bio: String,
    email: String,
    profilePic: {
      type: String,
      default:
        "https://res.cloudinary.com/djulje0nb/image/upload/v1575889852/glochat/dummy-profile-pic1_jltxbg.png"
    },
    connection: {
      type: Object,
      default: {}
    },
    isOnline: {
      type: Boolean,
      default: false
    },
    defaultLanguage: String,
    rooms: [
      {
        type: Schema.Types.ObjectId,
        ref: "Room"
      }
    ]
  },
  { minimize: false },

  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

userSchema.index({ username: "text", email: "text", defaultLanguage: "text" });

const User = mongoose.model("User", userSchema);
module.exports = User;
