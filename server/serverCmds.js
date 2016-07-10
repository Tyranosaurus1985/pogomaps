//serverCmds.js
var firebase = require("firebase");
var pokedex = require("./pokemonData.json");

exports.postMap = function(snapShot, app) {
	var snapVal = snapShot.val();
	var city = snapVal["city"];
	var lat = snapVal["lat"];
	var lon = snapVal["long"];
	var name = snapVal["name"];
	var id = pokedex[name]["id"];
	var updates = {
		id: id,
		lat: lat,
		long: lon
	};
	app.ref("mapCoords/" + city).push(updates);
}

exports.postType = function(snapShot, app) {
	var snapVal = snapShot.val();
	var lat = snapVal["lat"];
	var lon = snapVal["long"];
	var name = snapVal["name"];
	var id = pokedex[name]["id"];
	var type = pokedex[name]["type"];
	var updates = {
		id: id,
		lat: lat,
		long: lon
	};
	type.forEach(function(item, index) {
		app.ref("type/" + item).push(updates);
	});
}

exports.postMon = function(snapShot, app) {
	var snapVal = snapShot.val();
	var lat = snapVal["lat"];
	var lon = snapVal["long"];
	var name = snapVal["name"];
	var id = pokedex[name]["id"];
	var updates = {
		id: id,
		lat: lat,
		long: lon
	};
	app.ref("pokemon/" + id + "/catches").push(updates);
	app.ref("pokemon/" + id + "/name").once("value").then (function(snap) {
		var a = snap.exists();
		if (!a) {
			app.ref("pokemon/" + id + "/name").set(name);
			app.ref("pokemon/" + id + "/gen").set(pokedex[name]["gen"]);
			app.ref("pokemon/" + id + "/type").set(pokedex[name]["type"]);
		}
	});
}

exports.postDate = function(snapShot, app) {
	var snapVal = snapShot.val();
	var mon = snapVal["month"];
	var day = snapVal["day"];
	var lat = snapVal["lat"];
	var lon = snapVal["long"];
	var name = snapVal["name"];
	var id = pokedex[name]["id"];
	var updates = {
		id: id,
		lat: lat,
		long: lon
	};
	app.ref("date/" + mon + "/" + day).push(updates);
}