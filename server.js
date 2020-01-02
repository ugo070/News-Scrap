const express = require("express");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");

const PORT = 3000;
const app = express();

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Make public a static folder
//app.use(express.static("public"));

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/newsScrapeDB", { useNewUrlParser: true });

require("./routes/api-routes.js")(app);

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
