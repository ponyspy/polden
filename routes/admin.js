var Post = require('../models/main.js').Post;


// ------------------------
// *** Admin Posts Block ***
// ------------------------


exports.posts_list = function(req, res) {
  Post.find().exec(function(err, posts) {
    res.render('auth/posts/', {posts: posts});
  });
}


// ------------------------
// *** Add Posts Block ***
// ------------------------


exports.posts_add = function(req, res) {
  res.render('auth/posts/add.jade');
}

exports.posts_add_form = function(req, res) {
  var post = req.body;
  var files = req.files;
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();

  var post_item = new Post();

  post_item.title.ru = post.ru.title;
  post_item.description.ru = post.ru.description;
  post_item.date = new Date(Date.UTC(post.date.year, post.date.month, post.date.date, hours, minutes));

  post_item.save(function(err, post_item) {
    res.redirect('/auth/posts');
  });
}


// ------------------------
// *** Edit Posts Block ***
// ------------------------


exports.posts_edit = function(req, res) {
  var id = req.params.id;

  Post.findById(id).exec(function(err, post) {
    res.render('auth/posts/edit.jade', {post: post});
  });
}

exports.posts_edit_form = function(req, res) {
  var post = req.body;
  var id = req.params.id;
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();

  Post.findById(id).exec(function(err, post_item) {

    post_item.title.ru = post.ru.title;
    post_item.description.ru = post.ru.description;
    post_item.date = new Date(Date.UTC(post.date.year, post.date.month, post.date.date, hours, minutes));

    post_item.save(function(err, post_item) {
      res.redirect('/auth/posts');
    });
  });
}