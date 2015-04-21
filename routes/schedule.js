var ObjectId = require('mongoose').Types.ObjectId;
var Event = require('../models/main.js').Event;
var Category = require('../models/main.js').Category;
var Exhibition = require('../models/main.js').Exhibition;

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

exports.main = function(req, res) {
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
			res.render('schedule/index.jade', {dates: dates});
		});
}

exports.events = function(req, res) {
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
				Exhibition.findById(req.params.id).select('categorys').exec(function(err, exhibition) {
					var columns = toMatrix(categorys, 2);
					res.render('schedule/events.jade', {columns: columns, categorys: exhibition.categorys});
				});
			});
		});
}

exports.main_bak = function(req, res) {
	res.render('schedule/index_bak.jade');
}

exports.events_bak = function(req, res) {
	res.render('schedule/events_bak.jade');
}