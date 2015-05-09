$(document).ready(function() {
	var skip = 6;
	var index;

	$(document)
		.on('mouseup', function(event) {
			var $container = $('.images_preview');

			if (!$container.is(event.target)
					&& $container.has(event.target).length === 0)
			{
					$('.main_block').removeAttr('style');
					$container.fadeOut(300).promise().done(function() {
						$('.images_preview').empty();
					});
			}
		})
		.on('click', '.column', function(event) {
			var $images = [];
			index = $(this).index();

			$(this).parent('.images_gallery_inner').children('.column').each(function() {
				var path = $(this).attr('full');
				var $image = $('<img/>', {src: path, 'class': 'image_preview'});
				$images.push($image);
			});

			$('.main_block').css('opacity', 0.1);
			$('.images_preview').empty().append($images).fadeIn(300).children('.image_preview').hide().eq(index).show();
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
			var length = $('.images_preview').children('.image_preview').length - 1;
			index = $(this).index();

			index != length
				? $(this).hide().next().show()
				: $('.image_preview').hide().eq(0).show();
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