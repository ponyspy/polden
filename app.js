var fs = require('fs');
var gm = require('gm').subClass({ imageMagick: true });
var async = require('async');

var mongoose = require('mongoose');
		mongoose.connect('localhost', 'main');

var express = require('express'),
		bodyParser = require('body-parser'),
		multer = require('multer'),
		accepts = require('accepts'),
		cookieParser = require('cookie-parser'),
		session = require('express-session'),
		methodOverride = require('method-override'),
			app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.locals.pretty = true;

app.use(express.static(__dirname + '/public'));
app.use(multer({ dest: __dirname + '/uploads'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(cookieParser());

app.use(session({
	key: 'polden.sess',
	resave: false,
	saveUninitialized: false,
	secret: 'keyboard cat',
	cookie: {
		path: '/',
		maxAge: 1000 * 60 * 60 // 1 hour
	}
}));


app.use(function(req, res, next) {
	res.locals.session = req.session;
	res.locals.locale = req.cookies.locale || 'ru';
	next();
});


// -------------------
// *** Routes Block ***
// -------------------


var main = require('./routes/main.js');
var news = require('./routes/news.js');
var auth = require('./routes/auth.js');
var content = require('./routes/content.js');
var files = require('./routes/files.js');
var admin = require('./routes/admin.js');


// ------------------------
// *** Midleware Block ***
// ------------------------


function checkAuth (req, res, next) {
	req.session.user_id ? next() : res.redirect('/login');
}


// ------------------------
// *** Handlers Block ***
// ------------------------


var deleteFolderRecursive = function(path) {
	if ( fs.existsSync(path) ) {
		fs.readdirSync(path).forEach(function(file, index){
			var curPath = path + '/' + file;
			fs.statSync(curPath).isDirectory()
				? fs.statSync(curPath).isDirectory()
				: fs.unlinkSync(curPath);
		});
		fs.rmdirSync(path);
	}
}


function toMatrix(arr, row) {
	var a = [];
	for (var i = 0; i < row;) {
		a[i] ? a[i].push(arr.shift()) : (a[i] = []);
		i = ++i % row;
		if (!arr.length) return a;
	}
}


// ------------------------
// *** Routes Block ***
// ------------------------


// === Main Route
app.route('/').get(main.index);


// === Locale Route
app.route('/lang/:locale').get(main.locale);


// === News Route
app.route('/news').get(news.main);


// === Admin news Route
app.route('/auth/news').get(checkAuth, admin.news_list);


// === Admin @add news Route
app.route('/auth/news/add')
	 .get(checkAuth, admin.news_add)
	 .post(checkAuth, admin.news_add_form);


// === Admin @edit news Route
app.route('/auth/news/edit/:id')
	 .get(checkAuth, admin.news_edit)
	 .post(checkAuth, admin.news_edit_form);


// === Auth Route
app.route('/auth').get(checkAuth, auth.main);


// === Login Route
app.route('/login')
	 .get(auth.login)
	 .post(auth.login_form);


// === Logout Route
app.route('/logout').get(auth.logout);


// === Registr Route
app.route('/registr')
	 .get(auth.registr)
	 .post(auth.registr_form);


// === Contacts Route
app.route('/about').get(content.about);


// === Files #sitemap.xml Route
app.route('/sitemap.xml').get(files.sitemap);


// === Files #robots.txt Route
app.route('/robots.txt').get(files.robots);


// ------------------------
// *** Error Handling Block ***
// ------------------------


app.use(function(req, res, next) {
	var accept = accepts(req);
	res.status(404);

	// respond with html page
	if (accept.types('html')) {
		res.render('error', { url: req.url, status: 404 });
		return;
	}

	// respond with json
	if (accept.types('json')) {
			res.send({
			error: {
				status: 'Not found'
			}
		});
		return;
	}

	// default to plain-text
	res.type('txt').send('Not found');
});

app.use(function(err, req, res, next) {
	var status = err.status || 500;

	res.status(status);
	res.render('error', { error: err, status: status });
});


// ------------------------
// *** Connect server Block ***
// ------------------------


app.listen(3000);
console.log('http://127.0.0.1:3000')