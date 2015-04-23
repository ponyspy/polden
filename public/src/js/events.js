$(document).ready(function() {

	$(document).on('scroll', function() {
		$(document).scrollTop() >= $('.content_block').offset().top - 15
			? $('.menu_right').addClass('fixed')
			: $('.menu_right').removeClass('fixed');
	});

	$('.category_item').on('click', function(event) {
		var current = $(this).attr('class').split(' ')[1];
		if (current == 'all') {
			$('body').stop().animate({
				'scrollTop': $('.content_block').offset().top
			}, {duration: 400, queue: false});
			$('.events_group').fadeTo(400, 1)
		}
		else {
			$('body').stop().animate({
				'scrollTop': $('.' + current).offset().top - $('.content_block').offset().top
			}, {duration: 400, queue: false});
			$('.' + current).fadeTo(400, 1);
			$('.events_group').not('.' + current).fadeTo(400, 0.2);
		}
	});

});