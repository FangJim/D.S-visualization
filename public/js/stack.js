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
    this.peek = function () {
        return items[items.length - 1];
    }
    this.show = function () {
        return items;
    }
    this.print = function () {
        console.log(items);
    }
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
//build stack
let stack = new Stack();
let offsetValue = 20;
let anime = false;
let temp;
const move = {
    rateX: 0
}
update();

//main
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawStackFormat();

    currentObj();

    drawStack();

    requestAnimationFrame(update);
}

function currentObj() {
    if (move.rateX === 330) {
        anime = false;
        move.rateX = 0;
        stack.push(temp);
    }
    if (anime) {
        move.rateX += 2;
        //setting
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'white';
        ctx.font = '30px Arial';
        ctx.fillStyle = 'white';

        //get size to change y
        let size = stack.size();

        //font offset
        offset(temp);

        //draw
        ctx.strokeRect(20 + move.rateX, 430 - size * 50, 300, 50);
        ctx.fillText(`${temp}`, 165 + offsetValue + move.rateX, 465 - size * 50);
    }
}

function offset(value) {
    if (value > 999) {
        offsetValue = -25;
    }
    else if (value > 99) {
        offsetValue = -20;
    }
    else if (value > 9) {
        offsetValue = -15;
    }
    else {
        offsetValue = 0;
    }
}

function drawStackFormat() {
    //setting
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'white';

    //draw Stack
    ctx.beginPath();
    ctx.moveTo(350, 80);
    ctx.lineTo(350, 480);
    ctx.moveTo(350, 480);
    ctx.lineTo(650, 480);
    ctx.moveTo(650, 480);
    ctx.lineTo(650, 80);
    ctx.stroke();
}

function drawStack() {
    let arr = stack.show();
    for (let i = 0; i < arr.length; i++) {
        //font offset
        offset(arr[i]);
        //draw
        ctx.strokeRect(350, 430 - i * 50, 300, 50);
        ctx.fillText(`${arr[i]}`, 200 + offsetValue, 465 - size * 50);
    }
}


//event listen
const pushValue = document.querySelector('.pushValue');
const pushGo = document.querySelector('.pushGo');
const popGo = document.querySelector('.popGo');


pushGo.addEventListener('click', function () {
    if (pushValue.value == "") {
        alert('Please insert a numbers');
        return;
    }
    temp = pushValue.value;
    pushValue.value = "";
    anime = true;
})

popGo.addEventListener('click', function () {
    stack.pop();
    stack.print();
})

