class Queue {
    constructor() {
        this.items = [];
    }
    enqueue(element) {
        this.items.push(element);
    }
    dequeue() {
        return this.items.shift();
    }
    front() {
        return this.items[0];
    }
    size() {
        return this.items.length;
    }
    show() {
        return this.items;
    }
    print() {
        console.log(this.items);
    }
}


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//build queue
let queue = new Queue();

let offsetValue = 20;
let enqueueAnime = false;
let dequeueAnime = false;
let temp;

const move = {
    X: 1000,
    alpha: 0
}

update();

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawQueueFormat();

    enqueueObj();

    dequeueObj();

    drawQueue();

    //give rear and front
    mark();

    requestAnimationFrame(update);
}

function drawQueueFormat() {
    //setting
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'white';
    ctx.font = '30px Arial';
    ctx.fillStyle = 'white';

    //draw Stack
    ctx.beginPath();
    ctx.moveTo(100, 140);
    ctx.lineTo(900, 140);
    ctx.moveTo(100, 260);
    ctx.lineTo(900, 260);
    ctx.stroke();

    //draw font
    // ctx.fillText('Front', 100, 145)
    // ctx.fillText('Rear', 840, 145)
}

function enqueueObj() {
    let size = queue.size();
    if (move.X < 150 + size * 100 && enqueueAnime) {
        enqueueAnime = false
        queue.enqueue(temp);
        move.X = 1000

        enqueueGo.disabled = false;
        dequeueGo.disabled = false;
    }
    if (enqueueAnime) {
        move.X -= 5;
        ctx.beginPath();
        offset(temp)
        ctx.strokeStyle = `red`;
        ctx.fillStyle = `red`;
        ctx.arc(move.X, 200, 45, 0, Math.PI * 2);
        ctx.fillText(`${temp}`, move.X + offsetValue, 210);
        ctx.stroke();
    }
}

function offset(value) {
    if (value > 999) {
        offsetValue = -30;
    }
    else if (value > 99) {
        offsetValue = -25;
    }
    else if (value > 9) {
        offsetValue = -15;
    }
    else {
        offsetValue = -5;
    }
}

function dequeueObj() {
    if (move.X === -100 && dequeueAnime) {
        dequeueAnime = false
        move.X = 1000

        queue.dequeue()
        enqueueGo.disabled = false;
        dequeueGo.disabled = false;
    }
    if (dequeueAnime) {
        move.X -= 2
        offset(temp);
        ctx.strokeStyle = `red`;
        ctx.fillStyle = `red`;
        ctx.beginPath();
        ctx.arc(move.X, 200, 45, 0, Math.PI * 2);
        ctx.fillText(`${temp}`, move.X + offsetValue, 210);
        ctx.stroke();
    }
}

function drawQueue() {
    ctx.strokeStyle = `white`;
    ctx.fillStyle = `white`;
    let size = queue.size();
    let queueValue = queue.show();
    let i;
    (dequeueAnime) ? i = 1 : i = 0
    for (i; i < size; i++) {
        //font offset
        offset(queueValue[i]);
        //draw
        ctx.beginPath();
        ctx.arc(150 + i * 100, 200, 45, 0, Math.PI * 2);
        ctx.fillText(`${queueValue[i]}`, 150 + i * 100 + offsetValue, 210);
        ctx.stroke();
    }
}

function mark() {
    let size = queue.size();
    ctx.font = '25px Arial';
    ctx.fillStyle = `rgba(255, 255, 255, ${move.alpha})`;
    if (!enqueueAnime && !dequeueAnime) {
        if (size === 1) {
            if (move.alpha < 1) {
                move.alpha += 0.02;
            }
            ctx.fillText(`Front/Rear`, 93, 130);
        }
        else if (size > 1) {
            if (move.alpha < 1) {
                move.alpha += 0.02;
            }
            ctx.fillText(`Front`, 120, 130);
            ctx.fillText(`Rear`, 20 + size * 100, 130);
        }
    }
}

//event listen 
const enqueueValue = document.querySelector('.enqueueValue');

const enqueueGo = document.querySelector('.enqueueGo');
const dequeueGo = document.querySelector('.dequeueGo');

enqueueGo.addEventListener('click', () => {
    if (enqueueValue.value === "") {
        alert('Fill the value please')
        return
    }
    if (queue.size() == 8) {
        alert('Sorry, the queue is full')
        return
    }

    move.alpha = 0;
    enqueueGo.disabled = true;
    dequeueGo.disabled = true;
    enqueueAnime = true
    temp = enqueueValue.value
    enqueueValue.value = ""
})

dequeueGo.addEventListener('click', () => {
    dequeueAnime = true
    temp = queue.front();
    move.X = 150
    enqueueGo.disabled = true;
    dequeueGo.disabled = true;
})