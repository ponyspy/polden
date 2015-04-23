$(document).ready(function() {
	$('.gallery_navigate.back').on('click', function() {
			$('.images_gallery_outer').animate({
					'scrollLeft': '-=400'
			}, 300);
	});

	$('.gallery_navigate.forward').on('click', function() {
			$('.images_gallery_outer').animate({
					'scrollLeft': '+=400'
			}, 300);
	});
});