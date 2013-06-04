var controllerIndex = module.exports;

controllerIndex.main = function(req,res){
	res.render('main');
}

controllerIndex.video = function(req, res) {
	res.render('video');
}