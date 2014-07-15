var restify = require('restify');
var mongojs = require("mongojs");
var Speaker = require("../roisalen-common/models/speaker");
var SpeakerQueue = require("../roisalen-common/models/speakerqueue");

var ip_addr = '127.0.0.1';
var port    =  '8080';
 
var server = restify.createServer({
    name : "myapp"
});
 
server.listen(port ,ip_addr, function(){
    console.log('%s listening at %s ', server.name , server.url);
});

server.use(restify.queryParser());
server.use(restify.bodyParser());

var connection_string = '127.0.0.1:27017/myapp';
var db = mongojs(connection_string, ['myapp']);
var speakers = db.collection("speakers");

var speakerQueue = new SpeakerQueue();

var PATH = "/speakers";

server.get({path: "/speakers", version: "0.0.1"}, getAllSpeakers);
server.get({path: "/speakers/:speakerId", version: "0.0.1"}, getSpeaker);
server.post({path: "/speakers", version: "0.0.1"}, createNewSpeaker);
server.get({path: "/speakerList", version: "0.0.1"}, getSpeakerList);
server.post({path: "/speakerList", version: "0.0.1"}, addSpeakerToList);
server.del({path: "/speakerList/:speakerRank", version: "0.0.1"}, removeSpeakerAtPoint);

function getAllSpeakers(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	speakers.find().sort({speakerId: -1}, function(err, success){
		console.log("Response success "+success);
		console.log("Response error "+err);
		if (success){
			res.send(200, success);
		} else{
			res.send(500);
			return next(err);
		}
	});
}

function getSpeaker(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	speakers.findOne({number: req.params.speakerId}, function(err, success) {
		console.log("Response success "+success);
		console.log("Response error "+err);
		if (success){
			res.send(200, success);
			return next();
		}
		res.send(500);
		return next(err);
	});
}

function createNewSpeaker(req, res, next) {
	console.log("in new speaker");
	console.log(req.body);
	var speakerJson = JSON.parse(req.body);
	var speaker = new Speaker(speakerJson.name, speakerJson.number, speakerJson.sex, speakerJson.group);
	res.setHeader('Access-Control-Allow-Origin', '*');
	speakers.save(speaker, function(err, success) {
		console.log("Response success "+success);
		console.log('Response error '+err);
		if (success) {
			res.send(201, speaker);
			return next();
		} else {
			res.send(500);
			return next(err);
		}
	});
}

function getSpeakerList(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.send(200, speakerQueue.list);
	return next();
}

function addSpeakerToList(req, res, next) {
	console.log("adding speaker");
	res.setHeader('Access-Control-Allow-Origin', '*');
	speakers.findOne({number: req.body}, function(err, success) {
		console.log("Found speaker "+JSON.stringify(success));
		console.log("Response error "+err);
		if (success) {
			console.log("adding speaker to queue");
			speakerQueue.add(success);
			console.log("speaker added to queue");
			res.send(200, speakerQueue.list);
			return next();
		}
		res.send(500);
		return next(err);
	});
}

function removeSpeakerAtPoint(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	speakerQueue.removeAt(req.params.speakerRank);
	res.send(200);
	return next();
}


