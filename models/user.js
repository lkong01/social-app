const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, required: true, maxLength: 100 },
    password: { type: String, required: true },
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
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
    username: login,
  });

  if (!user) {
    // user = await this.findOne({ email: login });
    user = await this.findOne({
      username: "q",
    });
  }

  return user;
};

//Export model
module.exports = mongoose.model("User", UserSchema);
