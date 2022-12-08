
var loggedin = JSON.parse(localStorage.getItem("loggedin"));
Alert_not_logged();

var userId = loggedin[0].id;
var userName = loggedin[0].username;
var listUser = JSON.parse(localStorage.getItem("user-list"));

function Alert_not_logged(){
    if(loggedin.length == 0){
        document.getElementById("alert-not-logged").style.display = "block";
    }
    else
    document.getElementById("alert-not-logged").style.display = "none";
}
//hàm lọc những cart thuộc về id đang đăng nhập


var listcartofID = JSON.parse(localStorage.getItem('cart-list')) || [];
var listcartofID2 = [];
function listCartOfID(){
    var index = 0;
    for(var i = 0; i < listcartofID.length ; i++){
        if(listcartofID[i].userID == userId){
            listcartofID2[index] = listcartofID[i];
            index++;
        }
    }
    return listcartofID2;
}


//hàm lọc những cart thuộc về id đang đăng nhập

/*Hàm thêm sản phẩm vào giỏ hàng*/
function addCartItems(object) {
    var loggedin3 = JSON.parse(localStorage.getItem("loggedin"));
    var userId3 = loggedin3[0].id;
    //
    let CartItems = JSON.parse(localStorage.getItem('cart-list')) || [];
    //kiểm tra xem đã có id trong giỏ hàng hay chưa, có thì trả về true
    let flag = false;
    var CartIndex = -1;
    console.log(object.id);
    for (var i = 0; i < CartItems.length; i++) {
        if (object.id == CartItems[i].id && CartItems[i].userID == userId3) {
            CartIndex = i;
            flag = true;
            break;
        }
        else { flag = false }
    }
    const products = JSON.parse(localStorage.getItem("product-list"));
    //nếu đã có id thì tăng số lượng
    if (flag == true) {
        CartItems[CartIndex] = {
            id: CartItems[CartIndex].id,
            userID: CartItems[CartIndex].userID,
            img: CartItems[CartIndex].img,
            name: CartItems[CartIndex].name,
            price: CartItems[CartIndex].price,
            quantity: CartItems[CartIndex].quantity + parseInt(document.getElementById("numberCol").value)
        }
        localStorage.setItem('cart-list', JSON.stringify(CartItems));
    }
    // nếu chưa có id thì thêm mới
    else {

        let product = products.find((product) => product.id == object.id);
        let cartItems = JSON.parse(localStorage.getItem('cart-list')) || [];
        let cart1 = {
            id: product.id,
            userID: userId1,
            img: product.img,
            name: product.name,
            price: product.price,
            quantity: parseInt(document.getElementById("numberCol").value)
        };
        cartItems.push(cart1);
        localStorage.setItem('cart-list', JSON.stringify(cartItems));
    }

    /**cập nhật số lượng */
    var index;
    for (var i = 0; i < products.length; i++) {
        if (object.id == products[i].id)
            index = i;
    }
    console.log(index);
    var OderQuantity = parseInt(document.getElementById("numberCol").value);
    var NewQuantity = parseInt(products[index].quantity) - OderQuantity;
    if (NewQuantity < 0) {
        NewQuantity = 0;
    }
    products[index] = {
        id: products[index].id,
        name: products[index].name,
        img: products[index].img,
        quantity: NewQuantity,
        price: products[index].price,
        description: products[index].description,
        brandId: products[index].brandId
    }
    localStorage.setItem('product-list', JSON.stringify(products));
    console.log("toi day roi");
    //xuất hiện modal box add to cart successfully
    const objectSucceed = document.getElementById("add-to-cart-success");
    objectSucceed.style.display = "block";
    setTimeout(function () {
        objectSucceed.style.display = "none";
        window.location = "shop.html";
    }, 800);




}


var createCart = (_id, _userID, _img, _name, _price, _quantity) => {
    var newCart = new Object();

    if (_id != null) {
        newCart.id = _id;
    } else {
        newCart.id = createId("W");
    }
    newCart.id = _id;
    newCart.userID = _userID;
    newCart.img = _img;
    newCart.name = _name;
    newCart.price = _price;
    newCart.quantity = _quantity;

    newCart.toJson = function () {
        return JSON.stringify(this);
    }

    return newCart;
}
var getCartListFromLocalStorage = () => {
    let _cartArr = JSON.parse(localStorage.getItem('cart-list'));
    let _cartArrFull = new Array();
    for (let cart of _cartArr) {
        _cartArrFull.push(createCart(cart.id, cart.userID, cart.img, cart.name, cart.price, cart.quantity));
    }
    return _cartArrFull;
}

var ListCart = document.querySelector('.cart-container');
//var listcart = getCartListFromLocalStorage();
var listcart = listCartOfID();
var totalOrder = 0;
function addtoCart() {
    html = '';
    for (let i = 0; i < listcart.length; i++) {
        html += '<table id="your-cart">';
        html += '<tbody>';
        html += '<tr style="position: relative;">';
        html += '<td class="cart_info_item">';
        html += '<div class="cart_info_container" style="display: flex; align-items: center;">';
        html += '<img class="cart__img_item" src="' + listcart[i].img + '" alt="">';
        html += '<div class="cart__namesize__item">' + listcart[i].name + '</div>';
        html += '</div>';
        html += '</td>';
        html += '<td class="align-center" style="width: 15%;">' + listcart[i].price + '</td>';
        html += ' <td class="align-center" style="width: 10%;">' + listcart[i].quantity + '</td>';
        var total = listcart[i].price * listcart[i].quantity;
        html += '<td class="align-center" style="width: 15%;">' + total + ' VND</td>';
        html += '<td class="align-center" style="width: 8%;">';
        html += ' <div class="btn-delete" id="' + listcart[i].id + '" onclick="removeOneCartItem(this)">';
        html += '<i class="ti-trash delete__item click"></i>';
        html += '</div>';
        html += '</td></tr></tbody> </table>';
        totalOrder += total;
    }
    html += '<div id="total-order" class="total__order">Total: ' + totalOrder + ' VND</div>';
    ListCart.innerHTML = html;
}

///
function formattedDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : "0" + month;

    let day = date.getDate().toString();
    day = month.length > 1 ? day : "0" + day;
    return day + "/" + month + "/" + year;
}


addtoCart();


function removeOneCartItem(object) {
    var loggedin4 = JSON.parse(localStorage.getItem("loggedin"));
    var userId4 = loggedin4[0].id;
    let cartItems = JSON.parse(localStorage.getItem('cart-list'));
    for (i = 0; i < cartItems.length; i++) {
        if (
            cartItems[i].id == object.id &&
            cartItems[i].userID == userId4
        )
            cartItems.splice(i, 1);
    }
    localStorage.setItem('cart-list', JSON.stringify(cartItems));
    window.location = "cart.html";
}
//hàm xóa tất cả item trong giỏ hàng
function removeAllItems() {
    var loggedin5 = JSON.parse(localStorage.getItem("loggedin"));
    var userId5 = loggedin5[0].id;
    let cartItems = JSON.parse(localStorage.getItem("cart-list"));
    cartItems = cartItems.filter((temp) => {
        return temp.userID != userId5;
    });
    localStorage.setItem("cart-list", JSON.stringify(cartItems));
    window.location = "cart.html";
}


/**--------------------------------------------------------------------- */

/**Phần hiển thị xuống order place*/

// var listorder = JSON.parse(localStorage.getItem("order-list"));
// var ListOrdered = document.querySelector('.ordered-container');

// function addtoOrdered() {
//     var arrName = '';
//     var totalProduct = 0;
//     for (let i = 0; i < listcart.length; i++) {
//         arrName += listcart[i].name + " x " + listcart[i].quantity + " || ";
//         totalProduct += listcart[i].quantity;
//     }
//     const date = new Date();
//     html = '';
//     for (let i = 0; i < listorder.length; i++) {
//         html += '<table id="ordered-products">';
//         html += '<tbody>';
//         html += '<tr>';
//         html += '<td style="width: 50%">' + arrName + 'Total quantity: ' + totalProduct + ' products.' + '</td>';
//         //var total = listcart[i].price * listcart[i].quantity;
//         html += '<td style="width: 20%">' + totalOrder + '&nbsp; VND</td>';
//         html += '<td style="width: 20%">' + formattedDate(date) + '</td>';
//         html += ' <td>In Process</td>';
//         html += ' </tr></tbody></table>';
//         break;
//     }
//     ListOrdered.innerHTML = html;
// }

// /// hàm thêm order xuống local storage
// function order() {

//     if (totalOrder != 0) {
//         addtoOrdered();
//         console.log(totalOrder);
//         const date = new Date();
//         let orderDetails = {
//             id: "O9813_1665881444812",
//             userId: "U9697_1665879975643",
//             date: formattedDate(date),
//             phone: "0327794828",
//             address: "770 CTM8, P5, Q.TB, HCM",
//             total: totalOrder,
//             status: true
//         };
//         let orderArray = JSON.parse(localStorage.getItem("order-list"));
//         orderArray.push(orderDetails);
//         localStorage.setItem("order-list", JSON.stringify(orderArray));
//         removeAllItems();
//     } else {
//     }
// }

//Yêu cầu khi nhấn vào nút order thì gọi hàm này để tạo một order và detailOrderList, sau đó thêm vào local Storage
var order = () => {
    if(document.getElementById('total-order').innerText.split(' ')[1] != '0') {
        let currentUser = getUser(JSON.parse(localStorage.getItem('loggedin'))[0].id);
        //1. Tạo một order
        let date = new Date();
        let _userId = currentUser.id;
        let _orderDate = (date.getDate().toString().length == 1) ? date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + '0' + date.getDate() : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        let _phone = currentUser.phone;
        let _adress = currentUser.adress;
        let _total = document.getElementById('total-order').innerText.split(' ')[1];
        let _status = false;
        
        let order = createOrder(_userId, _orderDate, _phone, _adress, _total, _status);
        //2. Load danh sách order lên từ local
        let orderList = getOrderListFromLocalStorage();
    
        //3. Push order vào danh sách
        orderList.push(order);
    
        //4. Lưu danh sách xuống local
        saveOrderListToLocalStorage(orderList);
    
        //Từ id của order vừa thêm, tiến hành:
        //1. Load danh sách detail cart lên từ local
        let detailCartList = getCartListFromLocalStorage();
        //2. Lấy danh sách detailOrder lên từ local
        let detailOrderList = getDetailOrderListFromLocalStorage();
        //3. Duyệt detailCartList, tại mỗi index ta tạo một detailOrder và add vào detailOrderList
        for(let i = 0; i < detailCartList.length; i++) {
            if(detailCartList[i].userID == _userId) {
                detailOrderList.push(createDetailOrder(order.id, detailCartList[i].id, detailCartList[i].quantity));
                detailCartList.splice(i--, 1);
            }
        }
        //4. Thêm các detailOrder vào danh sách vừa lấy và đẩy nó xuống local
        saveDetailOrderListToLocalStorage(detailOrderList);
        //5. Cập nhật lại detailCart list rỗng xuống local

        localStorage.setItem('cart-list', JSON.stringify(detailCartList));

        window.location = 'cart.html';

        //Hiển thị toast thêm đơn hàng thành công
        alert("Đơn hàng của bạn đã được khởi tạo và gửi về cho cửa hàng!");
    }
}

//Yêu cầu: khi body của cart được load thì hiển thị danh sách order của user đó ra ui cart
var loadOrderListToCartUi = () => {
    //Hiển thị đơn hàng ra ui
    //1. Lấy danh sách order của khách hàng đang đăng nhập lên từ local
    let orderList = getOrderListFromLocalStorage();

    let currentUser = getUser(JSON.parse(localStorage.getItem('loggedin'))[0].id);
    let _userId = currentUser.id;

    //3. Tạo htmlString của một list orderItem
    let html = '';
    for(let i = 0; i < orderList.length; i++) {
        if(orderList[i].userId == _userId && orderList[i].status == false) {
            let stringDetailAndQuantity = '';
            let detailOrders = getDetailOrderList(orderList[i].id);
            for(let j = 0; j < detailOrders.length; j++) {
                stringDetailAndQuantity += `${getProduct(detailOrders[j].productId).name}:${detailOrders[j].quantity}`;
                if(j < detailOrders.length - 1) {
                    stringDetailAndQuantity += '&&';
                }
            }
            html += `<tr class="cart-order__tr">
            <td class="cart-order__td" style="text-align: left;">${stringDetailAndQuantity}</td>
            <td class="cart-order__td" style="text-align: center;">${formatDateToShowUi(orderList[i].date)}</td>
            <td class="cart-order__td" style="text-align: center;">${orderList[i].total} VND</td>
            </tr>`;
        }
    }

    //4. Truy cập đến node tbody chứa list orderItem
    let nodeOrderListContainer = document.querySelector('.cart-order__tbody');

    //5. innerHTML
    nodeOrderListContainer.innerHTML = html;
}
