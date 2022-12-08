// var btnsignup1 = document.querySelector('.js-btnsignup');
// var btnLogin = document.querySelector('.js-btnLogin');

// btnsignup1.addEventListener('click', function() {
//     // Gọi hàm kiểm tra tính hợp lệ của form, nếu hợp lệ thì cho phép tiếp tục xử lý, nếu không hợp lệ, hiển thị thông báo lỗi cụ thể của từng ô
//     if(checkFormLogUp()) {
//         // Tiếp tục xử lý
//     }
// });

// btnLogin.addEventListener('click', function() {
//     // Gọi hàm kiểm tra tính hợp lệ của form, nếu hợp lệ thì cho phép tiếp tục xử lý, nếu không hợp lệ, hiển thị thông báo lỗi cụ thể của từng ô
//     if(checkFormLogin()) {
//         // Tiếp tục xử lý
//     }
// });

// Hàm kiểm tra tính hợp lệ của form add product
var checkFormLogUp = () => {
    let valid = true;
    // 1. Tất cả node input không được để trống.
    if(!checkNotBlank()) {
        valid = false;
    }

    // 2. Check repeatPass
    if(!checkRepeatPass()) {
        valid = false;
    }

    //kiểm tra user name đã tồn tại chưa
    if(!checkUsername()) {
        valid = false;
    }

    return valid;
}


// Hàm kiểm tra tính hợp lệ của form add product
var checkLogin = () => {
    let valid = true;
    // 1. Tất cả node input không được để trống.
    if(!checkNotBlank2()) {
        valid = false;
    }
    return valid;
}


// const userIcon = document.querySelector('.js-header__menu-item-right-icon')
const modalSignUp = document.querySelector('.js-modal')

const modalLogIn = document.querySelector('.js-modalLogin')

const btnClose = document.querySelector('.js-btncancel-login')
const btnCloseSignup = document.querySelector('.js-btncancel-signup')

// function showModel() {
//     modal.classList.add('open')
// }

function showModelLogIn() {
    modalLogIn.classList.add('open')
}

function showModelLogIn2() {
    modalSignUp.classList.remove('open')
    modalLogIn.classList.add('open')
}


function hideModelLogin() {
    modalLogIn.classList.remove('open')
}

function showModelSignUp() {
    modalLogIn.classList.remove('open')
    modalSignUp.classList.add('open')
}


function hideModelSignUp() {
    modalSignUp.classList.remove('open')
}

btnClose.addEventListener('click', hideModelLogin)

btnCloseSignup.addEventListener('click', hideModelSignUp)


