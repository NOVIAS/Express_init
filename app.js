const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("./config/details/logger");
const app = express();

const routes = require("./routes");
// webpack config

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// logger configs
app.use(morgan.dev);
app.use(morgan.combined);
// add CORS handle

// add exception handle

app.use(routes);

module.exports = app;
