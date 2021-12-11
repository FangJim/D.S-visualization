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
    rateX: 0
}

update();

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawQueueFormat();

    enqueueObj();

    dequeueObj();

    drawQueue();

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
    ctx.moveTo(100, 150);
    ctx.lineTo(900, 150);
    ctx.moveTo(100, 250);
    ctx.lineTo(900, 250);
    ctx.stroke();

    //draw font
    // ctx.fillText('Front', 100, 145)
    // ctx.fillText('Rear', 840, 145)
}

function enqueueObj() {

}

function dequeueObj() {

}

function drawQueue() {

}


//event listen 
const enqueueValue = document.querySelector('.enqueueValue');

const enqueueGo = document.querySelector('.enqueueGo');
const dequeueGo = document.querySelector('.dequeueGo');

enqueueGo.addEventListener('click', () => {

})

dequeueGo.addEventListener('click', () => {

})