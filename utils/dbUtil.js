const db = require("mysql");
const { dbConfig } = require("../config");
const { DBERROR } = require("./errors");

const pool = db.createPool(dbConfig);

const query = function (sql, params = {}) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(DBERROR.CONNECTIONERROR);
      } else {
        connection.release();
        connection.query(sql, params, (err, result) => {
          if (err) {
            DBERROR.SQLQUERYERROR.msg = err.sqlMessage;
            reject(DBERROR.SQLQUERYERROR);
          } else {
            resolve(result);
          }
        });
      }
    });
  });
};

pool.on("release", function (connection) {
  console.log("Connection %d released", connection.threadId);
});

module.exports = query;
