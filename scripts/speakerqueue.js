
function speakersQueue() {

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

}
