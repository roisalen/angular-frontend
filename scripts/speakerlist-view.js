
function speakerlistView(speakerListRoot) {

    this.lista = speakerlistView;
    this.countSpeakers = 0;
    this.suffix = ;

    this.drawSpeaker = drawSpeaker;
    this.undrawSpeaker = undrawSpeaker;

    function drawSpeaker(speaker) {
        this.countSpeakers++;
        temp = document.createElement("li");
        temp.setAttribute('id',countSpeakers);
        temp.innerHTML = "<span class=\"num\">" + speaker.number + \
                         "</span> <span class=\"name\"" + speaker.name + \
                         "</span>" + "<span onclick=\"undrawSpeaker(" + \
                         countSpeakers + ")\">X</span>";
        document.getElementById("lista").appendChild( temp );
    }

    function undrawSpeaker( id ) {
        this.lista.removeChild( document.getElementById( id ) );
    }

}
