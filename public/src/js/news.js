$(document).ready(function() {
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
		var img = $(this).attr('src');
		$('.news_date_block').hide();
		$('.image_preview').show().attr('src', img);
	});

	$('.image_preview').on('click', function() {
		$(this).hide();
		$('.news_date_block').show();
	});
});