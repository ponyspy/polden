var Event = require('../models/main.js').Event;


// ------------------------
// *** Admin Events Block ***
// ------------------------


exports.list = function(req, res) {
  Event.find().exec(function(err, events) {
    res.render('auth/events/', {events: events});
  });
}


// ------------------------
// *** Add Events Block ***
// ------------------------


exports.add = function(req, res) {
  res.render('auth/events/add.jade');
}


// ------------------------
// *** Edit Events Block ***
// ------------------------


exports.edit = function(req, res) {
  var id = req.params.id;

  Event.findById(id).exec(function(err, event) {
    res.render('auth/events/edit.jade', {event: event});
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