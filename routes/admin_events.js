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

exports.add_form = function(req, res) {
  var post = req.body;
  var schedule = [];
  var sh = post.schedule;
  var event = new Event();

  sh.date.forEach(function(el, index) {
    var date = new Date(Date.UTC(sh.year[index], sh.month[index], sh.date[index], sh.hours[index], sh.minutes[index]));
    schedule.push(date);
  });

  event.title.ru = post.ru.title;
  event.description.ru = post.ru.description;
  event.age.ru = post.ru.age;
  event.category = post.category;
  event.schedule = schedule;

  event.save(function(err, event) {
    res.redirect('back');
  });
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


exports.edit_form = function(req, res) {
  var id = req.params.id;
  var post = req.body;
  var schedule = [];
  var sh = post.schedule;

  sh.date.forEach(function(el, index) {
    var date = new Date(Date.UTC(sh.year[index], sh.month[index], sh.date[index], sh.hours[index], sh.minutes[index]));
    schedule.push(date);
  });

  Event.findById(id).exec(function(err, event) {
    event.title.ru = post.ru.title;
    event.description.ru = post.ru.description;
    event.age.ru = post.ru.age;
    event.category = post.category;
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