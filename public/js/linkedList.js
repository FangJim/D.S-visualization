//node structure
class Node {
    constructor(item) {
        this.item = item;
        this.next = null;
    }
}

//implement LinkedList
class LinkedList {
    constructor() {
        this.length = 0;
        this.head = null;
    }
    append(element) {
        let node = new Node(element);
        if (!this.head) {//head===null
            this.head = node;
        } else {
            let tail = this.head;
            while (tail.next) {
                tail = tail.next;
            }
            tail.next = node;
        }
        this.length++;
    }

    insert(position, element) {
        if (position > -1 && position < this.length) {
            let node = new Node(element);
            let current = this.head;
            let previous;
            let index = 0;
            if (position === 0) {
                node.next = current;
                this.head = node;
            }
            else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                previous.next = node;
                node.next = current;
            }
            this.length++;
            return true;
        }
        else {
            return false;
        }
    }

    size() {
        return this.length;
    }

    removeAt(position) {
        if (position > -1 && position < this.length) {
            let current = this.head;
            let previous;
            let index = 0;
            if (position == 0) {
                head = current.next;
            } else {
                while (index++ < position) {//跑完才加
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
            }
            this.length--;
            return current.element;
        } else {
            return null;
        }
    }

    print() {
        let current = this.head;
        let result = [];
        while (current != null) {
            result.push(current.item);
            current = current.next;
        }
        // console.log(result);
        return result;
    }
}

//start canvas part
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


let linkedList = new LinkedList();
update();

//main function
function update() {
    drawLinkedList();

    requestAnimationFrame(update);
}

function drawLinkedList() {
    const linkedList_contents = linkedList.print();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < linkedList.size(); i++) {
        buildLinkedList(i, linkedList_contents[i]);
    }
}

function buildLinkedList(index, content) {
    //for data offset
    let offset = 0;
    if (content > 999) {
        offset = 10;
    }
    else if (content > 99) {
        offset = 5;
    }
    else if (content > 9) {
        offset = 0;
    }
    else {
        offset = -5;
    }

    //for row change
    let y = 50
    if (index > 9) y = 150
    if (index > 19) y = 250


    //----------------------build LinkedList------------------------

    //setting
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'white';
    ctx.font = '15px Arial';
    ctx.fillStyle = 'white';

    //body
    ctx.strokeRect((index % 10) * 100, y, 80, 50)

    //index
    ctx.fillText(`${index}`, (index % 10) * 100 + 30, y - 10)

    //data
    ctx.fillText(content, (index % 10) * 100 + 25 - offset, y + 30)

    //line
    ctx.beginPath();
    ctx.moveTo((index % 10) * 100 + 60, y);
    ctx.lineTo((index % 10) * 100 + 60, y + 50);
    ctx.strokeStyle = 'white';
    ctx.stroke();

    //next
    ctx.font = '30px Arial';
    ctx.fillText('➝', (index % 10) * 100 + 70, y + 35)
}



//event listen
const appendValue = document.querySelector('.appendValue');
const insertIndex = document.querySelector('.insertIndex');
const insertValue = document.querySelector('.insertValue');
const deleteIndex = document.querySelector('.deleteIndex');

const appendGo = document.querySelector('.appendGo');
const insertGo = document.querySelector('.insertGo');
const deleteGo = document.querySelector('.deleteGo');


//append
appendGo.addEventListener('click', function () {
    if (appendValue.value == "") {
        alert('Please fill the value')
        return;
    }
    linkedList.append(appendValue.value)
    appendValue.value = ""
})

//insert
insertGo.addEventListener('click', function () {
    //both need to have value
    if (insertIndex.value == "" || insertValue.value == "") {
        return;
    }

    //can not insert out of length
    if (insertIndex.value > linkedList.size()) {
        alert('Out of length')
        insertIndex.value = ""
        insertValue.value = ""
        return
    }
    linkedList.insert(insertIndex.value, insertValue.value)
    linkedList.print();
    insertIndex.value = ""
    insertValue.value = ""
})

//delete
deleteGo.addEventListener('click', function () {
    if (deleteIndex.value > linkedList.size()) {
        alert('index is not exist')
        deleteIndex.value = ""
        return;
    }
    linkedList.removeAt(deleteIndex.value)
    deleteIndex.value = ""
})