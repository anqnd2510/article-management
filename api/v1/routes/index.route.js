const articleRoutes = require("./article.route");

module.exports = (app) => {

    const version = "/api/v1";

    app.use(version + "/articles", articleRoutes);

};