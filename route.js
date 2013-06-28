/**
 * eLearn routes configure
 */
var controllerMain = require('./app/controller/controllerMain');
var controllerIndex = require('./app/controller/controllerIndex');


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

	app.get('/job',controllerMain.job);

	//app.post('/login/post',controllerMain.loginPost);

	//app.get('/main',controllerIndex.main);

	//app.get('/video',controllerIndex.video);
	
}

