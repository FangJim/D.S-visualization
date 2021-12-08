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
        console.log(items.toString());
    }
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


update();

function update() {
    drawStack();

    requestAnimationFrame(update)
}

function drawStack() {

}

const pushValue = document.querySelector('.pushValue');

const pushGo = document.querySelector('.pushGo');
const popGo = document.querySelector('.popGo');


pushGo.addEventListener('click', function () {

})
popGo.addEventListener('click', function () {

})

