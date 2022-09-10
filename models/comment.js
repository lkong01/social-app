const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

// Virtual for author's URL
CommentSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/comment/${this._id}`;
});

//Export model
module.exports = mongoose.model("Comment", CommentSchema);
