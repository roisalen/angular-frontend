var Stopwatch = function(elem, options) {

  var timer       = createTimer(),
      startButton = createButton("<span class='glyphicon glyphicon-play'></span>", start),
      stopButton  = createButton("<span class='glyphicon glyphicon-stop'></span>", stop),
      resetButton = createButton("<span class='glyphicon glyphicon-repeat'></span>", reset),
      offset,
      clock,
      interval;

  // default options
  options = options || {};
  options.delay = options.delay || 1;

  // append elements     
  elem.appendChild(timer);
  elem.appendChild(startButton);
  elem.appendChild(resetButton);
  this.elem = elem;

  // initialize
  reset();

  // private functions
  function createTimer() {
    return document.createElement("span");
  }

  function createButton(action, handler) {
    var a = document.createElement("a");
    a.href = "#" + action;
    a.innerHTML = action;
    a.addEventListener("click", function(event) {
      handler();
      event.preventDefault();
    });
    return a;
  }

  function start() {
    if (!interval) {
      offset   = Date.now();
      interval = setInterval(update, options.delay);
    }

    if (this.elem.contains(startButton)) {
      this.elem.insertBefore(stopButton, resetButton);
      this.elem.removeChild(startButton);
    }
    
  }

  function stop() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }

    if (this.elem.contains(stopButton)) {
      this.elem.removeChild(stopButton);
      this.elem.insertBefore(startButton, resetButton);
    }
  }

  function reset() {
    clock = 0;
    render();
  }

  function update() {
    clock += delta();
    render();
  }

  function render() {
    var mins = Math.floor(clock/60000);
    var secs = Math.floor(clock/1000) - mins*60;
    timer.innerHTML = mins.toString() + " m " + secs.toString() + " s"; 
  }

  function delta() {
    var now = Date.now(),
        d   = now - offset;

    offset = now;
    return d;
  }

  // public API
  this.start  = start;
  this.stop   = stop;
  this.reset  = reset;
};