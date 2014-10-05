$(document).ready(function() {
	function remove (event) {
		var id  = $(this).attr('id');

		if (confirm(event.data.description)) {
			$.post(event.data.path, {'id': id}).done(function() {
				location.reload();
			});
		}
	}

	$('.rm_news').on('click', {path:'/auth/news/remove', description: 'Удалить новость?'}, remove);
	$('.rm_event').on('click', {path:'/auth/events/remove', description: 'Удалить событие?'}, remove);

});