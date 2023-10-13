import { apiUrl , checkStatus, addTodo, toggleTodo, delTodo, updateTodo } from "./all-func.js";

checkStatus(); //先確認有無項目
const nickname = localStorage.getItem("nickName");
const title = document.querySelector(".userName");      
const plusBtn = document.querySelector(".plusTodo");    //新增待辦的按鈕
const nolist = document.querySelector('#noList');       //沒有列表的顯示內容
const logOutBtn = document.querySelector(".logOut");    //登出按鈕
const todoText = document.querySelector (".todoText"); //新增待辦的入欄位
const allList = document.querySelector('.all-list');  //所有列表的分頁面
const notYetList = document.querySelector ('.notYet');
const doneList = document.querySelector('.done')
const haveList = document.querySelector("#haveList");
const footerTotal = document.querySelector(".footerTotal");
const clearAllBtn = document.querySelector(".clear-done");

let totalTodos = 0;
let allDoneItems = [];

// 右上角顯示名稱
title.textContent = `${nickname} 的待辦`;

// 新增事項
plusBtn.addEventListener('click', e =>{
    e.preventDefault();
    let content = todoText.value;
    if (content.trim() === ""){
        swal.fire(
            '請輸入待辦事項',
            '',
            'warning'
        )
    }else{
        addTodo(content);
    }

})

//取得列表
getTodos();
function getTodos (){
    
    axios.get(`${apiUrl}/todos`,{
        headers:{
            'Authorization': localStorage.getItem("authorization")
        }
    })
        .then (response => {
        allDoneItems = [];//初始化已完成事項的ID陣列
            if(response.data.todos.length == 0){
                nolist.setAttribute("class","col-8 text-center")
            }else{
                haveList.setAttribute("class","col-lg-6 col-11")
                let renderText ="";
                let renderNotYetList ="";
                let renderDoneList ="";
                let arr = response.data.todos;

                arr.forEach(function (item,index){
                    if (item.completed_at == null){
                        renderText +=
                        `<li class="border-bottom mb-3 pb-2 d-flex align-items-center form-check form-check-inline" data-id="${item.id}">
                        <input class="form-check-input me-3" type="checkbox" data-id="${item.id}" data-isfinished="false" id="inlineCheckbox${index+1}">
                        <label class="me-auto form-check-label display-8 tc "  for="inlineCheckbox${index+1}" >${item.content}</label>
                        <a href="#" class="mx-3">
                            <i class="bi bi-pencil"></i>
                        </a>
                        <a href="#">
                            <img src="./images/close (1) 1.svg" alt="">
                        </a>    
                        </li>`;

                        renderNotYetList += 
                        `<li class="border-bottom mb-3 pb-2 d-flex align-items-center form-check form-check-inline" data-id="${item.id}">
                        <input class="form-check-input me-3" type="checkbox" data-id="${item.id}" data-isfinished="false" id="inlineCheckbox${index+1}">
                        <label class="me-auto form-check-label display-8 tc "  for="inlineCheckbox${index+1}" >${item.content}</label>
                        <a href="#" class="mx-3">
                            <i class="bi bi-pencil"></i>
                        </a>
                        <a href="#">
                            <img src="./images/close (1) 1.svg" alt="">
                        </a>    
                        </li>`;
                    }else {
                    renderText +=
                        `<li class="border-bottom mb-3 pb-2 d-flex align-items-center form-check form-check-inline" data-id="${item.id}">
                        <input class="form-check-input me-3" type="checkbox" id="inlineCheckbox${index+1}" data-isfinished="true" data-id="${item.id}"  checked>
                        <label class="me-auto form-check-label display-8 tc"  for="inlineCheckbox${index+1}"><del>${item.content}<del></label>
                        <a href="#" class="mx-3">
                            <i class="bi bi-pencil"></i>
                        </a>
                        <a href="#">
                            <img src="./images/close (1) 1.svg" alt="">
                        </a>    
                        </li>`;

                        renderDoneList +=
                        `<li class="border-bottom mb-3 pb-2 d-flex align-items-center form-check form-check-inline" data-id="${item.id}">
                        <input class="form-check-input me-3" type="checkbox" id="inlineCheckbox${index+1}" data-isfinished="true" data-id="${item.id}"  checked>
                        <label class="me-auto form-check-label display-8 tc"  for="inlineCheckbox${index+1}"><del>${item.content}<del></label>
                        <a href="#" class="mx-3">
                            <i class="bi bi-pencil"></i>
                        </a>
                        <a href="#">
                            <img src="./images/close (1) 1.svg" alt="">
                        </a>    
                        </li>`;
                        allDoneItems.push(item.id);
                    }

                    if (item.completed_at === null){
                        totalTodos += 1;
                    }
                    footerTotal.textContent = `${totalTodos}個待完成項目`
                })
                allList.innerHTML = renderText;
                notYetList.innerHTML = renderNotYetList;
                doneList.innerHTML = renderDoneList;

                // 全部render完後，呼叫清除全部的功能
                delAllDoneItmes(); 
            }

        })
        .catch (error => console.log(error.response))
}


logOutBtn.addEventListener ('click', e=> {
    e.preventDefault();
    axios.delete(`${apiUrl}/users/sign_out`,{
        headers:{
            'Authorization': localStorage.getItem("authorization")
        }
    })
    .then(response =>{
        localStorage.clear();
        swal.fire(
            '成功登出',
            '期待您下次的到來',
            'success'
        ).then(resulte => {
            window.location.replace("./index.html");
        })
        // console.log("已登出")
    })
    .catch(error => console.log("錯誤"))
})

allList.addEventListener ('click' , e => listDoSomething(e))
notYetList.addEventListener ('click' , e => listDoSomething(e))
doneList.addEventListener ('click' , e => listDoSomething(e))


//三個列表所要處理的雜事
function listDoSomething(e){
     //跑切換toggle的判斷
    if (e.target.nodeName == "INPUT"){
        let id = e.target.getAttribute("data-id");
        let finished = e.target.getAttribute("data-isfinished");
        if (finished === "false"){
            axios.patch(`${apiUrl}/todos/${id}/toggle`,{},
            {
                headers:{
                    'Authorization': localStorage.getItem("authorization")
                }
            })
            .then(response => {
                swal.fire(
                    {
                        position: 'center',
                        icon: 'success',
                        title: '恭喜完成',
                        showConfirmButton: false,
                        timer: 1000
                    }
                ).then (res => location.reload())
            })
            .catch(error => console.log(error.response))
        }else{
            axios.patch(`${apiUrl}/todos/${id}/toggle`,{},
            {
                headers:{
                    'Authorization': localStorage.getItem("authorization")
                }
            })
            .then(response => {
                swal.fire(
                    {
                        position: 'center',
                        icon: 'success',
                        title: '取消成功',
                        showConfirmButton: false,
                        timer: 1000
                    }
                ).then (res => location.reload())
            })
            .catch(error => console.log(error.response))
        }
    }
    
    //刪除事項的判斷
    if(e.target.nodeName == "IMG"){
        let id = e.target.closest("li").getAttribute("data-id");
        delTodo (id);
        // console.log(e.target.closest("li").getAttribute("data-id"));
    
    }
    
    //修改事項的判斷
    if (e.target.nodeName =="I"){
        let id = e.target.closest("li").getAttribute("data-id");
        let content = e.target.closest("li").textContent.trim();
    
        Swal.fire({
            title: '修改待辦事項',
            input: 'text',
            inputLabel: '請輸入待辦事項',
            inputValue: content,
            showCancelButton: true,
            cancelButtonText: '取消',
            confirmButtonText: '確認',
            inputValidator: (value) => {
                content = value;
                if (!value) {
                    return '請勿空白！'
                }
            }
        }).then (response => {
            let update = response.isConfirmed;
            if (update === true){
                updateTodo (id,content);
            }
        })
    }
}

//刪除全部已完成的項目
function delAllDoneItmes(){
    clearAllBtn.addEventListener('click', e => {

        if (allDoneItems.length == 0){
            Swal.fire('沒有已完成的項目')
            return
        }else{

            Swal.fire({
                title: '確定要刪除已完成的項目嗎?',
                text: "刪除之後無法復原喔！",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: '不，不要刪除',
                confirmButtonText: '確定！刪掉它吧！'
            }).then((result) => {

                if (result.isConfirmed) {

                    let promises =[];
                    allDoneItems.forEach((item,index)=>{
                        promises.push(axios.delete(`${apiUrl}/todos/${item}`,
                        {
                            headers:{
                                'Authorization': localStorage.getItem("authorization")
                            }
                        }));
                    })
                    Promise.all (promises)
                        .then (res => {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: '刪除成功！',
                                showConfirmButton: false,
                                timer: 1000
                            }).then ( res => location.reload())
                        })
                        .catch (error => console.log (error.response))
                }
            })
        }
    })
}

