const Category = require("../../../models/category.model");

const paginationHelper = require ("../../../helpers/pagination");
const searchHelper = require ("../../../helpers/search");

// [GET]/api/v1/categories
module.exports.index = async (req, res) => {
    const categories = await Category.find({
        deleted: false
    });

    res.json(categories);
};

// [GET]/api/v1/categories/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Category.findOne({
            _id: id,
            deleted: false
        })
        res.json(category);
    } catch (error) {
        res.json(" can't find ");
    }
}