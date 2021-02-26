module.exports = {
  queryUtils(pool, sql, callback, params = {}) {
    pool.getConnection((err, connection) => {
      if (err) throw new Error("connection has error");
      connection.release();
      connection.query(sql, params, callback);
    });
  },
};
