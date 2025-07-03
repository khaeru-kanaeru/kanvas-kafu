// This file contains the JavaScript code that implements the functionality of the canvas application.

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const brushType = document.getElementById('brushType');
const doneBtn = document.getElementById('doneBtn');
const downloadBtn = document.getElementById('downloadBtn');
const resetBtn = document.getElementById('resetBtn');
const usernameInput = document.getElementById('username');
const usernamePopup = document.getElementById('usernamePopup');
const canvasResult = document.getElementById('canvasResult');

let drawing = false;
let currentColor = '#000000';
let currentBrushSize = 5;
let currentBrushType = 'round';
let username = '';

canvas.width = 2048;
canvas.height = 2048;

canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
    updatePopup(e);
});

canvas.addEventListener('mousemove', (e) => {
    if (drawing) {
        draw(e.offsetX, e.offsetY);
        updatePopup(e);
    }
});

canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.closePath();
});

canvas.addEventListener('mouseout', () => {
    drawing = false;
    usernamePopup.style.opacity = 0;
});

colorPicker.addEventListener('input', (e) => {
    currentColor = e.target.value;
});

brushSize.addEventListener('input', (e) => {
    currentBrushSize = e.target.value;
});

brushType.addEventListener('change', (e) => {
    currentBrushType = e.target.value;
});

doneBtn.addEventListener('click', () => {
    canvasResult.src = canvas.toDataURL();
});

downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'canvas.png';
    link.href = canvas.toDataURL();
    link.click();
});

resetBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

usernameInput.addEventListener('input', (e) => {
    username = e.target.value;
    usernamePopup.innerText = username;
});

function draw(x, y) {
    ctx.lineWidth = currentBrushSize;
    ctx.lineCap = currentBrushType;
    ctx.strokeStyle = currentColor;
    ctx.lineTo(x, y);
    ctx.stroke();
}

function updatePopup(e) {
    usernamePopup.style.left = `${e.clientX}px`;
    usernamePopup.style.top = `${e.clientY - 30}px`;
    usernamePopup.style.opacity = 1;
}

// WebSocket connection for real-time drawing (to be implemented)
// const socket = io();
// socket.on('draw', (data) => {
//     ctx.lineWidth = data.size;
//     ctx.lineCap = data.type;
//     ctx.strokeStyle = data.color;
//     ctx.lineTo(data.x, data.y);
//     ctx.stroke();
// });