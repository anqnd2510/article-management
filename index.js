const express = require("express");
const database = require("./config/database");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8080;

database.connect();

const Article = require("./models/article.model");

app.get("/articles", async (req, res) => {
    const articles = await Article.find({
        deleted: false
    })
    
    res.json(articles);
});

app.get("/articles/detail/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const article = await Article.findOne({
            _id: id,
            deleted: false
        });
        
        res.json(article);
    } catch (error) {
        res.json(" can't find ")
    }
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});