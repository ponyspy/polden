var News = require('../models/main.js').News;


// ------------------------
// *** News Block ***
// ------------------------


exports.main = function(req, res) {
  News.aggregate()
  .group({
    '_id': {
      year: { $year: '$date' },
      month: { $month: '$date' },
      day: { $dayOfMonth: '$date' }
    },
    'news': {
      $push: {
        title: '$title',
        description: '$description',
        _id: '$_id',
        time: {
          hours: { $hour: '$date' },
          minutes: { $minute: '$date' }
        }
      }
    },
    'count': { $sum: 1 }
  })
  .sort({'_id.year': -1, '_id.month': -1, '_id.day': -1})
  .exec(function(err, dates) {
    res.render('news', {dates: dates});
  });
}