const searchValue = document.querySelector(".searchValue");
const searchGo = document.querySelector(".searchGo");
const rects = document.querySelectorAll("rect");

searchGo.addEventListener("click", () => {
    searchGo.disabled=true;
    let RectArray=[];
    let l = 0;
    let u = 49;
    let m = 0;
    for (let i = 0; i < 50; i++) {
        rects[i].style.fill="#09c"   
    }
    rects.forEach((rect)=>{
        RectArray.push(rect.height.animVal.value)
    })
    let intervalID = setInterval(()=>{
        m=Math.floor((l+u)/2);
        console.log(m);
        if(l>u){ 
            clearInterval(intervalID);
            searchGo.disabled=false;
        }
        if(RectArray[m]/4 == searchValue.value){
            rects[m].style.fill="green"
            clearInterval(intervalID);
            searchGo.disabled=false;
        }
        else if(RectArray[m]/4 > searchValue.value){
            rects[m].style.fill="red"  
            u=m-1
        }
        else if(RectArray[m]/4 < searchValue.value){
            rects[m].style.fill="red"  
            l=m+1
        }
    },800)
});



