var Event = require('../models/main.js').Event;

exports.main_test = function(req, res) {
	var start = new Date(Date.UTC(2014, 0, 1));
	var end = new Date(Date.UTC(2014, 11, 30));

	Event.aggregate()
		.match({'exhibition': req.params.id})
		.unwind('schedule')
		.sort({'schedule': 1})
		.match({
			'schedule': {
				$gte: start,
				$lte: end
			}
		})
		.group({
			'_id': {
				year: { $year: '$schedule' },
				month: { $month: '$schedule' },
				date: { $dayOfMonth: '$schedule' },
				day: { $dayOfWeek: '$schedule' }
			},
			'events': {
				$push: {
					title: '$title',
					hall: '$hall',
					age: '$age',
					time: {
						hours: { $hour: '$schedule' },
						minutes: { $minute: '$schedule' }
					}
				}
			},
			'count': { $sum: 1 }
		})
		.sort({'_id.year': 1, '_id.month': 1, '_id.date': 1})
		.exec(function(err, dates) {
			res.render('schedule/test_index.jade', {dates: dates});
		});
}

exports.events_test = function(req, res) {
	Event.aggregate()
		.match({'exhibition': req.params.id})
		.unwind('categorys')
		.sort({'schedule': 1})
		.group({
			'_id': {
				'category': '$categorys'
			},
			'events': {
				$push: {
					title: '$title',
					hall: '$hall',
					age: '$age',
					date: {
						month: { $month: '$schedule' },
						date: { $dayOfMonth: '$schedule' },
					},
					time: {
						hours: { $hour: '$schedule' },
						minutes: { $minute: '$schedule' }
					}
				}
			}
		})
		.exec(function(err, categorys) {
			res.render('schedule/test_events.jade', {categorys: categorys});
		});
}

exports.main = function(req, res) {
	res.render('schedule');
}

exports.events = function(req, res) {
	res.render('schedule/events.jade');
}