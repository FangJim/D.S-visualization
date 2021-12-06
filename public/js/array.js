//canvas array format
const array = {
    lineWidth: 5,
    strokeStyle: 'white',
    font: '20px Arial',
    fillStyle: 'white',
    width: 100,
    height: 100
}

//canvas circle format
const circle = {
    size: 20,
    strokeStyle: 'red',
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let arr = new Array(20).fill(null);
update();
function update() {
    init();

    requestAnimationFrame(update)
}
//draw array
function init() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = array.lineWidth;
    ctx.strokeStyle = array.strokeStyle;
    ctx.font = array.font;
    ctx.fillStyle = array.fillStyle;
    for (let i = 0; i < 20; i++) {
        //first line
        ctx.strokeRect(0 + i * 100, 50, array.width, array.height)
        ctx.fillText(`${i}`, 45 + i * 100, 45)

        //second line
        ctx.strokeRect(0 + i * 100, 250, array.width, array.height)
        ctx.fillText(`${i + 10}`, 40 + i * 100, 245)
    }
}


//draw circle
function drawCircle(index) {
    let circle_x = 50;
    let circle_y = 100;
    if (index > 9) {
        circle_y = 300;
    }
    circle_x += (index % 10) * 100;

    ctx.beginPath();
    ctx.arc(circle_x, circle_y, circle.size, 0, Math.PI * 2);
    ctx.strokeStyle = circle.strokeStyle;
    ctx.stroke();

}

//event listen
const insertIndex = document.querySelector('.insertIndex');
const insertValue = document.querySelector('.insertValue');
const deleteIndex = document.querySelector('.deleteIndex');

const insertGo = document.querySelector('.insertGo');
const deleteGo = document.querySelector('.deleteGo');

insertGo.addEventListener('click', () => {
    drawCircle(insertIndex.value);
    arr[insertIndex.value] = insertValue.value;
});

deleteGo.addEventListener('click', () => {
    arr[deleteIndex.value] = null;
});
