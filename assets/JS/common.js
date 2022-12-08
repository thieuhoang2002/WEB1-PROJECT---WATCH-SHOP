// Yêu cầu: nhấn vào một item menu thì hiển thị subnav tương ứng của item menu đó.
// 1. Truy cập tới các node item-lv1 của sidebar.
// 2. Truy cập tới các node subnav của sidebar.
// 3. Truy cập tới các node itemLvContainer bên trong itemLv1.
// 4. Lấy chiều cao hiên tại của các item-lv1.
/* 5. Suyệt mảng các node itemLv1 và đăng kí sự kiện onClick cho item-lv1. Nếu chiều cao hiện tại mà bằng với chiều cao đã lấy ở bước 3. 
Thì thêm class 'open' vào classList của subnav để subnav hiển thị và thêm class hiển thị border của item. 
Ngược lại thì loại bỏ class 'open' ra khỏi classList của subnav và remove class hiển thị border của item*/
// 6. Xét animation cho mỗi node subnav: scaleY() từ 0 đến 1, xét tâm của node nằm center phía top.
function sideBarJS() {
    // 1.
    var itemLv1s = document.querySelectorAll('.js-admin-sidebar__item-lv1');

    // 2.
    var subnavs = document.querySelectorAll('.js-admin-sidebar__subnav');

    // 3.
    var itemLv1Containers = document.querySelectorAll('.js-admin-sidebar__item-lv1-container');

    // 4.
    var heightItemsOfSidebar = itemLv1s[0].clientHeight;

    // 5.
    for (let i = 0; i < itemLv1Containers.length; i++) {
        let itemLv1Container = itemLv1Containers[i];
        itemLv1Container.onclick = function () {
            let isClosed = itemLv1s[i].clientHeight === heightItemsOfSidebar;
            let subnav = subnavs[i];

            if (isClosed) {
                itemLv1s[i].classList.add('admin-sidebar__item-lv1--borderright');
                itemLv1Container.classList.add('admin-sidebar__item-lv1-container--active');
                subnav.classList.add('open');
            } else {
                itemLv1s[i].classList.remove('admin-sidebar__item-lv1--borderright');
                itemLv1Container.classList.remove('admin-sidebar__item-lv1-container--active');
                subnav.classList.remove('open');
            }
        }
    }
}

// Yêu cầu: Khi nhấn vào menu item cấp 2 nào thì hiển thị giao diện thao tác tương ứng với menu đó
var sideBarUIProcessJS = () => {
    // 1. Truy cập đến all menu item2 (6)
    let menuItemLv2s = document.querySelectorAll('.admin-sidebar__item-lv2');
    // 2. Truy cập đến all các khối div có class là block content (6)
    let blockContents = document.querySelectorAll('.block-content');
    // 3. Xét event
    for(let i = 0; i < menuItemLv2s.length; i++) {
        let menuItemLv2 = menuItemLv2s[i];
        menuItemLv2.onclick = function () {
            for(let k = 0; k < menuItemLv2s.length; k++) {
                menuItemLv2s[k].classList.remove('admin-sidebar__item-lv2--active');
            }
            this.classList.add('admin-sidebar__item-lv2--active');
            let toast = document.getElementById('toast');
            toast.innerHTML = '';
            for(let j = 0; j < blockContents.length; j++) {
                let blockContent = blockContents[j];
                if(j == i) {
                    adminJS(i + 1);
                    blockContent.classList.add('open');
                } else {
                    blockContent.classList.remove('open');
                }
            }
        }
    }
}

// PHẦN HIỂN THỊ DANH SÁCH SẢN PHẨM ADMIN
// --------------------------------------
// HEADER
function headerProductManageJS() {
    // Yêu cầu: Khi nhấn vào icon search của danh mục sản phẩm, thì hiển thị ô input chi phép search sản phẩm
    // 1. Truy cập tới node icon search
    var nodeProductsSearch = document.querySelector('.products .admin__search-icon');

    // 2. Truy cập tới vùng chứa node input để tìm kiếm
    var nodeProductsInput = document.querySelector('.products .admin__search-container');

    nodeProductsInput.onclick = function (event) {
        event.stopPropagation();
    }

    // 3. Xét sự kiện khi nhấn vào icon search thì hiển thị vùng chứa ô input
    nodeProductsSearch.onclick = function (event) {
        event.stopPropagation();
        this.classList.remove('open');
        nodeProductsInput.classList.add('open');
    }

    // Yêu cầu: Khi nhấn vào vùng bất kì nằm ngoài ô input, nếu ô input vẫn chưa có data thì ẩn ô input, hiện icon.
    // 1. Truy cập tới vùng chứa toàn bộ phần hiển thị danh sách sản phẩm admin
    var nodeProductContainer = document.querySelector('.products');

    // 2. Xét event
    nodeProductContainer.onclick = function () {
        // 2.1. lấy data của node input
        let nodeProductInputSrcData = nodeProductInputSrc.value;

        if (nodeProductInputSrcData == null || nodeProductInputSrcData == '') {
            hideInput();
        }
    }

    function hideInput() {
        nodeProductsInput.classList.remove('open');
        nodeProductsSearch.classList.add('open');
    }

    // Yêu cầu: khi nhập liệu vào node input thì hiển thị mark icon
    // 1. Truy cập tới node input để tìm kiếm
    var nodeProductInputSrc = document.querySelector('.products .admin__tBSearch');

    // 2. Truy cập tới node mark icon
    var markIconOfProducts = document.querySelector('.products .admin__mark-icon');

    // 3. Xét event
    nodeProductInputSrc.addEventListener('input', function () {
        if (this.value == null || this.value == '') {
            markIconOfProducts.classList.remove('open');
            printProductList(1);
        } else {
            markIconOfProducts.classList.add('open');

            // Hiển thị danh sách sản phẩm theo keyword
            searchProducts(1);
        }
    });

    // Yêu cầu: Khi nhấn vào mark icon thì gọi hàm ẩn ô input và hiện search icon
    markIconOfProducts.onclick = function () {
        this.classList.remove('open');
        nodeProductInputSrc.value = '';
        hideInput();
        printProductList(1);
    }
}

// PHẦN HIỂN THỊ DANH SÁCH USERS
// HEADER
var headerUserManageJS = () => {
    // Yêu cầu 1: Khi nhấn vào search icon thì hiển thị vùng input để nhập liệu.
    // Yêu cầu 2: Khi nhấn vào vùng bất kì nằm ngoài ô input, nằm trong vùng users thì đóng input, hiển thị search-icon.
    // Yêu cầu 3: Khi nhập liệu vào ô input thì hiển thị mark-icon và load danh sách users theo keywords
    // Yêu cầu 4: Khi nhấn vào mark icon thì đóng ô input và hiển thị search icon
    // Common
    // 1. Truy cập tới node search-icon
    let nodeUserSearch = document.querySelector('.users .admin__search-icon');
    // 2. Truy cập tới node vùng input
    let nodeUserInput = document.querySelector('.users .admin__search-container');
    // 3. Truy cập tới node users
    let nodeUsers = document.querySelector('.users');
    // 4. Truy cập tới ô input nhập liệu
    let nodeUserInputSrc = document.querySelector('.users .admin__tBSearch');
    // 5. Truy cập tới node mark-icon
    let nodeMarkIcon = document.querySelector('.users .admin__mark-icon');
    // 5. Xây dựng hàm hiển thị và ẩn
    // 5.1 Hiển thị vùng input, ẩn search-icon
    let showInput = () => {
        nodeUserSearch.classList.remove('open');
        nodeUserInput.classList.add('open');
    }

    // 5.2 Hiển thị search icon, ẩn vùng input
    let hideInput = () => {
        nodeUserInput.classList.remove('open');
        nodeUserSearch.classList.add('open');
    }

    // 5.3 Hiển thị mark-icon
    let showMarkIcon = () => {
        nodeMarkIcon.classList.add('open');
    }
    // 5.4 Ẩn mark-icon
    let hideMarkIcon = () => {
        nodeMarkIcon.classList.remove('open');
    }



    // Yêu cầu 1
    nodeUserSearch.addEventListener('click', showInput);

    // Yêu cầu 2
    // 1. Đăng kí sự kiện cho node users
    nodeUsers.onclick = function () {
        if(nodeUserInputSrc.value == null || nodeUserInputSrc.value == '') {
            hideInput();
        }
    }
    // 2. Ngăn ngừa sự kiện nổi bọt cho search-icon và vùng input
    nodeUserSearch.addEventListener('click', function(event) {
        event.stopPropagation();
    });
    nodeUserInput.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    // Yêu cầu 3
    nodeUserInputSrc.addEventListener('input', function() {
        if(this.value == null || this.value == '') {
            hideMarkIcon();
            showUserList(1);
        } else {
            showMarkIcon();
            showSearchUserList(1);
        }
    });

    // Yêu cầu 4
    nodeMarkIcon.onclick = function() {
        hideMarkIcon();
        nodeUserInputSrc.value = '';
        hideInput();
        showUserList(1);
    }

}

// -------------------------------------
// -------------------------------------
// -------------------------------------

// Yêu cầu: Xét js for brand-statistic ui
function brandStatisticJS () {
    eventForBrandStatisticInput();
    showBrandListStatistic();
}

// Yêu cầu: Xét js for product-statistic ui
function productStatisticJS () {
    eventForProductStatisticInput();
    showProductStatisticToUI();
}

// Yêu cầu: Xét js for product manager ui
function productManagerJS () {
    // 1. JS cho phan product header
    headerProductManageJS();
    // 4. showProductListHTML();
    printProductList(1);
}

// Yêu cầu: Xét js for add productui
function addProductJS () {
    // Khi input file cua form add product change thi xet lai src cho img
    changeImgWhenInputFileChangeAtForm ('input-file-img-product', 'admin-container-body-add-product__img');
}

// Yêu cầu: Xét js for order manager ui
function orderManagerJS () {
    eventForOrderInput();
    showOrderListFromDate(1);
}

// Yêu cầu: Xét js for customer manager ui
function userManagerJS () {
    headerUserManageJS();
    showUserList(1);
}

// Yêu cầu: Truyền vào số từ 1 đến 6, xét js cho các ui tương ứng
function adminJS (num) {
    switch (num) {
        case 1:
            brandStatisticJS();
            break;
        case 2:
            productStatisticJS();
            break;
        case 3:
            productManagerJS();
            break;
        case 4:
            addProductJS();
            break;
        case 5:
            orderManagerJS();
            break;
        case 6:
            userManagerJS();
            break;
    }
}

//Yêu cầu: Khi nhấn vào nút BackHome thì quay về trang home.html
//Đồng thời vẫn giữ được phiên đăng nhập
var backHome = () => {
    window.location = 'index.html';
}

//Yêu cầu: Khi nhấn vào nút logOut ở Admin Page thì quay về trang index.html, đồng thời thoát khỏi các phiên đăng nhập
var logOutAdmin = () => {
    window.location = 'index.html';
    localStorage.setItem('loggedin', JSON.stringify([]));
    let userInfo = document.querySelector('.display-user-name');
    userInfo.innerText = '';
}





