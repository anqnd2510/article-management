const Article = require("../../../models/article.model");

module.exports.index = async (req, res) => {
    const articles = await Article.find({
        deleted: false
    })
    
    res.json(articles);
};

module.exports.detail = async (req, res) => {
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
};