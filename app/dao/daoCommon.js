var pool = require('pool');
/**
 *
 * DAO Common SQL
 * @class
 * @constructor
 */
 var daoCommon = module.exports;

/**
 * DAO exec Common SQL
 * 
 * @method 
 * @param  {String} sql  sql string
 * @param  {Object} cb  callback function
 * @Return {Object} results
 * @memberOf daoCommon
 */
daoCommon.execSQL = function(sql,cb){
	pool.getConnection(function(err, connection) {
		connection.query(sql,function(err, results) {
			connection.end();
			if (err) {
				logger.error(err);
				cb(err, null);
				return;
			}
			cb(err, results);
			return;
		});
	});
}