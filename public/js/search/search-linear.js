const searchValue = document.querySelector(".searchValue");
const searchGo = document.querySelector(".searchGo");
const rects = document.querySelectorAll("rect");
const finds = document.querySelector(".find");
const tip = document.querySelector(".tips");

searchGo.addEventListener("click", () => {
  searchGo.disabled = true;
  let RectArray = [];
  let flag = 0;
  let i = 0;
  for (let i = 0; i < 50; i++) {
    rects[i].style.fill = "#09c";
  }
  rects.forEach((rect) => {
    RectArray.push(rect.height.animVal.value);
  });
  let intervalID = setInterval(() => {
    if (i > 49) {
      clearInterval(intervalID);
      searchGo.disabled = false;
      if (flag === 0) {
        finds.innerHTML = "Sorry,the value didn't find!!";
      }
    } else {
      if (RectArray[i] / 4 == searchValue.value) {
        rects[i].style.fill = "green";
        flag = 1;
      } else {
        rects[i].style.fill = "red";
      }
    }
    i++;
  }, 200);
});

tip.addEventListener("click", () => {
  Swal.fire({
    title: "Tips",
    html:
      "Linear search 的資料不需經過排序<br><br>" +
      "透過從頭開始進行搜尋，直到找到搜尋值或找不到為止",
  });
});
