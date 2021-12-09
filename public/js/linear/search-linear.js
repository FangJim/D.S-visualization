const searchValue = document.querySelector(".searchValue");
const searchGo = document.querySelector(".searchGo");
const rects = document.querySelectorAll("rect");

searchGo.addEventListener("click", () => {
    searchGo.disabled=true;
    let RectArray=[];
    let i  = 0;
    for (let i = 0; i < 50; i++) {
        rects[i].style.fill="#09c"   
    }
    rects.forEach((rect)=>{
        RectArray.push(rect.height.animVal.value)
    })
    let intervalID = setInterval(()=>{
        if(i>49){ 
            clearInterval(intervalID);
            searchGo.disabled=false;
        }
        else{
            if(RectArray[i]/4 == searchValue.value){
                rects[i].style.fill="green"
            }
            else{
                rects[i].style.fill="red"
            }
        }
        i++;
    },200)
});



