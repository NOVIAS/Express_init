const db = require("mysql");
const { dbConfig } = require("../");

const pool = db.createPool(dbConfig);

module.exports = pool;
