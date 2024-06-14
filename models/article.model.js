const mongoose = require("mongoose");
const articleSchema = new mongoose.Schema(
    {
    title: String,
    content: String,
    // categoryId: 
    // {
    //     category: String,
    //     default: ""
    // }, authorsid, commentsid
    status: String,
    createdAt: 
    { 
        type: Date, 
        default: Date.now 

    },
    updatedAt: 
    { 
        type: Date, 
        default: Date.now 
    },
    deleted: {
        type: Boolean,
        default: false,
    },
        deletedAt: Date,
    },
    {
        timestamps: true,
    }
);

const Article = mongoose.model("Article", articleSchema, "articles");

module.exports = Article;