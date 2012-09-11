var socket = io.connect('http://localhost');
socket.on('news', function(data) {
	// alert(data);
	// console.log(data);
	socket.emit('my other event', {
		my : 'data'
	});
});


var purple = [ {
	featureType : 'landscape',
	stylers : [ {
		hue : '#00dd00'
	} ]
}, {
	featureType : 'road',
	stylers : [ {
		hue : '#dd0000'
	} ]
}, {
	featureType : 'water',
	stylers : [ {
		hue : '#000040'
	} ]
}, {
	featureType : 'poi.park',
	stylers : [ {
		visibility : 'off'
	} ]
}, {
	featureType : 'road.arterial',
	stylers : [ {
		hue : '#ffff00'
	} ]
}, {
	featureType : 'road.local',
	stylers : [ {
		visibility : 'off'
	} ]
} ];

var map;
function initialize() {

	// Create a new StyledMapType object, passing it the array of styles,
	// as well as the name to be displayed on the map type control.
	var styledMap = new google.maps.StyledMapType(purple, {
		name : "Styled Map"
	});

	// Create a map object, and include the MapTypeId to add
	// to the map type control.
	var mapOptions = {
		zoom :2,
		center : new google.maps.LatLng(0, 0),
		mapTypeControlOptions : {
			mapTypeIds : [ google.maps.MapTypeId.ROADMAP, 'map_style' ]
		}
	};
	var map = new google.maps.Map(document.getElementById('map_canvas'),
			mapOptions);

	//Associate the styled map with the MapTypeId and set it to display.
	map.mapTypes.set('map_style', styledMap);
	map.setMapTypeId('map_style');

}

google.maps.event.addDomListener(window, 'load', initialize);