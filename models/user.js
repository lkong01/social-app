const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    location: { type: String },
    intro: { type: String },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
    profileImg: {
      type: String,
    },
  },
  { timestamps: true }
);

// Virtual for author's URL
UserSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/user/${this._id}`;
});

UserSchema.statics.findByLogin = async function (login) {
  let user = await this.findOne({
    email: login,
  });

  if (!user) {
    // user = await this.findOne({ email: login });
    user = await this.findOne({
      email: "kbird@email.com",
    });
  }
  console.log(user);
  return user;
};

//Export model
module.exports = mongoose.model("User", UserSchema);
