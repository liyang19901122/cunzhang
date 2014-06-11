/**
 * eLearn routes configure
 */
var controllerMain = require('./app/controller/controllerMain');


/**
 *
 * Elearn API Routing
 * @class
 * @constructor
 */
module.exports = function(app){
	/***
			Web interface API
	***/
	
	app.get('/',controllerMain.index)

	app.get('/index', controllerMain.index);

	app.get('/ipo',controllerMain.createIPO);

	app.get('/free',controllerMain.createFree);

	

	//app.post('/words/mobile/search',controllerWords.allSearchPost);

	//app.post('/login/post',controllerMain.loginPost);

	//app.get('/main',controllerIndex.main);

	//app.get('/video',controllerIndex.video);
	
}

