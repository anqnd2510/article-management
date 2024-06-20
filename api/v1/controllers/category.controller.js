const Category = require("../../../models/category.model");


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
};

// [PATCH]/api/v1/categories/change-status/:id
module.exports.changeStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.body.status;

        await Category.updateOne({
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

// [PATCH]/api/v1/categories/change-status/:id
module.exports.changeMulti = async (req, res) => {
    try {
        const { ids, key, value } = req.body;
        
        switch (key) {
            case "status":
                await Category.updateMany({
                    _id: { $in: ids }
                }, {
                    status: value
                });
                res.json({
                    code: 200,
                    message: "Thay đổi trạng thái thành công"
                });
                break;
            case "delete":
                await Category.updateMany({
                    _id: { $in: ids }
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
