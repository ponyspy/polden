var ObjectId = require('mongoose').Types.ObjectId;
var Event = require('../models/main.js').Event;
var Category = require('../models/main.js').Category;

function toMatrix(arr, rowCount) {
	var row = 0, matrix = [], curIndex = 0;
	var rows = Math.ceil(arr.length/rowCount);

	for (var i = 0; i < arr.length; i++) {
		matrix[row] === undefined ? matrix[row] = [] : true
		matrix[row].push(arr[i]);
		row++;
		row > rowCount ? row = 0 : true
	}

	return matrix;
}

exports.main_test = function(req, res) {
	Event.aggregate()
		.match({'exhibition': new ObjectId(req.params.id) })
		.unwind('schedule')
		.sort({'schedule': 1})
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
		.match({'exhibition': new ObjectId(req.params.id) })
		.unwind('categorys')
		.group({
			'_id': {
				'category': '$categorys'
			},
			'events': {
				$push: {
					title: '$title',
					description: '$description',
					hall: '$hall',
					age: '$age',
					schedule: '$schedule',
				}
			}
		})
		.exec(function(err, categorys) {
			Category.populate(categorys, {path: '_id.category', select: 'title'}, function(err, categorys) {
				var columns = toMatrix(categorys, 2);
				res.render('schedule/test_events.jade', {columns: columns});
			});
		});
}

exports.main = function(req, res) {
	res.render('schedule');
}

exports.events = function(req, res) {
	res.render('schedule/events.jade');
}