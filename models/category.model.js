const mongoose = require("mongoose");
const categorySchema  = new mongoose.Schema(
    {
        name: String,
        description: String,
        status: String,
        createdAt: { 
            type: Date, 
            default: Date.now 
        },
        deleted: {
            type: Boolean,
            default: false
        },
        updatedAt: 
        { 
            type: Date, 
            default: Date.now 
        },
        deletedAt: Date
    },
    {
        timestamps: true,
    }
);

const Category = mongoose.model("Category", categorySchema, "categories");

module.exports = Category;


