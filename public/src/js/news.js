$(document).ready(function() {
	var skip = 6;
	var $images;

	$(document)
		.on('mouseup', function(event) {
			var container = $('.image_preview');

			if (!container.is(event.target)
					&& container.has(event.target).length === 0)
			{
					container.fadeOut(300);
					$('.main_block').removeAttr('style');
			}
		})
		.on('click', '.column', function(event) {
			var path = $(this).attr('full');
			$('.main_block').css('opacity', 0.1)
			$('.image_preview').attr('src', path).fadeIn(300);
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
			$(this).fadeOut(300);
			$('.main_block').removeAttr('style');
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