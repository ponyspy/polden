var Event = require('../models/main.js').Event;

exports.main = function(req, res) {
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
  .sort({'_id.year': 1, '_id.month': 1, '_id.day': 1})
  .exec(function(err, dates) {
  	console.log(dates)
    res.render('schedule', {dates: dates});
  });
}

exports.events = function(req, res) {
	res.render('schedule/events.jade');
}