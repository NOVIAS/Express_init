const express = require("express");

const router = express.Router();

/* GET home page. */
router.use("/", require("./indexRouter"));

// user api
router.use("/user", require("./usersRouter"));

// 定义404错误
router.use((req, res, next) => {
  const err = new Error("No Pages Found!");
  err.status = 404;
  err.msg = "No Pages Found!";
  next(err);
});
module.exports = router;
