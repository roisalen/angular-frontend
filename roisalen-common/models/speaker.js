var SpeakerQueue = require("./speakerqueue");

module.exports = function(name, number, sex, group) {
	console.log(name);
	this.name = name;
	this.number = number;
	this._id = number;
	this.sex = sex;
	this.group = group;
	this.replies = new SpeakerQueue();

	function addReply(speaker) {
		this.replies.add(speaker);
	}

	function removeReply(speaker) {
		this.replies.remove(speaker);
	}

	function nextReply(speaker) {
		this.replies.next();
	}

	function hasReply() {
		return this.replies.size() > 0;
	}

	return this;
};