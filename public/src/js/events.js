$(document).ready(function() {
	$('.category_item').click(function(event) {
		var current = $(this).attr('class').split(' ')[1];
		if (current == 'all') {
			$('.events_group').fadeTo(400, 1)
		}
		else {
			$('.' + current).fadeTo(400, 1);
			$('.events_group').not('.' + current).fadeTo(400, 0.2);
		}
	});
});