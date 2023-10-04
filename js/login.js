import { apiUrl, signIn } from "./all-func.js";

checkStatus ();

const myMail = document.querySelector('#myEmail');
const myPW = document.querySelector('#myPW')
const loginBtn = document.querySelector('#loginBtn');

loginBtn.addEventListener ('click', e => {
    e.preventDefault();
    let mail = myMail.value;
    let pw = myPW.value;
    signIn(mail, pw);
})



function checkStatus (){
    // console.log(localStorage.getItem("authorization"));
    axios.get (`${apiUrl}/check`,{
        headers:{
            'Authorization': localStorage.getItem("authorization")
        }
    })
    .then (response => location.replace("./myList.html"))
    .catch (error => {


        // localStorage.clear();
        // swal.fire(
        //     '請重新登入',
        //     '',
        //     'error'
        // ).then(res => location.replace("../index.html"))
    })
}