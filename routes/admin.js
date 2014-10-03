var News = require('../models/main.js').News;


// ------------------------
// *** Admin News Block ***
// ------------------------


exports.news_list = function(req, res) {
  News.find().exec(function(err, news) {
    res.render('auth/news/', {news: news});
  });
}


// ------------------------
// *** Add News Block ***
// ------------------------


exports.news_add = function(req, res) {
  res.render('auth/news/add.jade');
}

exports.news_add_form = function(req, res) {
  var post = req.body;
  var files = req.files;
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();

  var news = new News();

  news.title.ru = post.ru.title;
  news.s_title.ru = post.ru.s_title;
  news.description.ru = post.ru.description;
  news.date = new Date(Date.UTC(post.date.year, post.date.month, post.date.date, hours, minutes));

  news.save(function(err, news) {
    res.redirect('/auth/news');
  });
}


// ------------------------
// *** Edit News Block ***
// ------------------------


exports.news_edit = function(req, res) {
  var id = req.params.id;

  News.findById(id).exec(function(err, news) {
    res.render('auth/news/edit.jade', {news: news});
  });
}

exports.news_edit_form = function(req, res) {
  var post = req.body;
  var id = req.params.id;
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();

  News.findById(id).exec(function(err, news) {
    news.title.ru = post.ru.title;
    news.s_title.ru = post.ru.s_title;
    news.description.ru = post.ru.description;
    news.date = new Date(Date.UTC(post.date.year, post.date.month, post.date.date, hours, minutes));

    news.save(function(err, news) {
      res.redirect('/auth/news');
    });
  });
}


// ------------------------
// *** Remove News Block ***
// ------------------------


exports.news_remove = function(req, res) {
  var id = req.body.id;
  News.findByIdAndRemove(id, function() {
    // deleteFolderRecursive(__dirname + '/public/images/events/' + id);
    res.send('ok');
  });
}