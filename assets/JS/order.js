// Bien chung
var keyOrderList = 'order-list';
var dateOrderInput1 = document.getElementById('orders__input-date1');
var dateOrderInput2 = document.getElementById('orders__input-date2');
// Yêu cầu: hàm khởi tạo một đơn hàng
// Input: user-id, date, status, phone, adress, total, order-id
// Output: new order object
var createOrder = (_user_id, _date, _phone, _adress, _total, _status, _order_id) => {
    var newOrder = new Object();

    if (_order_id != null) {
        newOrder.id = _order_id;
    } else {
        newOrder.id = createId('O');
    }
    newOrder.userId = _user_id;
    newOrder.date = _date;
    newOrder.phone = _phone;
    newOrder.adress = _adress;
    newOrder.total = _total;
    newOrder.status = _status;

    newOrder.toJson = function () {
        return JSON.stringify(this);
    }

    return newOrder;
}

// Yêu cầu: đưa một mảng order xuống localStorage
var saveOrderListToLocalStorage = (_orderArr) => {
    let _orderArrJson = JSON.stringify(_orderArr);
    localStorage.setItem(keyOrderList, _orderArrJson);
}

// Yêu cầu: lấy một mảng order lên từ localStorage và mảng phải là mảng chứa các đối tượng đầy đủ method.
var getOrderListFromLocalStorage = () => {
    let _orderList = JSON.parse(localStorage.getItem(keyOrderList));
    let _orderListFull = [];
    for (let _order of _orderList) {
        _orderListFull.push(createOrder(_order.userId, _order.date, _order.phone, _order.adress, _order.total, _order.status, _order.id));
    }
    return _orderListFull;
}

// Yêu cầu: lấy một order trong local từ order id truyền vào
var getOrder = (orderId) => {
    let orderList = getOrderListFromLocalStorage();
    let orderFind = null;
    for(let i = 0; i < orderList.length; i++) {
        let order = orderList[i];
        if(order.id == orderId) {
            orderFind = order;
        }
    }
    return orderFind;
}

// Yêu cầu: Dựng html string của một item order
var orderAdminHtml = (order) => {
    var html = `
    <tr class="orders__tr orders__tr--animation">
    <td class="orders__td">${order.id}</td>
    <td class="orders__td">${formatDateToShowUi(order.date)}</td>
    <td class="orders__td">${getUser(order.userId).name}</td>
    <td class="orders__td">${order.phone}</td>
    <td class="orders__td">${order.adress}</td>
    <td class="orders__td">
    <div class="orders__status-container">
        <input class="orders__status-check" type="checkbox" onclick="updateStatusOrder(\'${order.id}\')" ${getCheck(order.status)}>
        <span class="orders__status" statusId="${order.id}">${getStatusText(order.status)}</span>
    </div>
    </td>
    <td class="orders__td">
        <i class="orders__eyes-icon orders__td-icon ti-eye" onclick="showOrderInfo(\'${order.id}\')"></i>
    </td>
    </tr>`;
    return html;
}

// Yêu cầu: Truyền vào status trả về trạng thái check or not check
var getCheck = (status) => {
    if(status == true) {
        return 'checked'
    }
    return '';
}

// Yêu cầu: Truyền vào status trả về text Processing or Delivered
var getStatusText = (status) => {
    if(status == true) {
        return 'Delivered';
    }
    return 'Processing';
}

// Yêu cầu: Khi nhấn vào icon thùng rác của order nào thì hiển thị popup xác nhận xóa order tương ứng với order đó
var confirmDeleteDialogOrder = (orderId) => {
    let popup = document.querySelector(`.popup-delete-post[popupId="${orderId}"]`);
    if(popup.classList.contains('open')) {
        popup.classList.remove('open');
    } else {
        popup.classList.add('open');
    }
}

// Yêu cầu: Khi nhấn vào button no thì đóng dialog lại
var closeConfirmDeleteDialogOrder = (orderId) => {
    let popup = document.querySelector(`.popup-delete-post[popupId="${orderId}"]`);
    popup.classList.remove('open');
}

// Yêu cầu: Khi nhấn vào button yes, thì xóa order có id trùng với id truyền vào trong local, đồng thời hiển thị thông báo xóa thành công.
var deleteOrder = (orderId) => {
    // 1. Load danh sách order lên từ local
    let orderList = getOrderListFromLocalStorage();
    // 2. Duyệt danh sách và xóa order
    let index = -1;
    for(let i = 0; i < orderList.length; i++) {
        let order = orderList[i];
        if(order.id == orderId) {
            index = i;
            break;
        }
    }
    orderList.splice(index, 1);
    // 3. Lưu lại danh sách xuống local
    saveOrderListToLocalStorage(orderList);
    // 4. Load lại danh sách order ra ui
    showOrderListFromDate(1);
    // 5. Hiển thị thông báo xóa thành công
    showSuccesToastDelete("This Order Was Deleted From Database");
}

/* Yêu cầu: Khi nhấn vào ô checkbox ở cột status, nếu span.orders__status có innerText là Processing thì xét lại innerText là Delivered
đồng thời update lại trạng thái của order tương ứng về true và trường hợp ngược lại */
var updateStatusOrder = (orderId) => {
    // 1. Truy cập tới node span.orders__status có statusId bằng với orderId truyền vào
    let orderStatus = document.querySelector(`span.orders__status[statusId="${orderId}"]`);
    // 2. Load danh sách order lên từ local
    let orderList = getOrderListFromLocalStorage();
    // 3. Xét hai điều kiện
    if(orderStatus.innerText == "Processing") {
        // 3.1. Duyệt danh sách và xét lại trạng thái của order về true
        for(let i = 0; i < orderList.length; i++) {
            let order = orderList[i];
            if(order.id == orderId) {
                order.status = true;
            }
        }
        // 3.2. Xét lại text của orderStatus là Delivered
        orderStatus.innerText = "Delivered";
    } else {
        // 3.1. Duyệt danh sách và xét lại trạng thái của order về false
        for(let i = 0; i < orderList.length; i++) {
            let order = orderList[i];
            if(order.id == orderId) {
                order.status = false;
            }
        }
        // 3.2. Xét lại text của orderStatus là Processing
        orderStatus.innerText = "Processing";
    }
    // 4. Lưu lại danh sách order xuống local
    saveOrderListToLocalStorage(orderList);
}

// Yêu cầu: lọc mảng order từ dateFrom và dateTo
var getOrderListFromDate = () => {
    // 1. Lấy dữ liệu từ hai node input chọn ngày tháng năm của phần orders
    let date1String = dateOrderInput1.value;
    let date2String = dateOrderInput2.value;
    // 2. Ép dữ liệu sang kiểu new Date()
    let date1 = new Date(`${date1String}`);
    let date2 = new Date(`${date2String}`);
    // 3. Load danh sách order lên từ local
    let orderList = getOrderListFromLocalStorage();
    // 4. Duyệt danh sách order, mỗi lần duyệt thì ép ngày của order đang xét sang kiểu new Date() và so sánh xem ngày có nằm trong khoảng ngày truyền vào không, nếu có thì thêm vào mảng mới
    let orderListResult = [];
    for (let i = 0; i < orderList.length; i++) {
        let order = orderList[i];
        let date = new Date(order.date);
        if (date >= date1 && date <= date2) {
            orderListResult.push(order);
        }
    }
    // 5. Return mảng order kết quả
    return orderListResult;
}

// Yêu cầu: Hiển thị danh sách order từ ngày đến ngày ra ui, có phân trang, sao cho mỗi trang chỉ hiển thị tối đa 10 order
var showOrderListFromDate = (currentPage) => {
    // 1. Lấy được danh sách order từ dateFrom đến dateTo
    let orderListFromDate = getOrderListFromDate();
    // 2. Đặt các biến cơ bản: perPage, totalPage
    let perPage = 10;
    let totalPage = Math.ceil(orderListFromDate.length / perPage);
    // 3. Dựng ui cho phân trang
    let htmlPages = '';
    for (let i = 1; i <= totalPage; i++) {
        htmlPages += `<li class="orders__page" onclick="showOrderListFromDate(\'${i}\')">${i}</li>`;
    }
    let ordersPages = document.querySelector('.orders__pages');
    ordersPages.innerHTML = htmlPages;
    // 4. Thêm css active cho trang hiện tại
    setOrderPageCss(currentPage);
    // 5. Tạo mảng phân trang
    let pages = [];
    pages[0] = 0;
    pages[totalPage] = orderListFromDate.length;
    for(let i = 1; i < totalPage; i++) {
        pages[i] = i*perPage;
    }
    // 6. Duyệt mảng tại các vị trí phù hợp để tạo order list html string
    var orderListHtml = '';
    for(let i = pages[currentPage - 1]; i < pages[currentPage]; i++) {
        orderListHtml += orderAdminHtml(orderListFromDate[i]);
    }
    // 7. Truy cập vào node chứa order list và inner HTML
    let orderTBody = document.querySelector('.orders__tbody');
    orderTBody.innerHTML = orderListHtml;

    // 8. Nếu danh sách rỗng thì hiển thị toast thông báo
    if(orderListFromDate.length == 0) {
        showNotifyStatistic(`There Are No Orders Data From ${formatDateToShowUi(dateOrderInput1.value)} To ${formatDateToShowUi(dateOrderInput2.value)}`);
    }
}

// Yêu cầu: css active cho trang hiện tại
var setOrderPageCss = (currentPage) => {
    let pages = document.querySelectorAll('.orders__page');
    for (let i = 0; i < pages.length; i++) {
        let page = pages[i];
        if (page.innerText == currentPage) {
            page.classList.add('orders__page--active');
        } else if (page.classList.contains('orders__page--active')) {
            page.classList.remove('orders__page--active');
        } else { };
    }
}

// Yêu cầu: Xét value mặc định cho header order input là ngày tháng năm hiện tại khi load trang
var setDateDefaultForOrderInputs = () => {
    let dateNow = getDateNow();
    dateOrderInput1.value = dateNow;
    dateOrderInput2.value = dateNow;
}

// Yêu cầu: Khi input để chọn ngày hiển thị order có sự thay đổi thì load lại danh sách order tương ứng
var eventForOrderInput = () => {
    // Xét sự kiện
    dateOrderInput1.addEventListener('input', function() {
        let date1 = new Date(`${this.value}`);
        let date2 = new Date(dateOrderInput2.value);
        if(date1 > date2) {
            showErrorInvalidDate();
        } else {
            showOrderListFromDate(1);
            if(getOrderListFromDate().length == 0) {
                showNotifyStatistic(`There Are No Orders Data From ${formatDateToShowUi(dateOrderInput1.value)} To ${formatDateToShowUi(dateOrderInput2.value)}`);
            }
        }
    });
    dateOrderInput2.addEventListener('input', function() {
        let date2 = new Date(`${this.value}`);
        let date1 = new Date(dateOrderInput1.value);
        if(date1 > date2) {
            showErrorInvalidDate();
        } else {
            showOrderListFromDate(1);
            if(getOrderListFromDate().length == 0) {
                showNotifyStatistic(`There Are No Orders Data From ${formatDateToShowUi(dateOrderInput1.value)} To ${formatDateToShowUi(dateOrderInput2.value)}`);
            }
        }
    })
}

// Yêu cầu: Khi nhấn vào eye icon thì hiển thị thông tin đơn hàng, gồm cả các chi tiết đơn hàng của đơn hàng đó
var showOrderInfo = (orderId) => {
    // 1. Dựng html string của order info
    let order = getOrder(orderId);
    let detailOrderList = getDetailOrderList(orderId);
    let html =`
    <div class="modal__order" onclick="stopPropagationDefaultOrder(event)">
    <div class="modal__order-header">
        <p class="modal__order-heading"><span>OrderId&nbsp;&nbsp;#</span><span>${order.id}</span></p>
        <p class="modal__order-date"><span>Date:&nbsp;&nbsp;</span><span>${formatDateToShowUi(order.date)}</span></p>
    </div>  
    <div class="modal__order-info">
        <p class="modal__order-info-heading">
            <i class="modal__order-icon ti-user"></i>
            <span>User Information</span>
        </p>
        <p class="modal__order-name"><span class="modal__order-before-heading">Name:&nbsp;&nbsp;</span><span>${getUser(order.userId).name}</span></p>
        <p class="modal__order-phone"><span class="modal__order-before-heading">Phone:&nbsp;&nbsp;</span><span>${order.phone}</span></p>
        <p class="modal__order-address"><span class="modal__order-before-heading">Address:&nbsp;&nbsp;</span><span>${order.adress}</span></p>
    </div>
    <div class="modal__order-details">
        <p class="modal__order-details-heading">
            <i class="modal__order-icon ti-info-alt"></i> 
            <span>Order Details</span>
        </p>
        ${detailAdminHtmlInOrderInfoList(detailOrderList)}
    </div>
    <div class="modal__order-footer">
        <span class="modal__order-before-heading">Total Price:&nbsp;&nbsp;</span>
        <span>${new Intl.NumberFormat('vi', {style: 'currency', currency: 'VND'}).format(order.total)}</span>
    </div>
    <div class="modal__order-mark-icon">
        <i class="fa-solid fa-xmark" onclick="closeOrderModal()"></i>
    </div>
    </div>`;
    // 2. Truy cập tới node chứa modal-order-info
    let modalContainer = document.querySelector('.modal__container');
    // 3. innerHTML string vừa tạo vào node đó
    modalContainer.innerHTML = html;
    // 4. Hiển thị modal
    let modal = document.querySelector('.modal');
    modal.classList.add('open');
}

// Yêu cầu: Khi nhấn vào mark icon thì đóng modal
var closeOrderModal = () => {
    let modal = document.querySelector('.modal');
    modal.classList.remove('open');
}

// Yêu cầu: Ngăn sự kiện nổi bọt của modal
var stopPropagationDefaultOrder = (event) => {
    event.stopPropagation();
}