const express = require("express");

const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("index");
  res.end();
});

// user api
router.use("/user", require("./usersRouter"));

module.exports = router;
