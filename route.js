/**
 * eLearn routes configure
 */
var controllerMain = require('./app/controller/controllerMain');
var controllerIndex = require('./app/controller/controllerIndex');
var controllerWords = require('./app/controller/controllerWords');

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

	app.get('/words',controllerWords.index);

	app.get('/words/search/:type',controllerWords.search);

	app.get('/words/admin/index',controllerWords.admin);

	app.post('/words/admin/add',controllerWords.create);

	app.post('/words/admin/delete',controllerWords.delete);

	app.get('/words/mobile/search',controllerWords.allSearch);

	//app.post('/words/mobile/search',controllerWords.allSearchPost);

	//app.post('/login/post',controllerMain.loginPost);

	//app.get('/main',controllerIndex.main);

	//app.get('/video',controllerIndex.video);
	
}

