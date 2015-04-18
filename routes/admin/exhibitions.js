var Exhibition = require('../../models/main.js').Exhibition;
var Category = require('../../models/main.js').Category;


// ------------------------
// *** Handlers Block ***
// ------------------------


var checkNested = function (obj, layers) {

	if (typeof layers == 'string') {
		layers = layers.split('.');
	}

	for (var i = 0; i < layers.length; i++) {
		if (!obj || !obj.hasOwnProperty(layers[i])) {
			return false;
		}
		obj = obj[layers[i]];
	}
	return true;
}


// ------------------------
// *** Admin Exhibitions Block ***
// ------------------------


exports.list = function(req, res) {
	Exhibition.find().exec(function(err, exhibitions) {
		res.render('auth/exhibitions/', {exhibitions: exhibitions});
	});
}


// ------------------------
// *** Add Exhibitions Block ***
// ------------------------


exports.add = function(req, res) {
	Category.find().exec(function(err, categorys) {
		res.render('auth/exhibitions/add.jade', {categorys: categorys});
	});
}

exports.add_form = function(req, res) {
	var post = req.body;

	var exhibition = new Exhibition();

	var locales = post.en ? ['ru', 'en'] : ['ru'];

	locales.forEach(function(locale) {
		checkNested(post, [locale, 'title'])
			&& exhibition.setPropertyLocalised('title', post[locale].title, locale);

		checkNested(post, [locale, 'description'])
			&& exhibition.setPropertyLocalised('description', post[locale].description, locale);
	});

	exhibition.interval.start = new Date(post.date_start.year, post.date_start.month, post.date_start.date);
	exhibition.interval.end = new Date(post.date_end.year, post.date_end.month, post.date_end.date);
	exhibition.categorys = post.categorys;

	exhibition.save(function(err, exhibition) {
		res.redirect('/auth/exhibitions');
	});
}


// ------------------------
// *** Edit Exhibitions Block ***
// ------------------------


exports.edit = function(req, res) {
	var id = req.params.id;

	Exhibition.findById(id).exec(function(err, exhibition) {
		Category.find().exec(function(err, categorys) {
			res.render('auth/exhibitions/edit.jade', {exhibition: exhibition, categorys: categorys});
		});
	});
}

exports.edit_form = function(req, res) {
	var post = req.body;
	var id = req.params.id;

	Exhibition.findById(id).exec(function(err, exhibition) {

		var locales = post.en ? ['ru', 'en'] : ['ru'];

		locales.forEach(function(locale) {
			checkNested(post, [locale, 'title'])
				&& exhibition.setPropertyLocalised('title', post[locale].title, locale);

			checkNested(post, [locale, 'description'])
				&& exhibition.setPropertyLocalised('description', post[locale].description, locale);
		});

		exhibition.interval.start = new Date(Date.UTC(post.date_start.year, post.date_start.month, post.date_start.date));
		exhibition.interval.end = new Date(Date.UTC(post.date_end.year, post.date_end.month, post.date_end.date));
		exhibition.categorys = post.categorys;
		console.log(post)

		exhibition.save(function(err, exhibition) {
			res.redirect('/auth/exhibitions');
		});
	});
}


// ------------------------
// *** Remove Exhibitions Block ***
// ------------------------


exports.remove = function(req, res) {
	var id = req.body.id;
	Exhibition.findByIdAndRemove(id, function() {
		res.send('ok');
	});
}