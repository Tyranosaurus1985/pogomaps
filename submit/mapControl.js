//mapControl.js
var marker;
function initialize() {
	var mpls = {lat: 44.986, lng: -93.258};
	var styles = [
		{
			"featureType": "poi",
			"stylers": [
			  { "visibility": "off" }
			]
		}, {
		    "featureType": "transit",
		    "elementType": "labels",
		    "stylers": [
		      { "visibility": "off" }
		    ]
		}, {
			"featureType": "road.arterial",
			"elementType": "geometry",
			"stylers": [
			  { "visibility": "simplified" }
			]
		},{
	}];
	var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});
	var mapOptions = {
		zoom: 8,
		center: mpls,
		disableDoubleClickZoom: true,
		mapTypeControlOpptions: {
			mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
		}
	};
	var map = new google.maps.Map(document.getElementById('map'), mapOptions);
	map.mapTypes.set('map_style', styledMap);
	map.setMapTypeId('map_style');

	marker = new google.maps.Marker({label: " "})

	google.maps.event.addListener(map, 'dblclick', function(event) {
		setMarker(event.latLng, map);
		document.getElementById('long').innerHTML = event.latLng.lng();
		document.getElementById('lat').innerHTML = event.latLng.lat();

		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({'latLng': event.latLng}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[1]) {
					for (var i = 0; i < results[0].address_components.length; i++) {
	            		for (var b = 0; b < results[0].address_components[i].types.length; b++) {
			                if (results[0].address_components[i].types[b] == "locality") {
			                    var city = results[0].address_components[i].long_name;
			                    document.getElementById('city').innerHTML = city;
			                    break;
			                }
			            }
			        }
				}
			}
		})
	});
}

function setMarker(location, map) {
	if (marker.getMap() == null) {
		marker.setMap(map);
	}
	marker.setPosition(location);
}

google.maps.event.addDomListener(window, 'load', initialize);