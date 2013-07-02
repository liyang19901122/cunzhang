var controllerWords = module.exports;
var daoWords = require("../dao/daoWords");

var pageSize = 10;

controllerWords.index = function(req, res) {
	res.render('words/index');
	return;
}


controllerWords.search = function(req, res) {
	var type = req.param('type');
	var keyword = req.query.keyword;
	var ret = [];
	var pageNo = parseInt(req.query.pageNo);
	if (!pageNo) {
		pageNo = 1;
	}

	var pageNext = 1;
	var pagePre = 1;
	if(pageNo>=1){
		pageNext = pageNo + 1;
	}
	if(pageNo>1){
		pagePre = pageNo - 1;
	}

	if (type === "name") {
		var options = {
			pageNo: pageNo,
			pageSize: pageSize,
			name: keyword
		};
		daoWords.searchByName(options, function(err, results) {
			//console.log(results);
			if (results && results.length > 0) {
				ret = results
			}
			res.render('words/search', {
				results: ret,
				pagePre : pagePre,
				pageNext : pageNext,
				pageNo : pageNo,
				type : type,
				keyword : keyword
			});
			return;
		});
	} else if (type === "word") {
		options = {
			pageNo: pageNo,
			pageSize: pageSize,
			word: keyword
		};
		daoWords.searchByWords(options, function(err, results) {
			if (results && results.length > 0) {
				ret = results
			}
			res.render('words/search', {
				results: ret,
				pagePre : pagePre,
				pageNext : pageNext,
				pageNo : pageNo,
				type : type,
				keyword : keyword
			});
			return;
		});
	} else if (type === "type") {
		options = {
			pageNo: pageNo,
			pageSize: pageSize,
			type: keyword
		};
		daoWords.searchByType(options, function(err, results) {
			if (results && results.length > 0) {
				ret = results
			}
			res.render('words/search', {
				results: ret,
				pagePre : pagePre,
				pageNext : pageNext,
				pageNo : pageNo,
				type : type,
				keyword : keyword
			});
			return;
		});
	} else {
		res.render('words/search', {
			results: ret
		});
		return;
	}
}

controllerWords.admin = function(req, res) {
	var pageNo = parseInt(req.query.pageNo);

	if (!pageNo) {
		pageNo = 1;
	}

	var options = {
		pageNo: pageNo,
		pageSize: pageSize
	};
	var pageNext = 1;
	var pagePre = 1;
	if(pageNo>=1){
		pageNext = pageNo + 1;
	}
	if(pageNo>1){
		pagePre = pageNo - 1;
	}
	daoWords.getAll(options, function(err, results) {
		res.render('words/admin/index', {
			results: results,
			pageNo: pageNo,
			pagePre:pagePre,
			pageNext:pageNext
		});
		return;
	});
	return;
}

Date.prototype.format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}

controllerWords.create = function(req, res) {
	var data = req.body;
	console.log(data);
	var now = new Date().format("yyyy-MM-dd hh:mm:ss");
	console.log(now);
	var word = {
		name: data.name,
		words: data.words,
		tags: data.tags,
		like: parseInt(data.like),
		status: data.status,
		type: data.type,
		update_time: now,
		create_time: now
	}
	daoWords.insert(word, function(err, results) {
		res.send(results);
		return;
	});
	return;
}

controllerWords.delete = function(req, res) {
	var body = req.body;
	var id = body.id;
	var options = {
		id: id
	};
	daoWords.delete(options, function(err, results) {
		res.send(results);
		return;
	});
	return;
}

controllerWords.update = function(req, res) {
	var body = req.body;
	var now = new Date();
	var word = {
		id: data.id,
		name: data.name,
		words: data.words,
		tags: data.tags,
		like: parseInt(data.like),
		status: data.status,
		type: data.type,
		update_time: now
	}
	daoWords.update(word, function(err, results) {
		res.send(results);
		return;
	});
	return;
}

controllerWords.getAll = function(req, res) {
	var pageNo = req.query.pageNo;

	var options = {
		pageNo: pageNo,
		pageSize: pageSize
	};
	daoWords.getAll(options, function(err, results) {
		res.render('words/admin/index', {
			results: results,
			pageNo: pageNo
		});
		return;
	});
	return;
}