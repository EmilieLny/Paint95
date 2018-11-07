var drawingZone = document.querySelector(".drawingZone");

// COLORS
var color = "black";
var colorTools = document.querySelectorAll('.color');
for (var i = 0; i < colorTools.length; i++) {
    colorTools[i].addEventListener('click', function (event) {
        color = event.target.value;
    });
}

// BRUSH
var brushType = "circle";
var radius = "30px";
var brushTools = document.querySelectorAll('.brush');
for (var i = 0; i < brushTools.length; i++) {
    brushTools[i].addEventListener('click', function (event) {
        brushType = event.target.id;
        switch (brushType) {
            case "square":
                radius = "0px";
                break;
            case "circle":
                radius = "30px";
                break;
            case "oval":
                radius = "30px 5px";
                break;
            default:
                break;
        }

    });
}

// SIZE
var size = 26;
var sizeTools = document.querySelector('input');
sizeTools.addEventListener('input', sizeSelected)
function sizeSelected() {
    size = parseInt(sizeTools.value)
}

// DEFAULT 
function draw(event) {
    var pencil = document.createElement("div");
    var drawingZone = document.querySelector(".drawingZone");
    drawingZone.appendChild(pencil);
    // pencil style
    pencil.style.background = color;
    pencil.style.position = "absolute";
    pencil.style.borderRadius = radius;
    pencil.style.height = size + "px";
    pencil.style.width = size + "px";
    // pencil position
    var x = event.clientX;
    var y = event.clientY;
    pencil.style.position = "absolute";
    pencil.style.left = x + "px";
    pencil.style.top = y + "px";
}
function move() {
    drawingZone.addEventListener("mousemove", draw);
}
function stop() {
    drawingZone.removeEventListener("mousemove", draw);
}
drawingZone.addEventListener("mousedown", move);
drawingZone.addEventListener("mouseup", stop);
