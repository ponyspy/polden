$(document).ready(function() {
	$('.gallery_navigate.back').on('click', function(event) {
			$(this).closest('.images_gallery_block').children('.images_gallery_outer').animate({
					'scrollLeft': '-=' + 300
			}, 300);
	});

	$('.gallery_navigate.forward').on('click', function(event) {
			$(this).closest('.images_gallery_block').children('.images_gallery_outer').animate({
					'scrollLeft': '+=' + 300
			}, 300);
	});
});