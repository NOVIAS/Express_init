const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const morgan = require("./config/details/logger");
const cors = require("cors");
const routes = require("./routes");
const app = express();

// webpack config

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// logger configs
app.use(morgan.dev);
app.use(morgan.combined);
// add CORS handle
app.use(cors());
app.use(routes);

// add exception handle
app.use((err, req, res, next) => {
  //  设置响应状态
  res.status(err.status || 500);
  // 返回错误信息
  res.send({
    status: err.status || 500,
    error: app.get("env") === "development" ? err.msg : {},
  });
});

module.exports = app;
