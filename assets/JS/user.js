// Yêu cầu: Xây dựng hàm khởi tạo nhanh một đối tượng user
// Input: full_name, adress, number_phone, username, password, user_type, user_id
// Output: user object
var keyUserList = 'user-list';
var createUser = (_full_name, _adress, _number_phone, _username, _password, _user_type, _user_id) => {
    var user = new Object();

    user.name = _full_name;
    user.adress = _adress;
    user.phone = _number_phone;
    user.username = _username;
    user.password = _password;
    user.type = _user_type;

    if (_user_id != null) {
        user.id = _user_id;
    } else {
        user.id = createId("U");
    }

    user.toJson = function () {
        return JSON.stringify(this);
    }

    return user;
}

// Yêu cầu: đưa một mảng user xuống localStorage
var saveUserListToLocalStorage = (_userList) => {
    let _userListJson = JSON.stringify(_userList);
    localStorage.setItem(keyUserList, _userListJson);
}

// Yêu cầu: lấy một mảng user lên từ localStorage và mảng phải là mảng chứa các đối tượng đầy đủ method.
var getUserListFromLocalStorage = () => {
    let _userList = JSON.parse(localStorage.getItem(keyUserList));
    let _userListFull = [];
    for (let _user of _userList) {
        _userListFull.push(createUser(_user.name, _user.adress, _user.phone, _user.username, _user.password, _user.type, _user.id));
    }
    return _userListFull;
}

// Yêu cầu: Lấy danh sách user theo keyword
var getSearchUserList = (keyword) => {
    // 1. Lấy danh sách user lên từ local
    let userList = getUserListFromLocalStorage();
    // 2. Tạo danh sách user kết quả tìm kiếm
    let userListResult = [];
    // 3. Duyệt danh sách user lấy lên từ local, chọn ra những user thỏa keyword truyền vào: name, username, phone
    for(let i = 0; i < userList.length; i++) {
        let user = userList[i];
        if(user.name.toLowerCase().indexOf(keyword.toLowerCase()) != -1
            || user.username.toLowerCase().indexOf(keyword.toLowerCase()) != -1
            || user.phone.indexOf(keyword) != -1) {
                userListResult.push(user);
        }
    }
    // 4. Return về danh sách user kết quả tìm kiếm
    return userListResult;
}

// Yêu cầu: lấy một đối tượng user từ mảng khi truyền vào userId
// Input: user_id
// Output: user
var getUser = (_user_id) => {
    let userFind = null;
    let userList = getUserListFromLocalStorage();
    for (let i = 0; i < userList.length; i++) {
        if (userList[i].id == _user_id) {
            userFind = userList[i];
            break;
        }
    }
    return userFind;
}

// Yêu cầu: xây dựng html string của một item user
var userAdminHtml = (user) => {
    let html = '';
    html += `
    <tr class="users__tr users__tr--animation">
    <td class="users__td">${user.id}</td>
    <td class="users__td">${user.name}</td>
    <td class="users__td">${user.username}</td>
    <td class="users__td">${user.adress}</td>
    <td class="users__td">${user.phone}</td>
    </tr>`;
    return html;
}

// Yêu cầu: xây dựng html string của một list item user
var userAdminHtmlList = (userList) => {
    let html = '';
    for(let i = 0; i < userList.length; i++) {
        let user = userList[i];
        html += userAdminHtml(user);
    }
    return html;
}

// Yêu cầu: Hiển thị danh sách user ra giao diện admin, đồng thời phân trang sao cho mỗi trang chỉ chứa tối đa 10 user
var showUserList = (currentPage) => {
    // 1. Load danh sách user đầy đủ từ localStorage
    let userList = getUserListFromLocalStorage(keyUserList);
    // 2. Đặt một số biến cơ bản: số user trong một trang, số trang
    let perPage = 10;
    // Ham math.ceil se tra ve so nguyen gan nhat va lon hon so cung cap
    let totalPage = Math.ceil(userList.length/perPage);
    // 3. Xây dựng html string của phần phân trang và render nó ra ui
    let htmlPages = '';
    for(let i = 0; i < totalPage;) {
        htmlPages +=`<li class="users__page" onclick="showUserList(${++i})">${i}</li>`;
    }
    let pagesUi = document.querySelector('.users__pages');
    pagesUi.innerHTML = htmlPages;
    // 4. Xét css cho currentPage
    setUserPageCss(currentPage);
    // 5. Xây dựng mảng phân trang
    let pages = new Array();
    pages[0] = 0;
    pages[totalPage] = userList.length;
    for(let i = 1; i < totalPage; i++) {
        pages[i] = i*perPage;
    }
    // 6. Duyệt mảng và dựng user html string phù hợp
    let userHtmlList = '';
    for(let i = pages[currentPage-1]; i < pages[currentPage]; i++) {
        userHtmlList += userAdminHtml(userList[i]);
    }
    // 7. Add user html string vào node chứa danh sách item user
    let userListContainer = document.querySelector('.users__tbody');
    userListContainer.innerHTML = userHtmlList;
}

// Yêu cầu: Xét css cho currentPage
var setUserPageCss = (currentPage) => {
    let userPages = document.querySelectorAll('li.users__page');
    for(let i = 0; i < userPages.length; i++) {
        let userPage = userPages[i];
        if(userPage.innerText == currentPage) {
            userPage.classList.add('users__page--active');
        } else if(userPage.classList.contains('users__page--active')) {
            userPage.classList.remove('users__page--active');
        } else {};
    }
}

// Yêu cầu: Hiển thị danh sách user theo keywords nhập vào, có phân trang
var showSearchUserList = (currentPage) => {
    // 1. Lấy danh sách user theo keyword
    let keyword = document.querySelector('.users .admin__tBSearch').value;
    let userSearchList = getSearchUserList(keyword);
    console.log(userSearchList);
    // 2. Đặt các biến cơ bản: perPage, totalPage
    let perPage = 10;
    let totalPage = Math.ceil(userSearchList.length/perPage);
    console.log(totalPage);
    // 3. Tạo ui phân trang từ totalPage
    let htmlPages = '';
    for(let i = 1; i <= totalPage; i++) {
        htmlPages += `<li class="users__page" onclick="showSearchUserList(${i})">${i}</li>`;
    }
    let nodePages = document.querySelector('.users__pages');
    nodePages.innerHTML = htmlPages;
    // 4. Css active cho ui trang hiện tại
    setUserPageCss(currentPage);
    // 5. Tạo mảng phân trang
    let pages = [];
    pages[0] = 0;
    pages[totalPage] = userSearchList.length;
    for(let i = 1; i < totalPage; i++) {
        pages[i] = i*perPage;
    }
    // 6. Duyệt mảng vào tạo html string user phù hợp
    var htmlUserSearchList = '';
    for(let i = pages[currentPage - 1]; i < pages[currentPage]; i++) {
        htmlUserSearchList += userAdminHtml(userSearchList[i]);
    }
    // 7. Truy cập tới node chứa danh sách user và innerHTML
    let nodeUsersContainer = document.querySelector('.users__tbody');
    nodeUsersContainer.innerHTML = htmlUserSearchList;
}

// // Yêu cầu: Khi nhấn vào icon trash thì hiển thị popup hỏi có muốn xóa sản phẩm hay không
// var confirmDeleteDialogUser = (userId) => {
//     let popup = document.querySelector(`.popup-delete-post[popupId='${userId}']`);
//     if(popup.classList.contains('open')) {
//         popup.classList.remove('open');
//     } else {
//         popup.classList.add('open');
//     }
// }

// // Yêu cầu: Khi nhấn vào buuton no thì đóng popup
// var closeConfirmDeleteDialogUser = (userId) => {
//     let popup = document.querySelector(`.popup-delete-post[popupId='${userId}']`);
//     popup.classList.remove('open');
// }

// // Yêu cầu xóa user trong local từ user id truyền vào
// var deleteUser = (userId) => {
//     // 1. Lấy danh sách sản phẩm lên từ local
//     let userList = getUserListFromLocalStorage();
//     // 2. Duyệt danh sách tìm vị trí của user có id trùng với userId truyền vào
//     let index = -1;
//     for(let i = 0; i < userList.length; i++) {
//         let user = userList[i];
//         if(user.id == userId) {
//             index = i;
//             break;
//         }
//     }
//     // 3. Dùng hàm splice để xóa user
//     userList.splice(index, 1);
//     console.log(userList);
//     // 4. Lưu lại danh sách user xuống local
//     saveUserListToLocalStorage(userList);

//     // 5. Load lại danh sách user ra ui
//     showUserList(1);

//     // 6. Hiển thị toast thông báo xóa thành công user
//     showSuccesToastDelete("This User Was Deleted From Database");
// }
