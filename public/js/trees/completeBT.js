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
let bst_Data_Arr = [30, 23, 49, 3, 5];

//node structure
const nodeStructure = {
    nodeX: 400,
    nodeY: 40,
    size: 20,
    lineSize: 20,
    lineOffset: 5
}


//global variables
let temp;
let fontOffset = 0;
let changeLevel = false
let theLeftist_Node = nodeStructure.nodeX
let row_node_num = 0;

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
            changeLevel = true;
        }

        //what type we need to draw(start from level 0)
        drawNode(bst_Data_Arr[i], level - 1, i)
    }
}
//root structure
function drawNode(data, level, i) {
    let most_num_row = Math.floor(800 / level)
    theLeftist_Node = nodeStructure.nodeX - level * 25
    offset(data)
    ctx.beginPath();
    if (i === 0) {
        ctx.arc(theLeftist_Node, nodeStructure.nodeY, 20, 0, Math.PI * 2);
        // ctx.fillText(data, 400 + fontOffset, level * 65 + 47);
    }
    else if (i % 2 === 1) {
        ctx.arc(theLeftist_Node, nodeStructure.nodeY + level * 65, 20, 0, Math.PI * 2);
        // ctx.moveTo(400, level * 60);
        // ctx.lineTo(380, level * 60 + 25);
        // ctx.fillText(data, 375 + fontOffset, level * 65 + 47);
    }
    else if (i % 2 === 0) {
        ctx.arc(theLeftist_Node + i * 25, nodeStructure.nodeY + level * 65, 20, 0, Math.PI * 2);
        // ctx.moveTo(400, level * 60);
        // ctx.lineTo(420, level * 60 + 25);
        // ctx.fillText(data, 425 + fontOffset, level * 65 + 47);
    }
    ctx.stroke();
}

//font offset
function offset(value) {
    if (value > 99) {
        fontOffset = -20;
    }
    else if (value > 9) {
        fontOffset = -10;
    }
    else {
        fontOffset = 0;
    }
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