const cheerio = require("cheerio");
const axios = require("axios");

// Routes
// =============================================================
module.exports = function(app, db) {
  app.get("/", function(req, res) {
    axios.get("https://hypepotamus.com/").then(function(response) {
      const $ = cheerio.load(response.data);
      const results = [];
      $(".entry-title").each(function(i, element) {
        const result = {};
        result.title = $(this)
          .children("a")
          .text();
        result.link = $(this)
          .children("a")
          .attr("href");
        result.snippet = $(this)
          .parent()
          .next()
          .children("p")
          .text();
        results.push(
          new Promise(function(resolve, reject) {
            db.Articles.findOne({ link: result.link })
              .populate("comments")
              .then(function(answer) {
                if (answer !== null) {
                  resolve(answer);
                } else {
                  db.Articles.create(result).then(function(dbres) {
                    resolve(result);
                  });
                }
              });
          })
        );
      });
      async function call(results) {
        const arr = await Promise.all(results);
        res.render("index", {
          articles: arr,
          comments: arr.comments
        });
      }
      call(results);
    });
  });

  app.post("/comment", function(req, res) {
    db.Comments.create({
      name: req.body.name,
      body: req.body.body
    }).then(function(response) {
      db.Articles.updateOne(
        { title: req.body.article },
        { $push: { comments: response._id } }
      ).then(function(answer) {
        res.json(response);
      });
    });
  });
};
