var path = require('path');
var mkdirp = require('mkdirp');
var async = require('async');
var gm = require('gm').subClass({ imageMagick: true });
var del = require('del');

var News = require('../../models/main.js').News;

var __appdir = path.dirname(require.main.filename);


// ------------------------
// *** Handlers Block ***
// ------------------------


var checkNested = function (obj, layers) {

  if (typeof layers == 'string') {
    layers = layers.split('.');
  }

  for (var i = 0; i < layers.length; i++) {
    if (!obj || !obj.hasOwnProperty(layers[i])) {
      return false;
    }
    obj = obj[layers[i]];
  }
  return true;
}


// ------------------------
// *** Admin News Block ***
// ------------------------


exports.list = function(req, res) {
  News.find().exec(function(err, news) {
    res.render('auth/news/', {news: news});
  });
}


// ------------------------
// *** Add News Block ***
// ------------------------


exports.add = function(req, res) {
  res.render('auth/news/add.jade');
}

exports.add_form = function(req, res) {
  var post = req.body;
  var files = req.files;
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var images = [];

  var news = new News();

  var locales = post.en ? ['ru', 'en'] : ['ru'];

  locales.forEach(function(locale) {
    checkNested(post, [locale, 'title'])
      && news.setPropertyLocalised('title', post[locale].title, locale);

    checkNested(post, [locale, 's_title'])
      && news.setPropertyLocalised('s_title', post[locale].s_title, locale);

    checkNested(post, [locale, 'description'])
      && news.setPropertyLocalised('description', post[locale].description, locale);
  });

  news.date = new Date(Date.UTC(post.date.year, post.date.month, post.date.date, hours, minutes));

  if (!post.images) {
    return (function () {
      news.images = [];
      news.save(function(err, news) {
        res.redirect('back');
      });
    })();
  }

  var public_path = __appdir + '/public';

  var images_path = {
    original: '/images/news/' + news._id + '/original/',
    thumb: '/images/news/' + news._id + '/thumb/',
  }

  mkdirp.sync(public_path + images_path.original);
  mkdirp.sync(public_path + images_path.thumb);

  post.images.path.forEach(function(item, i) {
    images.push({
      path: post.images.path[i]
    });
  });

  async.forEachSeries(images, function(image, callback) {
    var name = Date.now();
    var original_path = images_path.original + name + '.jpg';
    var thumb_path = images_path.thumb + name + '.jpg';

    gm(public_path + image.path).resize(false, 140).write(public_path + thumb_path, function() {
      gm(public_path + image.path).resize(1000, false).write(public_path + original_path, function() {
        news.images.push({
          original: original_path,
          thumb: thumb_path,
        });
        callback();
      });
    });
  }, function() {
    news.save(function() {
      res.redirect('back');
    });
  });

}


// ------------------------
// *** Edit News Block ***
// ------------------------


exports.edit = function(req, res) {
  var id = req.params.id;

  News.findById(id).exec(function(err, news) {
    res.render('auth/news/edit.jade', {news: news});
  });
}

exports.edit_form = function(req, res) {
  var post = req.body;
  var id = req.params.id;
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();

  News.findById(id).exec(function(err, news) {


    var locales = post.en ? ['ru', 'en'] : ['ru'];

    locales.forEach(function(locale) {
      checkNested(post, [locale, 'title'])
        && news.setPropertyLocalised('title', post[locale].title, locale);

      checkNested(post, [locale, 's_title'])
        && news.setPropertyLocalised('s_title', post[locale].s_title, locale);

      checkNested(post, [locale, 'description'])
        && news.setPropertyLocalised('description', post[locale].description, locale);
    });


    news.date = new Date(Date.UTC(post.date.year, post.date.month, post.date.date, hours, minutes));

    news.save(function(err, news) {
      res.redirect('/auth/news');
    });
  });
}


// ------------------------
// *** Remove News Block ***
// ------------------------


exports.remove = function(req, res) {
  var id = req.body.id;
  News.findByIdAndRemove(id, function() {
    del(__dirname + '/public/images/news/' + id);
    res.send('ok');
  });
}