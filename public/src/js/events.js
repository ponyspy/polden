$(document).ready(function() {
	$('.category_item').click(function(event) {
		var current = $(this).attr('class').split(' ')[1];
		current == 'all'
			? $('.events_group').removeAttr('style')
			: $('.events_group').css('opacity', 1).not('.' + current).css('opacity', 0.2);
	});
});