var keyDetailCartList = 'detail-cart-list';
// Yêu cầu: hàm khởi tạo một chi tiết giỏ hàng
// Input: user-id, product-id, quantity
// Output: new detail cart object
var createDetailCart = (_user_id, _product_id, _quantity) => {
    var detailCart = new Object();

    detailCart.userId = _user_id;
    detailCart.productId = _product_id;
    detailCart.quantity = _quantity;

    detailCart.toJson = function (){
        return JSON.stringify(this);
    }

    detailCart.calcUnitPrice = function() {
        return getProduct(this.productId).price * this.quantity;
    }
    return detailCart;
}


// Yêu cầu: đưa một mảng detail cart xuống localStorage
var saveDetailCartListToLocalStorage = (_detailCartList) => {
    let _detailCartListJson = JSON.stringify(_detailCartList);
    localStorage.setItem(keyDetailCartList, _detailCartListJson);
}


// Yêu cầu: lấy một mảng detail cart lên từ localStorage và mảng phải là mảng chứa các đối tượng đầy đủ method.
var getDetailCartListFromLocalStorage = () => {
    let _detailCartList = JSON.parse(localStorage.getItem(keyDetailCartList));
    let _detailCartListFull = [];
    for(let _detailCart of _detailCartList) {
        _detailCartListFull.push(createDetailCart(_detailCart.userId, _detailCart.productId, _detailCart.quantity));
    }
    return _detailCartListFull;
}

// Yêu cầu: khi truyền vào userid và productid thì trả về một đối tượng detail cart item
var getDetailCart = (_user_id, _product_id) => {
    let _detailCartFind = null;
    let _detailCartList = getDetailCartListFromLocalStorage();
    for(let _detailCart of _detailCartList) {
        if(_detailCart.userId == _user_id && _detailCart.productId == _product_id) {
            _detailCartFind = _detailCart;
            break;
        }
    }
    return _detailCartFind;
}
