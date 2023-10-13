// API網址
export const apiUrl = "https://todoo.5xcamp.us";  //API URL

//登入功能
export function signIn(email,password){
    axios.post(`${apiUrl}/users/sign_in`,{
        "user": {
            "email": email,
            "password": password
        }
    })
    .then (response => {
        // console.log (response.headers.authorization);
        Swal.fire(
            '登入成功',
            `${response.data.nickname}，歡迎回來<br>`,
            'success')
            .then(res => {
                localStorage.clear();
                localStorage.setItem("authorization",response.headers.authorization);
                localStorage.setItem("nickName",response.data.nickname);
                location.replace("./myList.html");
            })
    })
    .catch (error => {
        Swal.fire(
            '登入失敗',
            '請檢查帳號及密碼',
            'error')
            .then(res => location.reload())
    })
}


// 取得列表
export function getTodos (){
    axios.get(`${apiUrl}/todos`,{
        headers:{
            'Authorization': localStorage.getItem("authorization")
        }
    })
        .then (response => {
            if(response.data.todos.length == 0){
                return 100
            }
            // console.log(response.data.todos.length);
        })
        .catch (error => console.log(error.response))
}


//新增todo
export function addTodo(newTodo){
    axios.post(`${apiUrl}/todos`,
    {
        "todo": {
            "content": newTodo
        }
    },{
        headers:{
            'Authorization': localStorage.getItem("authorization")
        }
    })
    .then(response => {
        swal.fire (
            {
                position: 'center',
                icon: 'success',
                title: '新增待辦事項成功',
                showConfirmButton: false,
                timer: 1000
            }
        ).then (resulte => location.reload())
    })
    .catch(error => console.log(error.response))
}


//修改todo
export function updateTodo(id,content){
    axios.put(`${apiUrl}/todos/${id}`,
    {
        "todo": {
            "content": content
        }
    },{
        headers:{
            'Authorization': localStorage.getItem("authorization")
        }
    })
    .then(response => {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: '修改成功！',
            showConfirmButton: false,
            timer: 1000
        }).then ( res => location.reload())
    })
    .catch(error => console.log(error.response))
}


//刪除todo
export function delTodo (id){


    Swal.fire({
        title: '確定要刪除嗎?',
        text: "刪除之後無法復原喔！",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: '不，不要刪除',
        confirmButtonText: '確定！刪掉它吧！'
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`${apiUrl}/todos/${id}`,
            {
                headers:{
                    'Authorization': localStorage.getItem("authorization")
                }
            })
            .then(response => {
                Swal.fire(
                    '刪除完成！',
                    '待辦事項成功刪除囉！',
                    'success'
                ).then(res => location.reload())
            })
            .catch(error => console.log(error.response))            
        }
    })


}


//是否已完成
export function toggleTodo(id){
    axios.patch(`${apiUrl}/todos/${id}/toggle`,{},
    {
        headers:{
            'Authorization': localStorage.getItem("authorization")
        }
    })
    .then(response => console.log(response))
    .catch(error => console.log(error.response))
}


//註冊功能
export function signUp(email,nickname,password){
    axios.post(`${apiUrl}/users`,{
        "user": {
            "email": email,
            "nickname": nickname,
            "password": password
        }
    })
    .then ( response => {
        swal.fire(
            '註冊成功！',
            `${response.data.nickname}，歡迎您的加入`,
            'success'
        ).then(res =>{
            localStorage.clear();
            localStorage.setItem("authorization",response.headers.authorization);
            localStorage.setItem("nickName",response.data.nickname);
            location.replace("./myList.html");
        })
    })
    .catch ( error => {
        let errInfo = error.response.data.error;
        let errList = "";
        errInfo.forEach((item,index)=> {
            errList += `${index+1}.${item} <br>`;
        } )
        console.log(errList);

        Swal.fire(
            '格式錯誤',
            errList,
            'error')
        // console.log (error.response.data.message);
        // console.log (error.response.data.error); 
    })
}

//是否登入
export function checkStatus (){
    // console.log(localStorage.getItem("authorization"));
    axios.get (`${apiUrl}/check`,{
        headers:{
            'Authorization': localStorage.getItem("authorization")
        }
    })
    .then (response => {
        // console.log(response)
    })
    .catch (error => {
        localStorage.clear();
        swal.fire(
            '請重新登入',
            '',
            'error'
        ).then(res => location.replace("./index.html"))
    })
}