class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}
class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(data) {
        let newNode = new Node(data);
        if (this.root === null) this.root = newNode;
        else this.insertNode(this.root, newNode);
    }

    insertNode(node, newNode) {
        if (newNode.data < node.data) {
            if (node.left === null)
                node.left = newNode;
            else//still have l child
                this.insertNode(node.left, newNode);
        }
        else {
            if (node.right === null)
                node.right = newNode;
            else//still have r child
                this.insertNode(node.right, newNode);
        }
    }

    remove(data) {
        this.root = this.removeNode(this.root, data);
    }

    removeNode(node, key) {
        if (node === null)
            return null;
        else if (key < node.data) {
            node.left = this.removeNode(node.left, key);
            return node;
        }
        else if (key > node.data) {
            node.right = this.removeNode(node.right, key);
            return node;
        }
        else {
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }
            if (node.left === null) {
                node = node.right;
                return node;
            }

            else if (node.right === null) {
                node = node.left;
                return node;
            }

            var aux = this.findMinNode(node.right);
            node.data = aux.data;

            node.right = this.removeNode(node.right, aux.data);
            return node;
        }

    }

    getRoot() {
        return this.root;
    }

    inOrder(node) {
        if (node !== null) {
            this.inOrder(node.left);
            console.log(node.data);
            this.inOrder(node.right);
        }
    }
    preOrder(node) {
        if (node !== null) {
            console.log(node.data);
            this.inOrder(node.left);
            this.inOrder(node.right);
        }
    }
    postOrder(node) {
        if (node !== null) {
            this.inOrder(node.left);
            this.inOrder(node.right);
            console.log(node.data);
        }
    }
}
//build BST
let BST = new BinarySearchTree()
let bst_Data_Arr = [100, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
let middle = []

//node structure
const nodeStructure = {
    nodeX: 800,
    nodeY: 50,
    size: 20,
    lineSize: 20,
    lineOffset: 5
}


//global variables
let temp;
let fontOffset = 0;
let theLeftist_Node = nodeStructure.nodeX
let row_count = 0;
let node_spacing = 85;

//canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.lineWidth = 4;
ctx.strokeStyle = 'white';
ctx.font = '20px Arial';
ctx.fillStyle = 'white';
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
    for (let i = 0; i < bst_Data_Arr.length; i++) {
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
        //what type we need to draw(start from level 0)
        drawNode(i, level - 1)
        drawLine(middle)
        drawData()
    }
}

//using Dynamic Programming draw Node
function drawNode(nodeNumber, level) {
    let recordMiddle;
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
    if (middle.length != bst_Data_Arr.length) {
        middle.push(recordMiddle)
    }
    row_count++;
    ctx.stroke();
}
//draw line
function drawLine(middle) {
    let level = 0
    let y = 80
    let yOffset = -10
    for (let i = 1; i < middle.length; i++) {
        if (i === 1 || i === 3 || i === 7 || i === 14) {
            level++
            yOffset += 10
        }
        if (i % 2 === 0) continue
        ctx.beginPath();
        ctx.moveTo(middle[Math.ceil(i / 2) - 1], y * level + yOffset);
        ctx.lineTo(middle[Math.floor(i / 2) * 2 + 1], y * level + 30 + yOffset);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(middle[Math.ceil(i / 2) - 1], y * level + yOffset);
        ctx.lineTo(middle[Math.floor(i / 2) * 2 + 2], y * level + 30 + yOffset);
        ctx.stroke();
    }
    level = 0
    yOffset = -10
}
//draw data
function drawData() {
    ctx.font = '28px Arial';
    let level = 0
    let yOffset = 60
    for (let i = 0; i < bst_Data_Arr.length; i++) {
        offset(bst_Data_Arr[i])
        if (i === 1 || i === 3 || i === 7 || i === 15) {
            level++
            yOffset += 90
        }
        ctx.fillText(`${bst_Data_Arr[i]}`, middle[i] + fontOffset, yOffset);
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
const deleteValue = document.querySelector('.deleteValue');
const deleteGo = document.querySelector('.deleteGo');


insertGo.addEventListener('click', () => {
    temp = insertValue.value;
})