//implement Stack
function Stack() {
    let items = [];
    this.push = function (element) {
        items.push(element);
    }
    this.pop = function (element) {
        return items.pop(element);
    }
    this.size = function () {
        return items.length;
    }
    this.clear = function () {
        items = [];
    }
    this.print = function () {
        console.log(items);
    }
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
//build stack
let stack = new Stack();

update();

//main
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStack();
    currentObj();

    requestAnimationFrame(update)
}

function currentObj() {
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'white';

    ctx.strokeRect(100, 50, 300, 50);
}

function drawStack() {
    //setting
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(350, 100);
    ctx.lineTo(350, 480);
    ctx.moveTo(350, 480);
    ctx.lineTo(650, 480);
    ctx.moveTo(650, 480);
    ctx.lineTo(650, 100);
    ctx.strokeStyle = 'white';
    ctx.stroke();
}

//event listen
const pushValue = document.querySelector('.pushValue');
const pushGo = document.querySelector('.pushGo');
const popGo = document.querySelector('.popGo');


pushGo.addEventListener('click', function () {
    if (pushValue.value == "") alert('Please insert a numbers');
    stack.push(pushValue.value)
    stack.print();
    pushValue.value = "";
})
popGo.addEventListener('click', function () {
    stack.pop();
    stack.print();
})

