var daoWords = module.exports;
var pool = require('./pool');


daoWords.insert = function(options,cb){
	var sql = "insert into cz_words set ?";
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

daoWords.delete = function(options,cb){
	var sql = "delete from cz_words where id = ?";
	var id = options.id;
	pool.getConnection(function(err, connection) {
		connection.query(sql,id,function(err, results) {
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

daoWords.update = function(options,cb){
	var sql = "update cz_words set ?";
	pool.getConnection(function(err, connection) {
		connection.query(sql,id,function(err, results) {
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

daoWords.getAll = function(options,cb){
	var pageNo = options.pageNo;
	var pageSize = options.pageSize;
	var startPos = (pageNo - 1) * pageSize;
	var sql = "select * from cz_words order by create_time desc limit ?,?";
	pool.getConnection(function(err, connection) {
		connection.query(sql,[startPos,pageSize],function(err, results) {
			connection.end();
			if (err) {
				console.log(err);
				cb(err, null);
				return;
			}
			cb(err, results);
			return;
		});
	});
}

/*
daoWords.getByStatus = function(options,cb){
	
}*/

daoWords.searchByName = function(options,cb){
	var name = options.name;
	var pageNo = options.pageNo;
	var pageSize = options.pageSize;
	var startPos = (pageNo - 1) * pageSize;
	var sql = "select * from cz_words where name like '%"+name+"%' order by create_time desc limit ?,?";
	pool.getConnection(function(err, connection) {
		connection.query(sql,[startPos,pageSize],function(err, results) {
			connection.end();
			if (err) {
				console.log(err);
				cb(err, null);
				return;
			}
			cb(err, results);
			return;
		});
	});
}

daoWords.searchByType = function(options,cb){
	var type = options.type;
	var pageNo = options.pageNo;
	var pageSize = options.pageSize;
	var startPos = (pageNo - 1) * pageSize;
	var sql = "select * from cz_words where tags like '%"+type+"%' order by create_time desc limit ?,?";
	pool.getConnection(function(err, connection) {
		connection.query(sql,[startPos,pageSize],function(err, results) {
			connection.end();
			if (err) {
				console.log(err);
				cb(err, null);
				return;
			}
			cb(err, results);
			return;
		});
	});
}

daoWords.searchByWords = function(options,cb){
	var word = options.word;
	var pageNo = options.pageNo;
	var pageSize = options.pageSize;
	var startPos = (pageNo - 1) * pageSize;
	var sql = "select * from cz_words where words like '%"+word+"%'  order by create_time desc limit ?,?";
	pool.getConnection(function(err, connection) {
		connection.query(sql,[startPos,pageSize],function(err, results) {
			connection.end();
			if (err) {
				console.log(err);
				cb(err, null);
				return;
			}
			cb(err, results);
			return;
		});
	});
}

daoWords.searchAll = function(options,cb){
	var pageNo = options.pageNo;
	var pageSize = options.pageSize;
	var startPos = (pageNo - 1) * pageSize;
	var keyword = options.keyword;
	var sql = "select * from cz_words where words like '%"+keyword+"%' or name like '%"+keyword+"%' or tags like '%"+keyword+"%'  order by create_time desc limit ?,?";
	pool.getConnection(function(err, connection) {
		connection.query(sql,[startPos,pageSize],function(err, results) {
			connection.end();
			if (err) {
				console.log(err);
				cb(err, null);
				return;
			}
			cb(err, results);
			return;
		});
	});
}