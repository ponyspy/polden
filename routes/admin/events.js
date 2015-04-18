var Event = require('../../models/main.js').Event;
var Exhibition = require('../../models/main.js').Exhibition;


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
// *** Admin Events Block ***
// ------------------------


exports.list = function(req, res) {
	var id = req.params.id;
	Exhibition.findById(id).exec(function(err, exhibition) {
		Event.find().where('exhibition').equals(exhibition._id).exec(function(err, events) {
			res.render('auth/events/', {exhibition: exhibition, events: events});
		});
	});
}


// ------------------------
// *** Add Events Block ***
// ------------------------


exports.add = function(req, res) {
	var id = req.params.id;

	Exhibition.findById(id).populate('categorys').exec(function(err, exhibition) {
		res.render('auth/events/add.jade', {exhibition: exhibition});
	});
}

exports.add_form = function(req, res) {
	var post = req.body;
	var schedule = [];
	var sh = post.schedule;
	var event = new Event();

	sh.date.forEach(function(el, index) {
		var date = new Date(Date.UTC(sh.year[index], sh.month[index], sh.date[index], sh.hours[index], sh.minutes[index]));
		schedule.push(date);
	});

	var locales = post.en ? ['ru', 'en'] : ['ru'];

	locales.forEach(function(locale) {
		checkNested(post, [locale, 'title'])
			&& event.setPropertyLocalised('title', post[locale].title, locale);

		checkNested(post, [locale, 'description'])
			&& event.setPropertyLocalised('description', post[locale].description, locale);

		checkNested(post, [locale, 'hall'])
			&& event.setPropertyLocalised('hall', post[locale].hall, locale);

		checkNested(post, [locale, 'age'])
			&& event.setPropertyLocalised('age', post[locale].age, locale);
	});


	event.categorys = post.categorys;
	event.schedule = schedule;
	event.exhibition = post.exhibition;

	event.save(function(err, event) {
		res.redirect('back');
	});
}


// ------------------------
// *** Edit Events Block ***
// ------------------------


exports.edit = function(req, res) {
	var id = req.params.id;
	var event_id = req.params.event_id;

	Event.findById(event_id).exec(function(err, event) {
		Exhibition.findById(id).populate('categorys').exec(function(err, exhibition) {
			res.render('auth/events/edit.jade', {event: event, exhibition: exhibition});
		});
	});
}


exports.edit_form = function(req, res) {
	var event_id = req.params.event_id;
	var post = req.body;
	var schedule = [];
	var sh = post.schedule;

	sh.date.forEach(function(el, index) {
		var date = new Date(Date.UTC(sh.year[index], sh.month[index], sh.date[index], sh.hours[index], sh.minutes[index]));
		schedule.push(date);
	});


	Event.findById(event_id).exec(function(err, event) {

		var locales = post.en ? ['ru', 'en'] : ['ru'];

		locales.forEach(function(locale) {
			checkNested(post, [locale, 'title'])
				&& event.setPropertyLocalised('title', post[locale].title, locale);

			checkNested(post, [locale, 'description'])
				&& event.setPropertyLocalised('description', post[locale].description, locale);

			checkNested(post, [locale, 'hall'])
				&& event.setPropertyLocalised('hall', post[locale].hall, locale);

			checkNested(post, [locale, 'age'])
				&& event.setPropertyLocalised('age', post[locale].age, locale);
		});


		event.categorys = post.categorys;
		event.schedule = schedule;

		event.save(function(err, event) {
			res.redirect('back');
		});
	});
}


// ------------------------
// *** Remove Events Block ***
// ------------------------


exports.remove = function(req, res) {
	var id = req.body.id;
	Event.findByIdAndRemove(id, function() {
		// deleteFolderRecursive(__dirname + '/public/images/events/' + id);
		res.send('ok');
	});
}