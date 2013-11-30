function Speaker(name, number) {
	this.name = name;
	this.number = number;
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
}