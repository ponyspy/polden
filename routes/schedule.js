var Event = require('../models/main.js').Event;

exports.main_test = function(req, res) {
	Event.aggregate()
	.unwind('schedule')
  .group({
    '_id': {
      year: { $year: '$schedule' },
      month: { $month: '$schedule' },
      day: { $dayOfMonth: '$schedule' }
    },
    'events': {
      $push: {
        title: '$title',
        hall: '$hall',
        age: '$age',
        description: '$description',
        _id: '$_id',
        time: {
          hours: { $hour: '$schedule' },
          minutes: { $minute: '$schedule' }
        }
      }
    },
    'count': { $sum: 1 }
  })
  .sort('_id.year _id.month _id.day')
  .exec(function(err, dates) {
    res.render('schedule/test_index.jade', {dates: dates});
  });
}

exports.events_test = function(req, res) {
	res.render('schedule/test_events.jade');
}

exports.main = function(req, res) {
	res.render('schedule');
}

exports.events = function(req, res) {
	res.render('schedule/events.jade');
}