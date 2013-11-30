
function SpeakerQueue() {

    // this is just a simple wrapping around an array

    this.list = new Array();
    this.next = next;
    this.add = add;

    function add(who) {
        this.list.push(who);
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
