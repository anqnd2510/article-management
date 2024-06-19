const Article = require("../../../models/article.model");
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

// [PATCH]/api/v1/articles/change-status/:id
module.exports.changeStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.body.status;

        await Article.updateOne({
            _id: id
        }, {
            status: status
        });
        
        res.json({
            code: 200,
            message: "Thay đổi trạng thái thành công"
        });
    } catch (error) {
        res.json({
            code: 400,
            message: "Thay đổi trạng thái thất bại"
        });
    }
};
// change status chưa tối ưu lắm đâu, có thể thay status thành bất cứ thứ gì

// [PATCH]/api/v1/articles/change-multi
module.exports.changeMulti = async (req, res) => {
    try {
        const { ids, key, value } = req.body;
        
        switch (key) {
            case "status":
                await Article.updateMany({
                    _id: { $in: ids}
                    // lấy ra được id trong ids bằng $in: ids
                }, {
                    status: value
                });
                res.json({
                    code: 200,
                    message: "Thay đổi trạng thái thành công"
                });
                break;
            case "delete":
                await Article.updateMany({
                    _id: { $in: ids}
                }, {
                    deleted: true,
                    deletedAt: new Date()
                });
                res.json({
                    code: 200,
                    message: "Xóa thành công!"
                });
                break;
            default:
                res.json({
                    code: 400,
                    message: "Không tồn tại"
                });
                break;
        }
    } catch (error) {
        res.json({
            code: 400,
            message: "Thay đổi trạng thái thất bại"
        });
    }
};

// [POST]/api/v1/articles/create
module.exports.create = async (req, res) => {
    try {
        const article = new Article(req.body);
        const data = await article.save();

        res.json({
            code: 200,
            message: "Tạo bài viết mới thành công",
            data: data
        });
    } catch (error) {
        res.json({
            code: 400,
            message: "Tạo bài viết mới thất bại"
        });
    }
}

// [PATCH]/api/v1/articles/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;

        await Article.updateOne({ _id: id }, req.body);

        res.json({
            code: 200,
            message: "Sửa bài viết thành công"
        });
    } catch (error) {
        res.json({
            code: 400,
            message: "Sửa bài viết thất bại!"
        });
    }
}

// [DELETE]/api/v1/articles/delete/:id
module.exports.delete = async (req, res) => {
    try {
        const id = req.params.id;

        await Article.updateOne({ _id: id }, 
            {
                deleted: true,
                deletedAt: new Date()
            }
        );

        res.json({
            code: 200,
            message: "Xóa bài viết thành công"
        });
    } catch (error) {
        res.json({
            code: 400,
            message: "Xóa bài viết thất bại!"
        });
    }
}