$(document).ready(function() {
	var skip = 5;

	$('.gallery_navigate.back').on('click', function(event) {
			$(this).closest('.images_gallery_block').find('.images_gallery_outer').animate({
					'scrollLeft': '-=' + 300
			}, 300);
	});

	$('.gallery_navigate.forward').on('click', function(event) {
			$(this).closest('.images_gallery_block').find('.images_gallery_outer').animate({
					'scrollLeft': '+=' + 300
			}, 300);
	});

	$('.column').on('click', function(event) {
		var path = $(this).attr('src');
		var img = $('<img/>', {src: path});

		$(this).closest('.images_gallery_block').find('.image_preview').empty().append(img).fadeIn(400);
	});

	$('.image_preview').on('click', function() {
		$(this).hide();
		$('.news_date_block').show();
	});

	$(document).on('mousemove', '.image_preview', function(event) {
		var $this = $(this);
		$this.scrollTop(event.pageY - $this.offset().top);
	});

	$(document).on('scroll', function() {
		if ($('.content_block').height() - 650 <= $(document).scrollTop()) {
			var limit = skip + 5;
			$.ajax({
				url: '/news',
				method: 'POST',
				async: false,
				data: {skip: skip, limit: limit}
			}).done(function(data) {
				data != 'out'
					? $('.news_block').append(data)
					: $(document).off('scroll');
				skip+= 5;
			});
		}
	});

});