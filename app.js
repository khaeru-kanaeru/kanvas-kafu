// This file contains the JavaScript code that implements the functionality of the canvas application.

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const doneBtn = document.getElementById('doneBtn');
const downloadBtn = document.getElementById('downloadBtn');
const resetBtn = document.getElementById('resetBtn');
const usernameInput = document.getElementById('username');
const usernamePopup = document.getElementById('usernamePopup');
const canvasResult = document.getElementById('canvasResult');
const startDrawingBtn = document.getElementById('startDrawingBtn');
const loginScreen = document.getElementById('loginScreen');
const canvasSection = document.getElementById('canvasSection');

let drawing = false;
let currentColor = '#000000';
let currentBrushSize = 5;
let currentBrushType = 'round';
let username = '';
let canDraw = false;
let lastPos = null;

canvas.width = 480;
canvas.height = 480;

canvas.addEventListener('mousedown', (e) => {
    if (!canDraw) return;
    drawing = true;
    lastPos = getCanvasPos(e);
    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    updatePopup(e);
});

canvas.addEventListener('mousemove', (e) => {
    if (drawing) {
        const pos = getCanvasPos(e);
        drawSmooth(lastPos, pos);
        lastPos = pos;
        updatePopup(e);
    }
});

canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.closePath();
    lastPos = null;
});

canvas.addEventListener('mouseout', () => {
    drawing = false;
    usernamePopup.style.opacity = 0;
    lastPos = null;
});

const brushSizeValue = document.getElementById('brushSizeValue');
brushSize.addEventListener('input', (e) => {
    currentBrushSize = e.target.value;
    brushSizeValue.textContent = currentBrushSize;
});

// Hapus/abaikan baris ini:
// const brushType = document.getElementById('brushType');
// brushType.addEventListener('change', (e) => {
//     currentBrushType = e.target.value;
// });

doneBtn.addEventListener('click', () => {
    canvasResult.src = canvas.toDataURL();
    resetBtn.style.display = 'block'; // Tampilkan tombol Reset setelah Done
    document.getElementById('resultSection').style.display = 'block'; // Tampilkan hasil
});

downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'canvas.png';
    link.href = canvas.toDataURL();
    link.click();
});

resetBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('resultSection').style.display = 'none'; // Sembunyikan hasil
});

usernameInput.addEventListener('input', (e) => {
    username = e.target.value;
    usernamePopup.innerText = username;
});

startDrawingBtn.addEventListener('click', () => {
    canDraw = true;
    startDrawingBtn.disabled = true;
    loginScreen.style.display = 'none';
    canvasSection.style.display = 'block';
});

// Warna
const quickColors = document.querySelectorAll('.quick-color');
function setActiveColorBtn(color) {
    quickColors.forEach(btn => {
        if (btn.getAttribute('data-color').toLowerCase() === color.toLowerCase()) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    if (colorPicker.value.toLowerCase() === color.toLowerCase()) {
        colorPicker.classList.add('active');
    } else {
        colorPicker.classList.remove('active');
    }
}
quickColors.forEach(btn => {
    btn.addEventListener('click', function() {
        const color = this.getAttribute('data-color');
        colorPicker.value = color;
        currentColor = color;
        setActiveColorBtn(color);
    });
});
colorPicker.addEventListener('input', (e) => {
    currentColor = e.target.value;
    setActiveColorBtn(currentColor);
});
setActiveColorBtn(currentColor);

// Jenis kuas
const quickBrushes = document.querySelectorAll('.quick-brush');
function setActiveBrushBtn(brush) {
    quickBrushes.forEach(btn => {
        if (btn.getAttribute('data-brush') === brush) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}
quickBrushes.forEach(btn => {
    btn.addEventListener('click', function() {
        const brush = this.getAttribute('data-brush');
        if (brush === 'eraser') {
            currentBrushType = 'round';
            currentColor = '#ffffff';
            setActiveColorBtn('#ffffff');
        } else {
            currentBrushType = brush;
        }
        setActiveBrushBtn(brush);
    });
});
setActiveBrushBtn(currentBrushType);

function draw(x, y) {
    ctx.lineWidth = currentBrushSize;
    ctx.strokeStyle = currentColor;
    ctx.lineTo(x, y);
    ctx.stroke();
}

function updatePopup(e) {
    // Offset agar popup tidak menutupi pointer
    const offsetX = 20; // geser ke kanan 20px
    const offsetY = -40; // geser ke atas 40px
    usernamePopup.style.left = `${e.clientX + offsetX}px`;
    usernamePopup.style.top = `${e.clientY + offsetY}px`;
    usernamePopup.style.opacity = 1;
}

function getCanvasPos(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
    };
}

// Tambahkan lebih banyak jenis brush di HTML <select id="brushType">
// <option value="round">Round</option>
// <option value="square">Square</option>
// <option value="marker">Marker</option>
// <option value="spray">Spray</option>
// <option value="calligraphy">Calligraphy</option>

// Fungsi brush smooth & multi-brush
function drawSmooth(from, to) {
    ctx.save();
    ctx.lineWidth = currentBrushSize;
    ctx.strokeStyle = currentColor;
    ctx.lineCap = 'round';

    switch (currentBrushType) {
        case 'round':
            ctx.lineJoin = 'round';
            ctx.globalAlpha = 1;
            ctx.beginPath();
            ctx.moveTo(from.x, from.y);
            ctx.lineTo(to.x, to.y);
            ctx.stroke();
            break;
        case 'square':
            ctx.lineJoin = 'miter';
            ctx.lineCap = 'butt';
            ctx.globalAlpha = 1;
            ctx.beginPath();
            ctx.moveTo(from.x, from.y);
            ctx.lineTo(to.x, to.y);
            ctx.stroke();
            break;
        case 'marker':
            ctx.globalAlpha = 0.3;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(from.x, from.y);
            ctx.lineTo(to.x, to.y);
            ctx.stroke();
            break;
        case 'spray':
            sprayBrush(to.x, to.y);
            break;
        case 'calligraphy':
            ctx.save();
            ctx.translate(to.x, to.y);
            ctx.rotate(Math.PI / 8);
            ctx.fillStyle = currentColor;
            ctx.globalAlpha = 0.7;
            ctx.fillRect(-currentBrushSize / 2, -currentBrushSize / 8, currentBrushSize, currentBrushSize / 4);
            ctx.restore();
            break;
        default:
            ctx.beginPath();
            ctx.moveTo(from.x, from.y);
            ctx.lineTo(to.x, to.y);
            ctx.stroke();
    }
    ctx.restore();
}

// Spray brush
function sprayBrush(x, y) {
    const density = 30;
    for (let i = 0; i < density; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const radius = Math.random() * currentBrushSize;
        const dx = Math.cos(angle) * radius;
        const dy = Math.sin(angle) * radius;
        ctx.fillStyle = currentColor;
        ctx.globalAlpha = 0.2 + Math.random() * 0.3;
        ctx.fillRect(x + dx, y + dy, 1.5, 1.5);
    }
}