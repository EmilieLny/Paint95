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
colorPallet('yellowDark', '#f39c12');
colorPallet('orange', '#e67e22');
colorPallet('orangeDark', '#d35400');
colorPallet('red', '#e74c3c');
colorPallet('redDark', '#c0392b');
colorPallet('purple', '#9b59b6');
colorPallet('purpleDark', '#8e44ad');
colorPallet('blue', '#3498db');
colorPallet('blueDark', '#2980b9');
colorPallet('green', '#2ecc71');
colorPallet('greenDark', '#27ae60');
colorPallet('white', '#ecf0f1');
colorPallet('black', '#34495e');

//Creation eraser
var eraserTools = document.createElement('button');
eraserTools.id = 'eraser';
toolsBar.appendChild(eraserTools);

//Creation rotation
var rotationTools = document.createElement('button');
rotationTools.id = 'rotation';
toolsBar.appendChild(rotationTools);

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

//Creation reSize
var reSizeTools = document.createElement('button');
reSizeTools.id = 'reSize';
toolsBar.appendChild(reSizeTools);

//Creation clear
var clearTools = document.createElement('button');
clearTools.id = 'clear';
toolsBar.appendChild(clearTools);

//Creation save
var saveTools = document.createElement('button');
saveTools.id = 'save';
toolsBar.appendChild(saveTools);

//Creation load
var loadTools = document.createElement('button');
loadTools.id = 'load';
toolsBar.appendChild(loadTools);

//-->> Creation drawingZone div---------------------------------
var drawingZone = document.createElement('div');
drawingZone.className = 'drawingZone';
drawingZone.style.position = 'relative';
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

// ERASER
eraserTools.addEventListener('click', function (event) {
    color = 'white';
});

// ROTATION 
var rotation = document.getElementById('rotation');
rotation.addEventListener('click', rotationDraw)
var rot = 0;
function rotationDraw() {
    var drawNow = document.querySelector('.drawingZone');
    //var drawRotation = "";
    drawNow.style.transform = 'rotate(180deg)';
    //drawRotation = drawNow.innerHTML;
    //drawNow = drawRotation;
    rot = 1;

}


// SIZE
var size = sizeTools.value;
sizeTools.addEventListener('input', sizeSelected)
function sizeSelected() {
    size = parseInt(sizeTools.value);
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

//SAVE
var saveTools = document.getElementById('save');
saveTools.addEventListener('click', save);
function save() {
    var saveName = prompt("Please name your artwork");
    var saveArt = document.querySelector('.drawingZone').innerHTML;
    localStorage.setItem(saveName, saveArt);
}

//LOAD
var loadTools = document.getElementById('load');
loadTools.addEventListener('click', load);
function load() {
    var inputName = prompt("What's the name of your artwork ?");
    var drawingZone = document.querySelector(".drawingZone");
    var loadName = localStorage.getItem(inputName);
    if (loadName != null) {
        drawingZone.innerHTML = localStorage.getItem(inputName);
    } else {
        alert("Not a valid Name, try again");
        load();
    }
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
    if (rot == 0) {
        console.log('inverse it')
        pencil.style.left = x + "px";
        pencil.style.top = y + "px";
    } else if (rot == 1){
        pencil.style.right = (x-90) + "px";
        pencil.style.bottom = y + "px";
    }

}
function move() {
    drawingZone.addEventListener("mousemove", draw);
}
function stop() {
    drawingZone.removeEventListener("mousemove", draw);
}
drawingZone.addEventListener("mousedown", move);
drawingZone.addEventListener("mouseup", stop);
