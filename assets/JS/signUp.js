// form sign up and login
//acc được loggin sẽ được đẩy vào localStorage với key là loggedin (chỉ có 1 phần tử)
const createLoggedin = () => {
    const loggedin = JSON.parse(localStorage.getItem('loggedin')) || [];
    localStorage.setItem('loggedin', JSON.stringify(loggedin));
}


var loggedinArray = JSON.parse(localStorage.getItem("loggedin") || "[]");


var user1;
// Hàm tạo user
function createnewuser() {
    let userArray = JSON.parse(localStorage.getItem("user-list") || "[]");
    user1 = {
        name: document.getElementById("fullName").value,
        adress: document.getElementById("address").value,
        phone: document.getElementById("phone").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        type: "user",
        id: Math.floor(new Date().valueOf() * Math.random())
    };
    userArray.push(user1);
    localStorage.setItem('user-list', JSON.stringify(userArray));
}

//Gọi hàm createnewuser và check form signup
function checkFormSignup() {
    if (checkFormLogUp()) {
        createnewuser();
        resetFormSignup();
        //alert tạo user thành công (Sign up thành công)
        alert('Sign up success')
    }
}

// Yêu cầu: Hàm xét lại giá trị của các ô input signup
var resetFormSignup = () => {
    let fullname = document.getElementById('fullName');
    fullname.value = '';
    let address = document.getElementById('address');
    address.value = '';
    let phone = document.getElementById('phone');
    phone.value = '';
    let username = document.getElementById('username');
    username.value = '';
    let password = document.getElementById('password');
    password.value = '';
    let repeatpassword = document.getElementById('repeatpassword');
    repeatpassword.value = '';
}

// Yêu cầu: Hàm xét lại giá trị của các ô input signup
var resetFormLogin = () => {
    let username2 = document.getElementById('username2');
    username2.value = '';
    let password2 = document.getElementById('password2');
    password2.value = '';
}

//Hàm login
function login() {
    const username = document.getElementById("username2").value;
    const password = document.getElementById("password2").value;
    let userArray = JSON.parse(localStorage.getItem("user-list") || "[]");
    let userLogged = (userArray || []).find((userTemp) => {
        return (userTemp.username == username) && (userTemp.password == password)
    });
    if (userLogged) {
        loggedinArray.push(userLogged);
        localStorage.setItem('loggedin', JSON.stringify(loggedinArray));
        //check role để chuyển trang
        window.location = "shop.html";
        // if (userLogged.type == "admin") {
        //     window.location = "index.html";
        // }
        // } else {
        //     window.location = "about.html";
        // }
        // closeLoginModal();
    }
    else {
        alert("Login Unsuccessfully");
    }
}

//Gọi hàm kiểm tra login
function checkFormLogin() {
    if (checkLogin()) {
        login();
    }
}


//Hiển thị username
function displayUserName() {
    if (loggedinArray.length != 0) {
        document.getElementById('display-user-name').innerHTML = loggedinArray[0].username;
    }
}

//logout
function logout() {
    localStorage.setItem('loggedin', JSON.stringify([]));
    window.location = "index.html";
    alert('Log out success')
}

//show nav user
function showUser() {
    if (loggedinArray.length != 0) {
        if (loggedinArray[0].type === "admin") {
            let s = '<a class="text_color_admin" href="./admin.html">Admin<i class="ti-layers"></i></a>';
            document.getElementById('sub-location-admin').innerHTML = s;
        }
        //cửa sổ sub navv user mở ra
        let navUser = document.getElementById('sub-nav-user');
        if (navUser.style.display == "block") {
            navUser.style.display = "none";
        } else {
            navUser.style.display = "block"
        }

    } else {
        showModelLogIn();
    }
}
