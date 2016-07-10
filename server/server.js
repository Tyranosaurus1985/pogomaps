//server.js
var firebase = require("firebase");
var serverCmds = require("./serverCmds.js")

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

var ref = mainApp.database().ref("listenCoords");
ref.on('child_added', function(childSnapshot, prevChildKey) {
	//console.log(snapValue);
	try {
		serverCmds.postDate(childSnapshot, mainApp.database());
		serverCmds.postType(childSnapshot, mainApp.database());
		serverCmds.postMap(childSnapshot, mainApp.database());
		serverCmds.postMon(childSnapshot, mainApp.database());	
	}	
	
	catch(err){
		console.log(err);
	}

	finally{
		var key = childSnapshot.getKey();
		mainApp.database().ref("listenCoords/" + key).remove();
		console.log("complete");
	}
});
