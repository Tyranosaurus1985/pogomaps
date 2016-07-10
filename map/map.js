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
	var ref = mainApp.database().ref("pokemon/008/catches");
	ref.on('child_added', function(childSnapshot, prevChildKey) {
		try {
			var lat = childSnapshot.child('lat').val();
			var lng = childSnapshot.child('long').val();
			var id = childSnapshot.child('id').val();
			var image = "https://www.weebly.com/editor/uploads/8/3/6/4/83645332/custom_themes/443316405555985946/files/images/" + id + ".png";
			var marker = new google.maps.Marker({label: id,
				icon: image});
			setMarker(marker, lat, lng, map);
		}
		catch (err) {
			console.log(err);
			alert("no pokemon caught yet");
		}
	});
}

function setMarker(marker, lat, long, map) {
	marker.setMap(map);
	var location = new google.maps.LatLng(lat, long);
	marker.setPosition(location);
}

google.maps.event.addDomListener(window, 'load', initialize);
