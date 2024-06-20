const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const database = require("./config/database");
require("dotenv").config();

const routesApiVer1 = require("./api/v1/routes/index.route");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

database.connect();

// parse application/json
app.use(bodyParser.json()); 

// Routes Ver 1
routesApiVer1(app);

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});