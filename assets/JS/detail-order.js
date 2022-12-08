var keyDetailOrderList = 'detail-order-list';
// Yêu cầu: hàm khởi tạo một chi tiết đơn hàng
// Input: order_id, product_id, quantity
// Output: new detail order object
var createDetailOrder = (_order_id, _product_id, _quantity) => {
    var detailOrder = new Object();

    detailOrder.orderId = _order_id;
    detailOrder.productId = _product_id;
    detailOrder.quantity = _quantity;

    detailOrder.toJson = function() {
        return JSON.stringify(this);
    }

    detailOrder.calcUnitPrice = function() {
        return getProduct(this.productId).price * this.quantity;
    }

    return detailOrder;
}


// Yêu cầu: đưa một mảng deatil order xuống localStorage
var saveDetailOrderListToLocalStorage = (_detailOrderArr) => {
    let _detailOrderArrJson = JSON.stringify(_detailOrderArr);
    localStorage.setItem(keyDetailOrderList, _detailOrderArrJson);
}


// Yêu cầu: lấy một mảng deatil order lên từ localStorage và mảng phải là mảng chứa các đối tượng đầy đủ method.
var getDetailOrderListFromLocalStorage = () => {
    let _detailOrderArr = JSON.parse(localStorage.getItem(keyDetailOrderList));
    let _detailOrderArrFull = [];
    for(let _detailOrder of _detailOrderArr) {
        _detailOrderArrFull.push(createDetailOrder(_detailOrder.orderId, _detailOrder.productId, _detailOrder.quantity));
    }
    return _detailOrderArrFull;
}

// Yêu cầu: lấy một đối tượng detail order khi truyền vào orderId + productId
var getDetailOrder = (orderId, productId) => {
    let detailOrderList = getDetailOrderListFromLocalStorage();
    let detailOrderFind = null;
    for(let i = 0; i < detailOrderList.length; i++) {
        let detailOrder = detailOrderList[i];
        if(detailOrder.orderId == orderId && detailOrder.productId == productId) {
            detailOrderFind = detailOrder;
            break;
        }
    }
    return detailOrderFind;
}

// Yêu cầu: lấy danh sách detailOrder của một order khi truyền vào order id
var getDetailOrderList = (orderId) => {
    let detailOrderList = getDetailOrderListFromLocalStorage();
    let detailOrderListFind = [];
    for(let i = 0; i < detailOrderList.length; i++) {
        let detailOrder = detailOrderList[i];
        if(detailOrder.orderId == orderId) {
            detailOrderListFind.push(detailOrder);
        }
    }
    return detailOrderListFind;
}

// Yêu cầu dựng html string của một item order detail hiển thị trong order info
var detailAdminHtmlInOrderInfo = (detailOrder) => {
    let product = getProduct(detailOrder.productId);
    let html = `<div class="modal__order-detail">
    <div class="modal__order-detail-img">
    <img src="${product.img}" alt="" class="modal__order-detail-img-src">
    </div>
    <div class="modal__order-detail-info">
    <p class="modal__order-detail-text">${product.name}</p>
    <p class="modal__order-detail-text font14">${detailOrder.quantity} x ${new Intl.NumberFormat('vi', {style: 'currency', currency: 'VND'}).format(product.price)}</p>
    <p class="modal__order-detail-text font14">= ${new Intl.NumberFormat('vi', {style: 'currency', currency: 'VND'}).format(detailOrder.calcUnitPrice())}</p>
    </div>
    </div>`;
    return html;
}

// Yêu cầu dựng html string của một list order details hiển thị trong order info
var detailAdminHtmlInOrderInfoList = (detailOrderList) => {
    let html = '';
    for(let i = 0; i < detailOrderList.length; i++) {
        html += detailAdminHtmlInOrderInfo(detailOrderList[i]);
    }
    return html;
}
