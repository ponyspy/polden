exports.main = function(req, res) {
	res.render('schedule');
}

exports.events = function(req, res) {
	res.render('schedule/events.jade');
}