//server.js
var firebase = require("firebase");
var serverCmds = require("./serverCmds.js");
var fireCon = require("./fireBaseConfig.js");

var mainApp;
var key = fireCon.FIREBASE_KEY;
var auth = fireCon.FIREBASE_ID + ".firebaseapp.com";
var URL = "https://" + FIREBASE_ID + ".firebaseio.com";
var storage = FIREBASE_ID + ".appspot.com"

var config = {
	apiKey: key,
	authDomain: auth,
	databaseURL: URL,
	storageBucket: storage,
};

mainApp = firebase.initializeApp(config);

var ref = mainApp.database().ref("listenCoords");
ref.on('child_added', function(childSnapshot, prevChildKey) {
	serverCmds.postDate(childSnapshot, mainApp.database());
	serverCmds.postType(childSnapshot, mainApp.database());
	serverCmds.postMap(childSnapshot, mainApp.database());
	serverCmds.postMon(childSnapshot, mainApp.database());
	//console.log(snapValue);
	var key = childSnapshot.getKey();
	mainApp.database().ref("listenCoords/" + key).remove();
	console.log("complete");
});
