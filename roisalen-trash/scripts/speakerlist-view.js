// this renders the speakerlist queue. 
// it needs a reference to a root <ul> or <ol> element to work.
//
// typically, you'd initialize it like this:
//
// var myQueue = new speakerlistView( document.getElementById("myList") )



function SpeakerQueueView(rootHTMLelement) {

    this.rootHTMLelement = rootHTMLelement;
    console.log("Root elelment:"+this.rootHTMLelement);
    this.countSpeakers = 0;
    this.suffix = "";

    this.drawSpeaker = drawSpeaker;
    this.undrawSpeaker = undrawSpeaker;
    this.drawSpeakers = drawSpeakers;

    function drawSpeaker(speaker) {
        this.countSpeakers++;
        temp = document.createElement("li");
        temp.setAttribute('id',this.countSpeakers);
        temp.innerHTML = "<span class=\"num\">" + speaker.number 
                        + "</span> <span class=\"name\">" + speaker.name 
                        + "</span>" + "<span onclick=\"queueView.undrawSpeaker(" 
                        + this.countSpeakers + ")\">X</span>";
        
        console.log(this.rootHTMLelement);
        this.rootHTMLelement.appendChild( temp );
    }

    function drawSpeakers(speakerList) {
        this.rootHTMLelement.innerHTML="";
        for (var i = 0; i < speakerList.list.length; i++) {
            console.log("drawing speaker nr "+i+":"+ JSON.stringify(speakerList.list[i]));
            this.drawSpeaker(speakerList.list[i]);
        }
    }
    function undrawSpeaker( id ) {
        this.rootHTMLelement.removeChild( document.getElementById( id ) );
    }

}
