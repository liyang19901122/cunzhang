var controllerMain = module.exports;
var daoUser = require("../dao/daoUser");

controllerMain.index = function(req, res) {
	res.render('index');
}

controllerMain.createIPO = function(req, res) {
	var data;
	var name = req.query.name;
	var txid = req.query.txid;
	var wallet = req.query.address;
	
	var now = new Date();
	
	
	var word = {
		name: data.name,
		txid: data.txid,
		wallet: data.wallet,
		type: "ipo",
		update_time: now,
		create_time: now
	}
	daoUser.insert(word, function(err, results) {
		res.render("okipo");
		return;
	});
	
	return;
}

controllerMain.createFree = function(req, res) {
	var name = req.query.name;
	var wallet = req.query.address;
	
	var now = new Date();
	
	
	var word = {
		name: data.name,
		txid: "",
		wallet: data.wallet,
		type: "free",
		update_time: now,
		create_time: now
	}
	daoUser.insert(word, function(err, results) {
		res.render("okipo");
		return;
	});
	
	return;

}

