var restify = require('restify');
var mongojs = require("mongojs");
var Speaker = require("../roisalen-common/models/speaker");
var SpeakerQueue = require("../roisalen-common/models/speakerqueue");
var preflightEnabler = require('se7ensky-restify-preflight');

var ip_addr = '';
var port    =  process.env.PORT || '8080';
 
var server = restify.createServer({
    name : "myapp"
});


 
server.listen(port, function(){
    console.log('%s listening at %s ', server.name , server.url);
});

preflightEnabler(server);
server.use(restify.queryParser());
server.use(restify.bodyParser());

var connection_string = process.env.MONGOLAB_URI || '127.0.0.1:27017/myapp';
var db = mongojs(connection_string, ['myapp']);
var speakers = db.collection("speakers");

var speakerQueue = new SpeakerQueue();

var subject = "";

var PATH = "/speakers";


server.get({path: "/speakers", version: "0.0.1"}, getAllSpeakers);
server.get({path: "/speakers/:speakerId", version: "0.0.1"}, getSpeaker);
server.del({path: "/speakers/:speakerId", version: "0.0.1"}, deleteSpeaker);
server.del({path: "/speakersDeleteAll/IMSURE", version: "0.0.1"}, deleteAllSpeakers);
server.post({path: "/speakers", version: "0.0.1"}, createNewSpeaker);
server.get({path: "/speakerList", version: "0.0.1"}, getSpeakerList);
server.post({path: "/speakerList", version: "0.0.1"}, addSpeakerToList);
server.del({path: "/speakerList/:speakerRank", version: "0.0.1"}, removeSpeakerAtPoint);
server.post({path: "/speakerList/:speakerRank/replies", version: "0.0.1"}, addReplyToSpeakerAtPoint);
server.del({path: "/speakerList/:speakerRank/replies/:replyRank", version: "0.0.1"}, deleteReply);
server.post({path: "/subject", version: "0.0.1"}, setSubject);
server.get({path: "/subject", version: "0.0.1"}, getSubject);
server.post({path: "/speakerList/:speakerRank", version: "0.0.1"}, doneSpeaking);

function setSubject(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	subject = req.body;
	res.send(201);
	return next();
}

function getSubject(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.send(200, subject);
	return next();
}

function getAllSpeakers(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	speakers.find().sort({number: 1}, function(err, success){
		//console.log("Response success "+success);
		//console.log("Response error "+err);
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
	speakers.findOne({number: parseInt(req.params.speakerId)}, function(err, success) {
		//console.log("Response success "+success);
		//console.log("Response error "+err);
		if (success){
			res.send(200, success);
			return next();
		}
		res.send(500);
		return next(err);
	});
}

function deleteSpeaker(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');

	console.log("Hepp");
	speakers.remove({number: parseInt(req.params.speakerId)}, function(err, success){
		if (success) {
			res.send(200);
		} else {
			res.send(500);
		}

		return next(err);
	});
}

function deleteAllSpeakers(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');

	console.log("Hepp");
	
	speakers.remove({},function(err, success) {
		if (success) {
			console.log("deleted all");
			res.send(200);
		} else {
			res.send(500);
		}
		return next(err);
	});
}


function createNewSpeaker(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	console.log(req.body);
	var speakerJson = req.body;
	console.log(speakerJson);
	var speaker = new Speaker(speakerJson.name, parseInt(speakerJson.number), speakerJson.sex, speakerJson.group);
	
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
	speakers.findOne({number: parseInt(req.body)}, function(err, success) {
		if (success) {
			if (speakerQueue.list.length === 0) {
				success.speaking = true;
			}
			speakerQueue.add(success);
			res.send(200, speakerQueue.list);
			return next();
		}
		res.send(500);
		return next(err);
	});	
}

function addReplyToSpeakerAtPoint(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	console.log("adding reply");
	console.log("replicantId")
	console.log(req.params);
	var replicantId = req.body;
	var speakerIndex = 0 //req.params.speakerRank;
	speakers.findOne({number: parseInt(replicantId)}, function(err, success) {
		if (success) {
			console.log("found speaker");
			console.log(speakerIndex);
			var speaker = speakerQueue.get(speakerIndex);
			speaker.replies.push(success);
			res.send(200);
			return next();
		}
		res.send(500);
		return next(err);
	});
}

function doneSpeaking(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	var speaker = speakerQueue.get(req.params.speakerRank);
	console.log("donespeaking");
	if (speaker.replies.length > 0) {
		nextReplyOrMainSpeakerDone(speaker, req.params.speakerRank);
	} else {
		mainSpeakerDone(speaker, req.params.speakerRank);
	}

	res.send(200, speakerQueue.list);
	return next();
}

function nextReplyOrMainSpeakerDone(speaker, speakerRank) {
	if (speaker.speaking) {
		speaker.speaking = false;
		speaker.replies[0].speaking = true;
	} else {
		var speakingIndex = 0;
		speaker.replies.forEach(function(reply, index, array) {
			if (reply.speaking) {
				speakingIndex = index;		
			}
		});

		if (speakingIndex + 1 === speaker.replies.length) {
			mainSpeakerDone(speaker,speakerRank)
		} else {
			speaker.replies[speakingIndex].speaking = false;
			speaker.replies[speakingIndex + 1].speaking = true;
		}
		
	}
}

function mainSpeakerDone(speaker, speakerRank) {
	if (speakerRank + 1 < speakerQueue.size()) {
		var nextSpeaker = speakerQueue.get(parseInt(speakerRank) + 1);
		nextSpeaker.speaking = true;
	}
	speakerQueue.remove(speaker);
}

function removeSpeakerAtPoint(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	speakerQueue.removeAt(req.params.speakerRank);
	res.send(200);
	return next();
}

function deleteReply(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	speakerQueue.get(req.params.speakerRank).replies.splice(req.params.replyRank,1);
	res.send(200);
	return next();
}


