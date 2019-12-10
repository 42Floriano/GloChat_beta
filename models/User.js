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
    defaultLanguage: String,
    rooms: [
      {
        type: Schema.Types.ObjectId,
        ref: "Room"
      }
    ]
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
