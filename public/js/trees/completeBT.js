class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class CompleteBinaryTree {

    // Performs preorder traversal of a tree   
    preOrder(node) {
        if (node !== null) {
            console.log(node.data);
            this.preOrder(node.left);
            this.preOrder(node.right);
        }
    }

    inOrder(node) {
        if (node !== null) {
            this.inOrder(node.left);
            console.log(node.data);
            this.inOrder(node.right);
        }
    }

    postOrder(node) {
        if (node !== null) {
            this.postOrder(node.left);
            this.postOrder(node.right);
            console.log(node.data);
        }
    }

}


const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
update();

function update() {

}

function drawTree() {

}

function treeFormat() {

}

function insertNode() {

}

function deleteNode() {

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
