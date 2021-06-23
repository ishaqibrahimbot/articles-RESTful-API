//Pull in all the essentials
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");


//Set up app
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

//Connect to MongoDB cluster
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology:true});

//Create schema for collection
const articleSchema = new mongoose.Schema ({
  title: String,
  content: String
});

//Initialize mongoose model for articles
const Article = mongoose.model("Article", articleSchema);

///////////////////////////Configure get, post, and delete functions for "/articles" route////////////////
app.route("/articles")

.get((req, res) => {
  Article.find({}, (err, articles) => {
    if (!err) {
      res.send(articles);
    } else {
      res.send(err);
    }
  });
})

.post((req, res) => {
  const articleTitle = req.body.title;
  const articleContent = req.body.content;

  const article = new Article ({
    title: articleTitle,
    content: articleContent
  });

  article.save((err) => {
    if (!err) {
      res.send("Successfully added new article!");
    } else {
      res.send(err);
    }
  });
})

.delete((req, res) => {
  Article.deleteMany({}, (err) => {
    if (!err) {
      res.send("Successfully deleted all articles");
    } else {
      res.send(err);
    }
  });
});


///////////////////////////Requests targeting a specific article////////////////

app.route("/articles/:articleTitle")

.get((req, res) => {
  const articleTitle = req.params.articleTitle;
  Article.findOne({title: articleTitle}, (err, article) => {
    if (!err) {
      if (article) {
        res.send(article);
            } else {
        res.send("No article found with that title, sorry!");
            }
          } else {
      res.send(err);
    }
  });
})

.put((req, res) => {
  Article.update(
    {title: req.params.articleTitle},
    {title: req.body.title, content: req.body.content},
    {overwrite: true},
    (err) => {
      if (!err) {
        res.send("Successfully updated the article!");
      }
    }
  );
})

.patch((req, res) => {
  Article.update(
    {title: req.params.articleTitle},
    {$set: req.body},
    (err) => {
      if (!err) {
        res.send("Successfully updated the article");
      }
    }
  );
})

.delete((req, res) => {
  Article.deleteOne({title: req.params.articleTitle}, (err) => {
    if (!err) {
      res.send("Successfully deleted the article!");
    } else {
      res.send(err);
    }
  });
});

//Use port 3000
app.listen(3000, () => {
  console.log("Started server on port 3000");
});
