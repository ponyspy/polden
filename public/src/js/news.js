$(document).ready(function() {
	var skip = 5;

	$(document)
		.on('click', '.column', function(event) {
			var path = $(this).attr('full');
			var img = $('<img/>', {src: path});

			$(this).closest('.images_gallery_block').find('.image_preview').empty().append(img).fadeIn(400);
		})
		.on('click', '.gallery_navigate', function(event) {
			var $this = $(this);
			var direction;

			$this.attr('class').split(' ')[1] == 'back'
				? direction = '-='
				: direction = '+=';

			$this.closest('.images_gallery_block').find('.images_gallery_outer').animate({
					'scrollLeft': direction + 300
			}, 300);
		})
		.on('click', '.image_preview', function(event) {
			$(this).hide();
			$('.news_date_block').show();
		})
		.on('mousemove', '.image_preview', function(event) {
			var $this = $(this);

			$this.scrollTop(event.pageY - $this.offset().top);
		})
		.on('scroll', function() {
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