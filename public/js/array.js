//event listen
const insertValue = document.querySelector('.insert');
const DeleteValue = document.querySelector('.delete');

const go = document.querySelectorAll('.go')
go.forEach((go) => {
    go.addEventListener('click', function () {

    })
})


//canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.lineWidth = 5;
ctx.strokeStyle = 'white';
ctx.font = '20px Arial';
ctx.fillStyle = 'white';
for (let i = 0; i < 20; i++) {
    //first line
    ctx.strokeRect(0 + i * 100, 50, 100, 100)
    ctx.fillText(`${i}`, 45 + i * 100, 45)
    //second line
    ctx.strokeRect(0 + i * 100, 250, 100, 100)
    ctx.fillText(`${i + 10}`, 40 + i * 100, 245)
}


