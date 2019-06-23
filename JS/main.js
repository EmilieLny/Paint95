// GENERATE OF THE HTML

// Creation container div
let container = document.createElement('div');
container.className = 'container';
document.body.appendChild(container);

// Creation toolsBar
let toolsBar = document.createElement('div');
toolsBar.className = 'toolsBar';
container.appendChild(toolsBar);

// Creation color pallet
let colorLabel = document.createElement('h3');
colorLabel.textContent = "Colors";
toolsBar.appendChild(colorLabel);
function colorPallet(color, value) {
    let colorButton = document.createElement('button');
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

// Creation eraser
let eraserTools = document.createElement('button');
eraserTools.id = 'eraser';
toolsBar.appendChild(eraserTools);

// Creation rotation
let rotationTools = document.createElement('button');
rotationTools.id = 'rotation';
toolsBar.appendChild(rotationTools);

// Creation size pallet
let sizeLabel = document.createElement('h3');
sizeLabel.textContent = "Size";
toolsBar.appendChild(sizeLabel);
let sizeTools = document.createElement('input');
sizeTools.type = 'range';
sizeTools.min = '2';
sizeTools.max = '52';
sizeTools.value = '26';
toolsBar.appendChild(sizeTools);

// Creation brushs pallet
let brushLabel = document.createElement('h3');
brushLabel.textContent = "Brushs";
toolsBar.appendChild(brushLabel);
function brushPallet(brushId) {
    let brushTools = document.createElement('button');
    brushTools.classList.add('brush');
    brushTools.id = brushId;
    toolsBar.appendChild(brushTools);
}
brushPallet('square');
brushPallet('circle');
brushPallet('oval');

// Creation reSize
let reSizeTools = document.createElement('button');
reSizeTools.id = 'reSize';
toolsBar.appendChild(reSizeTools);

// Creation clear
let clearTools = document.createElement('button');
clearTools.id = 'clear';
toolsBar.appendChild(clearTools);

// Creation save
let saveTools = document.createElement('button');
saveTools.id = 'save';
toolsBar.appendChild(saveTools);

// Creation load
let loadTools = document.createElement('button');
loadTools.id = 'load';
toolsBar.appendChild(loadTools);

// Creation drawingZone
let drawingZone = document.createElement('div');
drawingZone.className = 'drawingZone';
drawingZone.style.position = 'relative';
container.appendChild(drawingZone);


// ADDING THE INTERACTIVITY

// COLORS
let color = "black";
let colorTools = document.querySelectorAll('.color');
for (let i = 0; i < colorTools.length; i++) {
    colorTools[i].addEventListener('click', function (event) {
        color = event.target.value;
    });
}

// ERASER
eraserTools.addEventListener('click', () => color = 'white');

// ROTATION
let rotation = document.getElementById('rotation');
rotation.addEventListener('click', rotationDraw);
let rot = false;
function rotationDraw() {
    let drawNow = document.querySelector('.drawingZone');
    drawNow.style.transform = 'rotate(180deg)';
    rot = !rot;

}


// SIZE
let size = sizeTools.value;
sizeTools.addEventListener('input', sizeSelected);
function sizeSelected() {
    size = parseInt(sizeTools.value);
}

// BRUSH
let brushType = "circle";
let radius = "30px";
let brushTools = document.querySelectorAll('.brush');
for (let i = 0; i < brushTools.length; i++) {
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
let reSize = document.getElementById('reSize');
reSize.addEventListener('click', sizeDrawingZone);
function sizeDrawingZone() {
    let heightDrawingZone = 500;
    let heightUser = prompt("Please enter the height of the canvas");

    if (isNaN(heightUser)) {
        heightDrawingZone = 500;
    } else {
        heightDrawingZone = heightUser;
    }
    document.querySelector('.drawingZone').style.height = heightDrawingZone + 'px';

    let widthDrawingZone = 500;
    let widthUser = prompt("Please enter the width of the canvas");
    if (isNaN(widthUser)) {
        widthDrawingZone = 500;
    } else {
        widthDrawingZone = widthUser;
    }
    document.querySelector('.drawingZone').style.width = widthDrawingZone + 'px';
}

// CLEAR
clearTools.addEventListener('click', clear);
function clear() {
    drawingZone.innerHTML = "";
}

//SAVE
saveTools.addEventListener('click', save);
function save() {
    let saveName = prompt("Please name your artwork");
    let saveArt = document.querySelector('.drawingZone').innerHTML;
    localStorage.setItem(saveName, saveArt);
}

//LOAD
loadTools.addEventListener('click', load);
function load() {
    let inputName = prompt("What's the name of your artwork ?");
    let drawingZone = document.querySelector(".drawingZone");
    let loadName = localStorage.getItem(inputName);
    if (loadName != null) {
        drawingZone.innerHTML = localStorage.getItem(inputName);
    } else {
        alert("Not a valid Name, try again");
        load();
    }
}

// DEFAULT
function draw(event) {
    let pencil = document.createElement("div");
    let drawingZone = document.querySelector(".drawingZone");
    drawingZone.appendChild(pencil);

    // pencil style
    pencil.style.background = color;
    pencil.style.position = "absolute";
    pencil.style.borderRadius = radius;
    pencil.style.height = size + "px";
    pencil.style.width = size + "px";

    // pencil position
    let x = event.clientX;
    let y = event.clientY;
    pencil.style.position = "absolute";

    if (rot) {
        pencil.style.right = (x-90) + "px";
        pencil.style.bottom = y + "px";
    } else {
        pencil.style.left = (x-90) + "px";
        pencil.style.top = y + "px";
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
