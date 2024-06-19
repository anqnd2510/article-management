const Category = require("../../../models/category.model");

const paginationHelper = require ("../../../helpers/pagination");
const searchHelper = require ("../../../helpers/search");

// [GET]/api/v1/articles
module.exports.index = async (req, res) => {
    const find = {
        deleted: false
    };

    if(req.query.status) {
        find.status = req.query.status;
        // mặc địch query sẽ là ?status luôn
    }

    // Search
    let objectSearch = searchHelper(req.query);

    if (req.query.keyword) {
        find.title = objectSearch.regex;
    }

    // End Search

    // Sort
    const sort = {};

    if(req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue
        // còn sort[req.query.sortKey] thì query sẽ thay đổi theo cặp key-value truyền vô
    }
    // End Sort

    // Pagination
    let initPagination = {
        currentPage: 1,
        limitItems: 2,
    };
    const countArticles = await Article.countDocuments(find);
    const objectPagination = paginationHelper(
        initPagination,
        req.query,
        countArticles
    )

    // End Pagination

    const articles = await Article.find(find)
    .sort(sort)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);
    ;
    
    res.json(articles);
};