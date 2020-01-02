const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  // `title` is required and of type String
  title: {
    type: String,
    required: true
  },
  // `link` is required and of type String
  link: {
    type: String,
    required: true
  },
  snippet: {
    type: String
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comments"
    }
  ]
});

// This creates our model from the above schema, using mongoose's model method
const Articles = mongoose.model("Articles", ArticleSchema);

// Export the Article model
module.exports = Articles;
