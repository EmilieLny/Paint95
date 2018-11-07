var drawingZone = document.querySelector(".drawingZone");

// DEFAULT 
function draw(event) {
    console.log("in the draw function")
    var pencil = document.createElement("div");
    var drawingZone = document.querySelector(".drawingZone");
    drawingZone.appendChild(pencil);
    // pencil style
    pencil.style.background = "black";
    pencil.style.position = "absolute";
    pencil.style.WebkitBorderRadius= "20px;";
    pencil.style.MozBorderRadius= "20px;";
    pencil.style.borderRadius= "20px;";
    pencil.style.height = "2px";
    pencil.style.width = "2px"; 
    // pencil position
    var x = event.clientX;
    var y = event.clientY;
    console.log(`${x+'px x |'},${y+'px y'}`);
    pencil.style.position = "absolute";
    pencil.style.left = x + "px";
    pencil.style.top = y + "px";
}
function move() {
    drawingZone.addEventListener("mousemove", draw);
}
function stop() {
    console.log('Im up')
    drawingZone.removeEventListener("mousemove", draw);
}
drawingZone.addEventListener("mousedown", move);
drawingZone.addEventListener("mouseup", stop);

// COLORS
function colorBlue(){
    pencil.style.background = "blue";
}
var blue = document.querySelector(".colorBlue");
blue.addEventListener('click', colorBlue);