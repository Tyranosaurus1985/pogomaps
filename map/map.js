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
	console.log("init");
	var mainApp;
	var key = "AIzaSyDfeAhkESQtU8WcaNME-T3AuOM3IggMxuY";
	var auth = "pogomaps-c5016.firebaseapp.com";
	var URL = "https://pogomaps-c5016.firebaseio.com";
	var storage = "pogomaps-c5016.appspot.com"
    var config = {
		apiKey: key,
		authDomain: auth,
		databaseURL: URL,
		storageBucket: storage,
	};
	mainApp = firebase.initializeApp(config);
	var ref = mainApp.database().ref("mapCoords/Minneapolis");
	ref.on('child_added', function(childSnapshot, prevChildKey) {
		childSnapshot.forEach(function(snap) {
			var info = snap.val();
			console.log(info.name);
			var marker = new google.maps.Marker({label: info.name});
			setMarker(marker, info.lat, info.long, map);
		});
	});
}

function setMarker(marker, lat, long, map) {
	marker.setMap(map);
	var location = new google.maps.LatLng(lat, long);
	marker.setPosition(location);
}

google.maps.event.addDomListener(window, 'load', initialize);
