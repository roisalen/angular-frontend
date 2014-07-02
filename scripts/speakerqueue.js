
function SpeakerQueue() {

    // this is just a simple wrapping around an array

    this.list = [];
    this.next = next;
    this.add = add;
    console.log("in queue");

    function add(who, num) {
        // put speaker into list at index num
        if(typeof(num) === 'number') this.list.splice(num, 0, who);
        this.list.push(who);
        console.log("Queue is now: "+JSON.stringify(this.list));
    }

    function next() {
        return this.list.shift();
    }

    function remove(who) {
        var index = this.list.indexOf(who);
        if (index > -1) {
            array.splice(index, 1);
        } else {
            console.log("Error: "+who+" not in list");
        }
    }

    function size() {
        return this.list.length;
    }

}

module.exports = SpeakerQueue;
