import { apiUrl, signIn } from "./all-func.js";

let token = ""; //存放token

const myMail = document.querySelector('#myEmail');
const myPW = document.querySelector('#myPW')
const loginBtn = document.querySelector('#loginBtn');

loginBtn.addEventListener ('click', e => {
    e.preventDefault();
    let mail = myMail.value;
    let pw = myPW.value;
    signIn(mail, pw);
})
