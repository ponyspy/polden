exports.index = function(req, res) {
  res.redirect('/news')
}

exports.locale = function(req, res) {
  res.cookie('locale', req.params.locale);
  res.redirect('back');
}