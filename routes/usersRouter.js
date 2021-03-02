const router = require("express").Router();
const query = require("../utils/dbUtil");

/**
 * @api {get} /list   获取用户列表
 * @apiName GetAllUsers
 * @apiGroup User
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *       "status":0,
 *       "data":[{
 *          "id": 1,
 *          "name": "张三",
 *          "age": 18,
 *          "sex": 1
 *      }]
 */
router.get("/list", function (req, res, next) {
  const sql = "select * from users";
  query(sql)
    .then((result) => {
      res.send({ status: 0, data: result });
    })
    .catch((e) => {
      next(e);
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
router.post("/add", function (req, res, next) {
  const sql = "insert into users set ?";
  const body = req.body;
  query(sql, body)
    .then((data) => {
      if (data.insertId) {
        res.send({ status: 0, msg: "添加成功" });
      } else {
        res.send({ status: 1, msg: "添加失败" });
      }
    })
    .catch((e) => {
      next(e);
    });
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

router.put("/update", (req, res, next) => {
  // 解析传递过来需要处理的k,v
  const preHandle = new Map([...Object.entries(req.body)]);
  const keyId = parseInt(preHandle.get("id"));
  preHandle.delete("id");
  const columns = [...preHandle.keys()];
  const values = [...preHandle.values()];
  const sql = `update users set ${columns.join(" = ?,")} = ? where id = ?`;
  query(sql, [...values, keyId])
    .then((data) => {
      if (data.changedRows >= 0) {
        res.send({ status: 0, msg: "修改成功" });
      } else {
        res.send({ status: 1, msg: "修改失败" });
      }
    })
    .catch((e) => {
      next(e);
    });
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
router.delete("/delete", (req, res, next) => {
  const sql = "delete from users where id = ?";
  query(sql, req.body.id)
    .then((data) => {
      if (data.affectedRows >= 0) {
        res.send({ status: 0, msg: "删除成功" });
      } else {
        res.send({ status: 1, msg: "删除失败" });
      }
    })
    .catch((e) => {
      next(e);
    });
});

module.exports = router;
