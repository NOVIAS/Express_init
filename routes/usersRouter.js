const router = require("express").Router();
const pool = require("../config/details/dbConfig");

/**
 * @api {get} /user/:id Request User information
 * @apiName GetUsers
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "firstname": "John",
 *       "lastname": "Doe"
 *     }
 */
router.get("/", function (req, res) {
  let sql = "select * from users";
  pool.getConnection((err, connection) => {
    if (err) throw new Error("connection has error");
    connection.query(sql, (err, results) => {
      if (err) throw new Error("query userAll has error");
      res.send(results);
      connection.release();
    });
  });
});

router.get("/list", function (req, res, next) {
  res.send("This is a user list page");
});

module.exports = router;
