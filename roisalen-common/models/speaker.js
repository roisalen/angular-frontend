var SpeakerQueue = require("./speakerqueue");

module.exports = function(name, number, sex, group) {
	console.log(name);
	this.name = name;
	this.number = number;
	this._id = number;
	this.sex = sex;
	this.group = group;
	this.replies = [];
	this.speaking = false;

	return this;
};