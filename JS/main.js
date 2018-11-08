//--------- > CREATION OF THE HTML
//-- > Creation container div
var container = document.createElement('div');
container.className = 'container';
document.body.appendChild(container);

//-->> Creation toolsBar div---------------------------------
var toolsBar = document.createElement('div');
toolsBar.className = 'toolsBar';
container.appendChild(toolsBar);

//Creation color pallet
var colorLabel = document.createElement('h3');
colorLabel.textContent = "Colors";
toolsBar.appendChild(colorLabel);
function colorPallet(color, value) {
    var colorButton = document.createElement('button');
    colorButton.classList.add('color');
    colorButton.id = color;
    colorButton.value = value;
    colorButton.style.backgroundColor = value;
    toolsBar.appendChild(colorButton);
}
colorPallet('yellow', '#f1c40f');
colorPallet('green', '#2ecc71');
colorPallet('orange', '#e67e22');
colorPallet('blue', '#3498db');
colorPallet('red', '#e74c3c');
colorPallet('purple', '#9b59b6');

//Creation brushs pallet
var brushLabel = document.createElement('h3');
brushLabel.textContent = "Brushs";
toolsBar.appendChild(brushLabel);
function brushPallet(brushId) {
    var brushTools = document.createElement('button');
    brushTools.classList.add('brush');
    brushTools.id = brushId;
    toolsBar.appendChild(brushTools);
}
brushPallet('square');
brushPallet('circle');
brushPallet('oval');

//Creation size pallet
var sizeLabel = document.createElement('h3');
sizeLabel.textContent = "Size";
toolsBar.appendChild(sizeLabel);
var sizeTools = document.createElement('input');
sizeTools.type = 'range';
sizeTools.min = '2';
sizeTools.max = '52';
sizeTools.value = '26';
toolsBar.appendChild(sizeTools);

//Creation eraser
var eraserLabel = document.createElement('h3');
eraserLabel.textContent = "Eraser";
toolsBar.appendChild(eraserLabel);
var eraserTools = document.createElement('button');
eraserTools.id = 'eraser';
toolsBar.appendChild(eraserTools);

//Creation reSize
var reSizeTools = document.createElement('button');
reSizeTools.id = 'reSize';
toolsBar.appendChild(reSizeTools);

//Creation clear
var clearTools = document.createElement('button');
clearTools.id = 'clear';
toolsBar.appendChild(clearTools);

//-->> Creation drawingZone div---------------------------------
var drawingZone = document.createElement('div');
drawingZone.className = 'drawingZone';
container.appendChild(drawingZone);


//--------- > ADDING THE INTERACTIVITY

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
var size = sizeTools.value;
sizeTools.addEventListener('input', sizeSelected)
function sizeSelected() {
    size = parseInt(sizeTools.value);
}

// ERASER
eraserTools.addEventListener('click', function (event) {
    color = 'white';
});

// DRAWING ZONE SIZE
var reSize = document.getElementById('reSize');
reSize.addEventListener('click', sizeDrawingZone)
function sizeDrawingZone() {
    var heightDrawingZone = 500;
    var heightUser = prompt("Please enter the height of the canvas");
    console.log('heightUser : ' + heightUser);
    if (isNaN(heightUser)) {
        heightDrawingZone = 500;
    } else {
        heightDrawingZone = heightUser;
        console.log('heightUser' + heightUser)
    }
    document.querySelector('.drawingZone').style.height = heightDrawingZone + 'px';

    var widthDrawingZone = 500;
    var widthUser = prompt("Please enter the width of the canvas");
    if (isNaN(widthUser)) {
        widthDrawingZone = 500;
    } else {
        widthDrawingZone = widthUser;
    }
    document.querySelector('.drawingZone').style.width = widthDrawingZone + 'px';
}

// CLEAR
var clearTools = document.getElementById('clear');
clearTools.addEventListener('click', clear);
function clear() {
    drawingZone.innerHTML = "";
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
    console.log("x : " + x + " | y : " + y)
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
