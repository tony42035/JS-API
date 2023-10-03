import { apiUrl, signUp } from "./all-func.js";

const myEmail = document.querySelector('#myEmail');
const myNickName = document.querySelector('#myNickName');
const myPW = document.querySelector('#myPW');
const myPWAgain = document.querySelector ('#myPWAgain');
const signUpBtn = document.querySelector('#signUpBtn');

signUpBtn.addEventListener ('click', e =>{
    e.preventDefault();
    let email = myEmail.value;
    let nickName = myNickName.value;
    let pw = myPW.value;
    let pwagain = myPWAgain.value;

    if (email.trim()=== "" || nickName.trim()=== "" || pw.trim()==="" || pwagain.trim()===""){
        swal.fire(
            '請確實填寫每個欄位',
            '',
            'error'
        )
        .then (res => window.location.reload())
    }else if (pw !== pwagain){
        swal.fire(
            '兩次輸入的密碼不相同',
            '',
            'error'
        )
    }else{
        signUp(email,nickName,pw);
    }

    
})

