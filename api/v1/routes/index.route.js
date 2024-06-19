const articleRoutes = require("./article.route");
const categoryRoutes = require("./category.route");

module.exports = (app) => {

    const version = "/api/v1";

    app.use(version + "/articles", articleRoutes);

    app.use(version + "/categories", categoryRoutes);

};