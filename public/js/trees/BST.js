//tips
const tip = document.querySelector('.tips');
tip.addEventListener('click', () => {
    Swal.fire({
        title: 'Tips',
        html: "每次新增節點到Complete Binary Tree中都必須由上而下,由左至右" +
            ",刪除節點後必須將該刪除點後的所有點向左填補空缺<br><br>" +
            "Insert(value) //新增節點至樹中<br>" +
            "Delete(index) //刪除樹中的index號節點<br><br>" +
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