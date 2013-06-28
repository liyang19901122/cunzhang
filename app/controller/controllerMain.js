var controllerMain = module.exports;

controllerMain.index = function(req, res) {
	res.render('index');
}

controllerMain.job = function(req, res) {
	res.render('job');
}


controllerMain.loginPost = function(req, res) {
	res.send('login post');
}

controllerMain.video = function(req, res) {
	res.render('video');
}