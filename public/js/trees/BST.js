class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
};
class BinarySearchTree {
    constructor() {
        this.root = null;
        this.arr = [];
    }
    insertNode(data) {
        let newNode = new Node(data);
        if (this.root === null) this.root = newNode;
        else this.insert(this.root, newNode);
    }
    insert(node, newNode) {
        if (newNode.data < node.data) {
            if (node.left === null)
                node.left = newNode;
            else//still have l child
                this.insert(node.left, newNode);
        }
        else {
            if (node.right === null)
                node.right = newNode;
            else//still have r child
                this.insert(node.right, newNode);
        }
    }
    search(node, data) {
        if (node === null)
            return 'Not found';
        else if (data < node.data)
            return this.search(node.left, data);
        else if (data > node.data)
            return this.search(node.right, data);
        else if (data === node.data) {
            return 'Found it'
        }
    }
    getRoot() {
        return this.root;
    }
    inOrder(node) {
        if (node !== null) {
            this.inOrder(node.left);
            this.arr.push(node.data);
            this.inOrder(node.right);
        }
    }
}


//for setting node's x,y,data
let nodeData = [];

//tips
const tip = document.querySelector('.tips');
tip.addEventListener('click', () => {
    Swal.fire({
        title: 'Tips',
        html: "Binary Search Tree(二元搜尋樹),顧名思義就是他的搜索過程非常快,而二元搜尋樹必須滿足<br>" +
            "1.若任意節點的左子樹不空，則左子樹上所有節點的值均小於它的根節點的值<br>" +
            "2.若任意節點的右子樹不空，則右子樹上所有節點的值均大於它的根節點的值<br>" +
            "3.任意節點的左、右子樹也分別為二元搜尋樹<br><br>" +
            "Insert(value) //新增節點至樹中,由根節點開始比對,大於往右子樹,小於往左子樹,直到走到底則插入<br>" +
            "Delete(index) //刪除樹中的index號節點,再將樹重新調整成BST<br>" +
            "Search(value) //找尋value,由根節點開始比對,大於往右子樹,小於往左子樹,等於則輸出該節點index值<br><br>" +
            "<strong>樹的走訪</strong><br>" +
            "從樹的根節點(Root)開始走訪,有的步驟是<br>" +
            "A.輸出該點<br>" +
            "B.前往左子樹(直到無左子點)<br>" +
            "C.前往右子樹(直到無右子點)<br><br>" +
            "走訪方式有以下三種<br>" +
            "PreOrder : A->B->C 當前進到新的點就要從A步驟開始<br>" +
            "InOrder : B->A->C 當前進到新的點就要從B步驟開始<br>" +
            "PostOrder :B->C->A 當前進到新的點就要從B步驟開始<br>"
    })
})