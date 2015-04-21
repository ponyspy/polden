var map;
var style_array =
// [{"featureType":"all","elementType":"all","stylers":[{"hue":"#00ffbc"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-70}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-60}]}]
[{"stylers":[{"hue":"#dd0d0d"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]}]

function initialize() {
	var myLatlng = new google.maps.LatLng(55.7278189, 37.6126791);

	var mapOptions = {
		zoom: 18,
		center: myLatlng,
		styles: style_array,
		zoomControl: true,
		zoomControlOptions: {
				style: google.maps.ZoomControlStyle.LARGE,
				position: google.maps.ControlPosition.LEFT_CENTER
		}
	};

	map = new google.maps.Map(document.getElementById('map-canvas'),
			mapOptions);

	var infowindow = new google.maps.InfoWindow({
			content: 'Российская государственная детская библиотека'
	});

	var marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			title: 'Российская государственная детская библиотека'
	});

	google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map, marker);
	});
}

google.maps.event.addDomListener(window, 'load', initialize);