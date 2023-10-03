import { apiUrl , checkStatus } from "./all-func.js";

checkStatus();
const nickname = localStorage.getItem("nickName");
const title = document.querySelector(".userName");
const plusBtn = document.querySelector(".plusTodo");
title.textContent = `${nickname} 的待辦`;
const nolist = document.querySelector('#noList');
const logOutBtn = document.querySelector(".logOut");


getTodos();

function getTodos (){
    axios.get(`${apiUrl}/todos`,{
        headers:{
            'Authorization': localStorage.getItem("authorization")
        }
    })
        .then (response => {
            if(response.data.todos.length == 0){
                nolist.setAttribute("class","col-8 text-center")
            }
            // console.log(response.data.todos.length);
        })
        .catch (error => console.log(error.response))
}


plusBtn.addEventListener('click', e =>{
    e.preventDefault();
})

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
            window.location.replace("../index.html");
        })
        // console.log("已登出")
    })
    .catch(error => console.log("錯誤"))
})


