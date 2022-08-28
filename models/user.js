const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, required: true, maxLength: 100 },
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
    name: login,
  });

  if (!user) {
    // user = await this.findOne({ email: login });
    user = await this.findOne({
      name: "lk",
    });
  }

  return user;
};

//Export model
module.exports = mongoose.model("User", UserSchema);
