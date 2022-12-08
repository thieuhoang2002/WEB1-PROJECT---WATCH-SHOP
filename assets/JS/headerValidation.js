var checkNotBlank = () => {
    let valid = true;
    // 1. Truy cập all node có thuộc tính là notBlank 
    let nodeNotBlanks = document.querySelectorAll('[notBlank]');

    // let stringIcon = stringIconOfNoodeShowError();

    for (let i = 0; i < nodeNotBlanks.length; i++) {
        // 2. Truy cập tới node input của từng node và lấy data
        let nodeNotBlank = nodeNotBlanks[i];

        let nodeNotBlankData = nodeNotBlank.value;

        // 3. Truy cập tới label hiển thị lỗi của từng node input (xây dựng một function truyền vào id của node input và trả về label hiển thị lỗi)
        let nodeShowError = getNodeShowError(nodeNotBlank.getAttribute('id'));
        nodeShowError.innerHTML = "";

        // 4. Check data
        if (nodeNotBlankData == "" || nodeNotBlankData == null) {
            // 5. Nếu data không hợp lệ thì xét biến valid là false và hiển thị lỗi ra label hiển thị lỗi (xây dựng một func truyền vào một nodeinput và trả về lỗi của node input đó)
            valid = false;
            nodeShowError.innerHTML = getErrorNotBlank(nodeNotBlank);
        }
    }

    return valid;
}

// Hàm lấy node label hiển thị lỗi khi truyền vào node input id tương ứng
function getNodeShowError(nodeNotBlankId) {
    let nodeShowError = document.querySelector('label[for="' + nodeNotBlankId + '"].error')
    return nodeShowError;
}

// Hàm lấy lỗi khi truyền vào một node inut id
var getErrorNotBlank = (nodeNotBlank) => {
    let error = "This field can not be blank!";
    if (nodeNotBlank.hasAttribute('errNotBlank')) {
        error = nodeNotBlank.getAttribute('errNotBlank');
    }
    return error;
}



// LogIn
var checkNotBlank2 = () => {
    let valid = true;
    // 1. Truy cập all node có thuộc tính là notBlank2 
    let nodeNotBlanks = document.querySelectorAll('[notBlank2]');

    // let stringIcon = stringIconOfNoodeShowError();

    for (let i = 0; i < nodeNotBlanks.length; i++) {
        // 2. Truy cập tới node input của từng node và lấy data
        let nodeNotBlank = nodeNotBlanks[i];

        let nodeNotBlankData = nodeNotBlank.value;

        // 3. Truy cập tới label hiển thị lỗi của từng node input (xây dựng một function truyền vào id của node input và trả về label hiển thị lỗi)
        let nodeShowError = getNodeShowError2(nodeNotBlank.getAttribute('id'));
        nodeShowError.innerHTML = "";

        // 4. Check data
        if (nodeNotBlankData == "" || nodeNotBlankData == null) {
            // 5. Nếu data không hợp lệ thì xét biến valid là false và hiển thị lỗi ra label hiển thị lỗi (xây dựng một func truyền vào một nodeinput và trả về lỗi của node input đó)
            valid = false;
            nodeShowError.innerHTML = getErrorNotBlank2(nodeNotBlank);
        }
    }

    return valid;
}

// Hàm lấy node label hiển thị lỗi khi truyền vào node input id tương ứng
function getNodeShowError2(nodeNotBlankId) {
    let nodeShowError = document.querySelector('label[for="' + nodeNotBlankId + '"].error')
    return nodeShowError;
}

// Hàm lấy lỗi khi truyền vào một node inut id
var getErrorNotBlank2 = (nodeNotBlank) => {
    let error = "This field can not be blank!";
    if (nodeNotBlank.hasAttribute('errNotBlank2')) {
        error = nodeNotBlank.getAttribute('errNotBlank2');
    }
    return error;
}


var checkRepeatPass = () => {
    let valid = true;

    //Truy cập all node có thuộc tính là
    let repeatPassWords = document.querySelectorAll('[repeatpass]');

    for (let repeatPassWord of repeatPassWords) {

        // lấy node hiển thị lỗi của từng node input
        let nodeShowError = repeatPassWord.nextElementSibling;

        if (document.getElementById("password").value != document.getElementById("repeatpassword").value) {

            nodeShowError.innerHTML = repeatPassWord.getAttribute('errRepeatPass');
            document.getElementById("password").focus();

            valid = false;
        }
    }

    return valid;
}

//Hàm lấy lỗi khi truyền vào một node inut id
// var getErrorNotBlank = (nodeNotBlank) => {
//     let error;
//     if (nodeNotBlank.hasAttribute('errRepeatPass')) {
//         error = nodeNotBlank.getAttribute('errRepeatPass');
//     }
//     return error;
// }

//kiểm tra user name có trùng lặp không
var checkUsername = () => {
    let valid = true;

    // 1. Lấy danh sách user lên từ local
    let userList = getUserListFromLocalStorage();

    //Truy cập all node có thuộc tính là
    let checkUserNames = document.querySelectorAll('[checkUserName]');

    for (let checkUserName of checkUserNames) {

        // lấy node hiển thị lỗi của từng node input
        let nodeShowError = checkUserName.nextElementSibling;

        //Duyệt danh sách user lấy lên từ local
        for(let i = 0; i < userList.length; i++) {
            let user = userList[i];
            if (user.username == document.getElementById("username").value) {

                nodeShowError.innerHTML = checkUserName.getAttribute('errUserName');
                document.getElementById("username").focus();
    
                valid = false;
            }
        }
    }

    return valid;
}

