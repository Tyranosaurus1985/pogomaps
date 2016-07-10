//submitControl.js
var mainApp;
var fireCon = require("./fireBaseConfig.js");

var key = config.FIREBASE_KEY;
var auth = config.FIREBASE_ID + ".firebaseapp.com";
var URL = "https://" + FIREBASE_ID + ".firebaseio.com";
var storage = FIREBASE_ID + ".appspot.com"

function initialize() {
    var config = {
		apiKey: key,
		authDomain: auth,
		databaseURL: URL,
		storageBucket: storage,
	};
	mainApp = firebase.initializeApp(config);
	console.log("init");
}

function fireSub() {

	var name = document.getElementById("pokemon").value;
	var lvl = document.getElementById("trainer").value;
	var mon = document.getElementById("month").value;
	var day = document.getElementById("day").value;
	var lat = document.getElementById("lat").innerHTML;
	var lon = document.getElementById("long").innerHTML;
	var city = document.getElementById("city").innerHTML;
	var newKey = mainApp.database().ref("listenCoords").push().key;
	var postData = {
		name: name,
		level: lvl,
		month: mon,
		day: day,
		lat: lat,
		long: lon,
		city: city
	};
	if (lat == "") {
		alert("NO LOCATION");
	}
	else {
		mainApp.database().ref("listenCoords").push(postData);
	}
}

initialize();
document.getElementById("submit").addEventListener("click", fireSub);
