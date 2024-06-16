const Article = require("../../../models/article.model");

// [GET]/api/v1/articles
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    };
    if(req.query.status) {
        find.status = req.query.status;
        // mặc địch query sẽ là ?status luôn
    }

    // Sort
    const sort = {};

    if(req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue
        // còn sort[req.query.sortKey] thì query sẽ thay đổi theo cặp key-value truyền vô
    }
    // End Sort

    const articles = await Article.find(find).sort(sort);
    
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