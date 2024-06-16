const Article = require("../../../models/article.model");

// [GET]/api/v1/articles
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    };
    if(req.query.status) {
        find.status = req.query.status;
    }

    const articles = await Article.find(find);
    
    res.json(articles);
};

// [GET]/api/v1/articles/detail/:id
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