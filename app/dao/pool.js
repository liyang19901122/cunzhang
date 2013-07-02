var mysql = require('mysql');
var mysqlConfig = require('../../config/mysql.json');

var pool  = mysql.createPool({
  host     : mysqlConfig.host,
  user     : mysqlConfig.user,
  password : mysqlConfig.password,
  database : mysqlConfig.database,
  charset : "utf8",
  connectionLimit : 5
});

module.exports = pool;