$(document).ready(function() {
	$('.category_item').click(function(event) {
		var current = $(this).attr('class').split(' ')[1];
		current == 'all'
			? $('.events_group').show()
			: $('.events_group').show().not('.' + current).hide();
	});
});