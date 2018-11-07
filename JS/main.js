var drawingZone = document.querySelector(".drawingZone");

function draw(event) {
    console.log("in the draw function")
    var pencil = document.createElement("div");
    var drawingZone = document.querySelector(".drawingZone");
    drawingZone.appendChild(pencil);

    // pencil style
    pencil.style.background = "black";
    pencil.style.position = "absolute";
    pencil.style.height = "5px";
    pencil.style.width = "5px";

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

// $('.drawingZone').on('mouseup', function(e) {
//     e.preventDefault();
//     $('.drawingZone').off('mousemove.draw, mousedown.move');
// });



