'use strict';

var path = process.cwd();
console.log("path ?",path);

module.exports = function (app) {

	app.route('/')
		.get('/', function (req, res) {
			console.log("we are here",path);
			res.sendFile(path + '/public/index.html');
		});


};
