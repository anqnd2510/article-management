const express = require("express");
const router = express.Router();

const Article = require("../../../models/article.model");

router.get("/", async (req, res) => {
    const articles = await Article.find({
        deleted: false
    })
    
    res.json(articles);
});

router.get("/detail/:id", async (req, res) => {
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
module.exports = router;