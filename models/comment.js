const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  // `name` is required and of type String
  name: {
    type: String,
    required: true
  },
  // `body` is required and of type String
  body: {
    type: String,
    required: true
  }
});

// This creates our model from the above schema, using mongoose's model method
const Comments = mongoose.model("Comments", CommentSchema);

// Export the Comments model
module.exports = Comments;
