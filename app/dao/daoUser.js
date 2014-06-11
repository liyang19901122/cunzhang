var daoWords = module.exports;
var pool = require('./pool');


daoWords.insert = function(options,cb){
	var sql = "insert into user set ?";
	pool.getConnection(function(err, connection) {
		connection.query(sql,options,function(err, results) {
			connection.end();
			if (err) {
				cb(err, null);
				return;
			}
			cb(err, results);
			return;
		});
	});
}

