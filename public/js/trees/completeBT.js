let completeBT_data = [];
let middle = []

//node structure
const nodeStructure = {
    nodeX: 800,
    nodeY: 50,
    size: 20,
    lineSize: 20,
    lineOffset: 5
}

//effect
let effect = {
    alpha: 0,
    lineX: 0,
    lineY: 0
}

//global variables
let recordMiddle;
let fontOffset = 0;
let row_count = 0;
let have_rChild = false
let deleteEffect = false
let lChild_color = 'white'
let rChild_color = 'white'

//canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
update();

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawTree();

    requestAnimationFrame(update);
}

function drawTree() {
    let level = 1;
    let exp = 0;
    let count = 0;
    for (let i = 0; i < completeBT_data.length; i++) {
        //calculate height
        count++;
        if (i === 0) {
            level = 1
            //for next round
            exp++
            count = 0
        }
        else if (count <= Math.pow(2, exp)) {
            level = exp + 1
        }
        else if (count > Math.pow(2, exp)) {//change row
            exp++;
            count = 1;
            level = exp + 1;
        }

        //effect alpha
        if (effect.alpha < 1) {
            effect.alpha += 0.02 / completeBT_data.length //maintain the rate
        }

        drawNode(i, level - 1)//what type we need to draw(start from level 0)
        drawLine(middle)
        drawData()
    }
}

//using Dynamic Programming draw Node
function drawNode(nodeNumber, level) {
    //effect
    ctx.lineWidth = 4;
    if (deleteEffect) {
        ctx.strokeStyle = 'white';
    }
    else if (nodeNumber === completeBT_data.length - 1) {//the last one
        ctx.strokeStyle = `rgba(255,0,0,${effect.alpha})`;
    }
    else {//others
        ctx.strokeStyle = 'white';
    }

    //draw
    ctx.beginPath();
    if (nodeNumber === 0) {
        recordMiddle = 800;
        ctx.arc(middle[0], nodeStructure.nodeY, 30, 0, Math.PI * 2);
    }
    else if (nodeNumber % 2 === 1) {
        recordMiddle = middle[Math.floor(nodeNumber / 2)] - nodeSpacing(nodeNumber)
        ctx.arc(recordMiddle, nodeStructure.nodeY + level * 90, 30, 0, Math.PI * 2);
    }
    else if (nodeNumber % 2 === 0) {
        recordMiddle = middle[Math.floor(nodeNumber / 2) - 1] + nodeSpacing(nodeNumber)
        ctx.arc(recordMiddle, nodeStructure.nodeY + level * 90, 30, 0, Math.PI * 2);
    }

    middle[nodeNumber] = recordMiddle

    row_count++;
    ctx.stroke();
}

//draw line
function drawLine(middle) {
    //variable
    let level = 0
    let y = 80
    let yOffset = -10
    //effect
    ctx.strokeStyle = `rgba(255,255,255,${effect.alpha})`;

    //draw
    for (let i = 1; i < middle.length; i++) {//root don't need branch
        //change level
        if (i === 1 || i === 3 || i === 7 || i === 14) {
            level++
            yOffset += 10
        }

        //start from the left child
        if (i % 2 === 0) continue

        //formula
        let beginX = middle[Math.ceil(i / 2) - 1]//find father
        let beginY = y * level + yOffset
        let endX_lChild = middle[Math.floor(i / 2) * 2 + 1]//find leftChild position
        let endX_rChild = middle[Math.floor(i / 2) * 2 + 2]//find rChild position
        let endY = y * level + yOffset + 30

        if (deleteEffect) {
            lChild_color = 'white';
            rChild_color = 'white';
        }
        else if (have_rChild && i === middle.length - 2) {// have rChild the last one draw red
            lChild_color = 'white'
            rChild_color = `rgba(255,0,0,${effect.alpha})`;
        }
        else if (i === middle.length - 1) {//only lChild the last one draw red
            lChild_color = `rgba(255,0,0,${effect.alpha})`;
        }
        else {//others
            lChild_color = 'white'
            rChild_color = 'white'
        }


        //draw Left child
        ctx.strokeStyle = lChild_color;
        ctx.beginPath();
        ctx.moveTo(beginX, beginY);
        ctx.lineTo(endX_lChild, endY);
        ctx.stroke();

        //draw Right child
        ctx.strokeStyle = rChild_color;
        ctx.beginPath();
        ctx.moveTo(beginX, beginY);
        ctx.lineTo(endX_rChild, endY);
        ctx.stroke();
    }

    //reset
    level = 0
    yOffset = -10
}

//draw data
function drawData() {
    let yOffset = 60

    //draw
    for (let i = 0; i < completeBT_data.length; i++) {
        ctx.font = '28px Arial';
        //effect
        if (deleteEffect) {
            ctx.fillStyle = 'white';
        }
        else if (i === completeBT_data.length - 1) {//the last one
            ctx.fillStyle = `rgba(255,0,0,${effect.alpha})`;
        }
        else {//others
            ctx.fillStyle = 'white';
        }

        offset(completeBT_data[i])
        if (i === 1 || i === 3 || i === 7 || i === 15) {
            yOffset += 90
        }
        ctx.fillText(`${completeBT_data[i]}`, middle[i] + fontOffset, yOffset);
        ctx.font = '20px Arial';
        ctx.fillText(`${i}`, middle[i] + 38, yOffset - 18);
    }
}

//font offset
function offset(value) {
    if (value > 99) {
        fontOffset = -24;
    }
    else if (value > 9) {
        fontOffset = -15;
    }
    else {
        fontOffset = -7;
    }
}

//node spacing decrease
function nodeSpacing(nodeNumber) {
    if (nodeNumber >= 1 && nodeNumber <= 2) {
        return 410
    }
    else if (nodeNumber >= 3 && nodeNumber <= 6) {
        return 200
    }
    else if (nodeNumber >= 7 && nodeNumber <= 14) {
        return 100
    }
    else return 50
}

//traversal
const preOrder = document.querySelector('.preOrder');
const inOrder = document.querySelector('.inOrder');
const postOrder = document.querySelector('.postOrder');

preOrder.addEventListener('click', () => {

})
inOrder.addEventListener('click', () => {

})
postOrder.addEventListener('click', () => {

})

//methods
const insertValue = document.querySelector('.insertValue');
const insertGo = document.querySelector('.insertGo');
const deleteIndex = document.querySelector('.deleteIndex');
const deleteGo = document.querySelector('.deleteGo');


insertGo.addEventListener('click', () => {
    deleteEffect = false
    if (insertValue.value == "") {
        alert('You should input the value')
        return;
    }

    //push
    completeBT_data.push(insertValue.value)
    if ((completeBT_data.length - 1) % 2 === 0) {//have rChild
        have_rChild = true
    }
    else {
        have_rChild = false
    }

    //initial
    insertValue.value = ""
    effect.alpha = 0
})

deleteGo.addEventListener('click', () => {
    deleteEffect = true //change all to white
    if (deleteIndex.value === "") {
        alert('You should input the delete index')
        return
    }
    completeBT_data.splice(deleteIndex.value, 1)
    middle.splice(deleteIndex.value, 1)
    deleteIndex.value = ""
})