var map;
var style_array =
[{"featureType":"road","stylers":[{"hue":"#5e00ff"},{"saturation":-79}]},{"featureType":"poi","stylers":[{"saturation":-78},{"hue":"#6600ff"},{"lightness":-47},{"visibility":"off"}]},{"featureType":"road.local","stylers":[{"lightness":22}]},{"featureType":"landscape","stylers":[{"hue":"#6600ff"},{"saturation":-11}]},{},{},{"featureType":"water","stylers":[{"saturation":-65},{"hue":"#1900ff"},{"lightness":8}]},{"featureType":"road.local","stylers":[{"weight":1.3},{"lightness":30}]},{"featureType":"transit","stylers":[{"visibility":"simplified"},{"hue":"#5e00ff"},{"saturation":-16}]},{"featureType":"transit.line","stylers":[{"saturation":-72}]},{}]
// [{"featureType":"landscape","stylers":[{"hue":"#000000"},{"saturation":-100},{"lightness":44},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#00F93f"},{"saturation":100},{"lightness":-40.95294117647059},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#00F93f"},{"saturation":100},{"lightness":-51.15294117647059},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#00F93f"},{"saturation":100},{"lightness":-50.35294117647059},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#00F93f"},{"saturation":100},{"lightness":-50.35294117647059},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00F93f"},{"saturation":100},{"lightness":-50.35294117647059},{"gamma":1}]}]

function initialize() {
	var myLatlng = new google.maps.LatLng(55.7285410, 37.6129700);

	var mapOptions = {
		zoom: 17,
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