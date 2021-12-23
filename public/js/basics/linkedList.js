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
let offsetValue = 0;
let indexNow = 0;
const effect = {
    r: 255,
    g: 255,
    b: 255,
    alpha: 0
}

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
        if (effect.alpha < 1) {
            effect.alpha = effect.alpha + (0.02 / linkedList.size())
        }
        buildLinkedList(i, linkedList_contents[i]);
    }
}

function offset(content) {
    if (content > 999) {
        offsetValue = 10;
    }
    else if (content > 99) {
        offsetValue = 5;
    }
    else if (content > 9) {
        offsetValue = 0;
    }
    else {
        offsetValue = -5;
    }
}

function buildLinkedList(index, content) {

    //for data offset
    offset(content)

    //for row change
    let y = 50
    if (index > 9) y = 150
    if (index > 19) y = 250


    //----------------------build LinkedList------------------------
    //effect
    //new one must be red
    if (index == indexNow) {
        effect.r = 255;
        effect.g = 121;
        effect.b = 77;
    }
    else {
        effect.r = 255;
        effect.g = 255;
        effect.b = 255;
    }

    //setting
    ctx.lineWidth = 3;
    ctx.strokeStyle = `rgba(${effect.r},${effect.g},${effect.b},${effect.alpha})`;
    ctx.font = '15px Arial';
    ctx.fillStyle = `rgba(${effect.r},${effect.g},${effect.b},${effect.alpha})`;

    //body
    ctx.strokeRect((index % 10) * 100, y, 80, 50)

    //index
    ctx.fillText(`${index}`, (index % 10) * 100 + 30, y - 10)

    //data
    ctx.fillText(content, (index % 10) * 100 + 25 - offsetValue, y + 30)

    //line
    ctx.beginPath();
    ctx.moveTo((index % 10) * 100 + 60, y);
    ctx.lineTo((index % 10) * 100 + 60, y + 50);
    ctx.strokeStyle = `rgba(${effect.r},${effect.g},${effect.b},${effect.alpha})`;
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
    effect.alpha = 0
    //no num
    if (appendValue.value == "") {
        alert('Please fill the value')
        return;
    }
    linkedList.append(appendValue.value)
    appendValue.value = ""

    //for know effect in which one
    indexNow = linkedList.size() - 1
})

//insert
insertGo.addEventListener('click', function () {
    effect.alpha = 0
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

    //for know effect in which one
    indexNow = insertIndex.value

    insertIndex.value = ""
    insertValue.value = ""

})

//delete
deleteGo.addEventListener('click', function () {
    effect.alpha = 0
    if (deleteIndex.value > linkedList.size()) {
        alert('index is not exist')
        deleteIndex.value = ""
        return;
    }
    linkedList.removeAt(deleteIndex.value)
    deleteIndex.value = ""
    indexNow = null
})

//tips
const tip = document.querySelector('.tips');

tip.addEventListener('click', () => {
    Swal.fire({
        title: 'Tips',
        html: "LinkedList是以串列連接的資料結構,優勢是可以快速插入資料和刪除,但劣勢搜尋數值必須每次都從頭開始<br><br>" +
            "append(value) //從串列最尾端插入數值<br>" +
            "insert(index,value) //從特定位置插入數值<br>" +
            "delete(index) //從特定位置刪除數值<br>"

    })
})