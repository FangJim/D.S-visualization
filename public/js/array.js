const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let arr = new Array(20).fill("");

//for knowing insert or delete now
let flag = {
    state: false,
    goto: null
};

update();

//main
function update() {

    drawArray();

    if (flag.state) {
        drawCircle(flag.goto)
    } else {
        drawSlash(flag.goto)
    }

    requestAnimationFrame(update)
}

//draw array
function drawArray() {
    let offset;

    //array setting
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'white';
    ctx.font = '25px Arial';
    ctx.fillStyle = 'white';

    for (let i = 0; i < 20; i++) {
        //adjust font offset
        if (arr[i] > 999) {
            offset = 25;
        }
        else if (arr[i] > 99) {
            offset = 30;
        }
        else if (arr[i] > 9) {
            offset = 35;
        }
        else {
            offset = 45;
        }


        //draw array
        if (i < 10) {
            //first line
            ctx.strokeRect(0 + i * 100, 50, 100, 100)
            ctx.fillText(`${i}`, 45 + i * 100, 45)
            ctx.fillText(`${arr[i]}`, offset + i * 100, 110)
        }
        else {
            //second line
            ctx.strokeRect(0 + (i - 10) * 100, 250, 100, 100)
            ctx.fillText(`${i}`, 35 + (i - 10) * 100, 245)
            ctx.fillText(`${arr[i]}`, offset + (i - 10) * 100, 310)
        }
    }
}


//draw circle
function drawCircle(index) {
    let circle_x = 50;
    let circle_y = 100;
    if (index > 9) {
        circle_y = 300;
    }
    circle_x += (index % 10) * 100;

    ctx.beginPath();
    ctx.arc(circle_x, circle_y, 50, 0, Math.PI * 2);
    ctx.strokeStyle = 'red';
    ctx.stroke();
}

function drawSlash(index) {
    if (flag.goto != null) {
        let line_x = 0;
        let line_y = 50;
        if (index > 9) {
            line_y = 250;
        }
        ctx.beginPath();
        ctx.moveTo(line_x + (index % 10) * 100, line_y);
        ctx.lineTo(line_x + (index % 10) * 100 + 100, line_y + 100);
        ctx.strokeStyle = 'red';
        ctx.stroke();
    }
}

//event listen
const insertIndex = document.querySelector('.insertIndex');
const insertValue = document.querySelector('.insertValue');
const deleteIndex = document.querySelector('.deleteIndex');

const insertGo = document.querySelector('.insertGo');
const deleteGo = document.querySelector('.deleteGo');

insertGo.addEventListener('click', () => {
    //both need to have value
    if (insertIndex.value == "" || insertValue.value == "") {
        return;
    }

    //out of range
    if (insertIndex.value > 19) {
        insertIndex.value = ""
        alert('Index out of range')
        return;
    }

    //insert to array
    arr[insertIndex.value] = insertValue.value;

    //effect variable
    flag.state = true
    flag.goto = insertIndex.value

    //init
    insertIndex.value = ""
    insertValue.value = ""
});

deleteGo.addEventListener('click', () => {
    //out of range
    if (deleteIndex.value > 19) {
        deleteIndex.value = ""
        alert('Index out of range')
        return;
    }

    //delete to array
    arr[deleteIndex.value] = "";

    //effect variable
    flag.state = false
    flag.goto = deleteIndex.value

    //init
    deleteIndex.value = "";
});
