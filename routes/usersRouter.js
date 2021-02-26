const router = require("express").Router();
const pool = require("../config/details/dbConfig");
const utils = require("../utils/dbUtil");

/**
 * @api {get} /list   获取用户列表
 * @apiName GetAllUsers
 * @apiGroup User
 *
 * @apiParam {Number} id 用户唯一主键.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      [{
 *          "id": 1,
 *          "name": "张三",
 *          "age": 18,
 *          "sex": 1
 *      }]
 */

router.get("/list", function (req, res) {
  const sql = "select * from users";
  const error = "select all users failed";
  utils.queryUtils(pool, sql, (err, results) => {
    if (err) throw new Error(error);
    res.send(results);
  });
});

/**
 * @api {post} /add   添加一个用户
 * @apiName AddUser
 * @apiGroup User
 *
 * @apiParam {String}  name  用户昵称
 * @apiParam {Number}  age  用户年龄
 * @apiParam {Number}  name  用户性别 1 男 2 女
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": 0,
 *       "msg": "添加成功"
 *     }
 */
router.post("/add", function (req, res) {
  const sql = "insert into users set ?";
  const error = "insert a user failed";
  const body = req.body;
  utils.queryUtils(
    pool,
    sql,
    (err, results) => {
      if (err) throw new Error(error);
      if (results.insertId) {
        res.send({ status: 0, msg: "添加成功" });
      } else {
        res.send({ status: 1, msg: "添加失败" });
      }
    },
    body
  );
});

/**
 * @api {delete} /delete   删除一个用户
 * @apiName DeleteUser
 * @apiGroup User
 *
 * @apiParam {Number}  id  用户唯一标识
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": 0,
 *       "msg": "删除成功"
 *     }
 */
router.delete("/delete", (req, res) => {
  const sql = "delete from users where id = ?";
  const error = "delete a user had failed";

  utils.queryUtils(
    pool,
    sql,
    (err, results) => {
      if (err) throw new Error(error);
      if (results.affectedRows >= 0) {
        res.send({ status: 0, msg: "删除成功" });
      } else {
        res.send({ status: 1, msg: "删除失败" });
      }
    },
    req.body.id
  );
});

/**
 * @api {put} /update   更新用户信息
 * @apiName UpdateUser
 * @apiGroup User
 *
 * @apiParam {String}  name  用户昵称 ?
 * @apiParam {Number}  age  用户年龄 ?
 * @apiParam {Number}  name  用户性别 1 男 2 女 ?
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": 0,
 *       "msg": "修改成功"
 *     }
 */
router.put("/update", (req, res) => {
  // 解析传递过来需要处理的k,v
  const preHandle = [...Object.entries(req.body)];
  const columns = [];
  const values = [];
  let keyId = undefined;
  preHandle.forEach((item) => {
    if (item[0] === "id") {
      keyId = item[1];
    } else {
      columns.push(`${item[0]} = ?`);
      values.push(item[1]);
    }
  });
  const sql = `update users set ${columns.join(",")} where id = ?`;
  const error = "update a user had failed";
  utils.queryUtils(
    pool,
    sql,
    (err, results) => {
      if (err) throw new Error(error);
      if (results.changedRows >= 0) {
        res.send({ status: 0, msg: "修改成功" });
      } else {
        res.send({ status: 1, msg: "修改失败" });
      }
    },
    [...values, keyId]
  );
});

module.exports = router;
