const btnFilter = document.getElementById('btn_Filter');
const menuitems = document.getElementsByClassName('menu-items');


var i = false;
btnFilter.onclick = function () {
    if (i == false) {
        showmenu();
        i = true;
    }
    else {
        hidemenu();
        i = false;
    }

}

function showmenu() {
    menuitems[0].classList.remove('hide-menu-items');
    menuitems[0].classList.add('active-menu-items');
}
function hidemenu() {
    menuitems[0].classList.remove('active-menu-items');
    menuitems[0].classList.add('hide-menu-items');
}

/**sự kiện nút ontoppage */
//Get the button
var mybutton = document.getElementById('btn_ontoppage');

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

/**dữ liệu */

var listproduct = getProductListFromLocalStorage();
const ListItems = document.getElementsByClassName('list-items');
const ListModalBuy = document.getElementsByClassName('modal-buy-container');
/**paging */

let perPage = 12;
let currentPage = 1;
let start = 0;
let end = perPage;

const totalPages = Math.ceil(listproduct.length / perPage);
// function renderProduct(){
//     for(var i = start; i < end ; i++){
//         listitems[i] = `<div class="item">
//                         <img src="${listproduct[i].img}" alt="" width="200" />
//                         <p class="name">${listproduct[i].name}</p>
//                         <p class="price">Price: ${listproduct[i].price} VND</p>
//                         <div class="btnBuy">Buy</div>
//                     </div>`;
//         listitem = listitems.join();
//         listitem2 = listitem.replaceAll(',','');
//         ListItems[0].innerHTML = listitem2;
//     }
// }
const btnNext = document.querySelector('.btn-next');
const btnPrev = document.querySelector('.prev-btn ');

function getCurrentPage(currentPage) {
    start = (currentPage - 1) * perPage;
    end = currentPage * perPage;

}

function renderProduct() {
    html = '';
    const content = listproduct.map((listproduct, index) => {
        if (index >= start && index < end) {
            html += '<div class="item">';
            html += '<img title="'+listproduct.description+'" class="imgproductItem" src=' + listproduct.img + ' alt="" width="200">';
            html += '<p class="name">' + listproduct.name + '</p>';
            html += '<p class="price">Price: ' + listproduct.price + ' VND</p>';
            html += '<div class="btnBuy" id="' + listproduct.id + '" onclick="rendermodal(this);showBuyModal(); ">Buy</div>';
            html += '</div>';
            return html;
        }
    });
    ListItems[0].innerHTML = html;
}
///
function listCasio(){
    let ListCasio = [];
    var index = 0;
    for(var i = 0; i < listproduct.length ; i++){
        if(listproduct[i].name.includes('Casio')==true){
            ListCasio[index] = listproduct[i];
            index++;
        }
    }
    return ListCasio;
}
///
function renderProductCasio() {
    html = '';
    for(var i = 0 ; i < listCasio.length ; i++){
            html += '<div class="item">';
            html += '<img title="'+listCasio.description+'" class="imgproductItem" src=' + listCasio.img + ' alt="" width="200">';
            html += '<p class="name">' + listCasio.name + '</p>';
            html += '<p class="price">Price: ' + listCasio.price + ' VND</p>';
            html += '<div class="btnBuy" id="' + listCasio.id + '" onclick="rendermodal(this);showBuyModal(); ">Buy</div>';
            html += '</div>';
            return html;
        
    }
    ListItems[0].innerHTML = html;
}
///
/**
 * start: Hàm xử lý load dữ liệu lên modal buy
 */

function rendermodal(object) {
    html = '';
    let idbtnAddtocart = object.id;
    const content = listproduct.map((listproduct, index) => {
        if (index >= start && index < end) {
            if (idbtnAddtocart === listproduct.id) {
                console.log('thành công' + idbtnAddtocart);
                html += '<div class="modal-buy-close" onclick="hideBuyModal()">';
                html += '<i class="ti-close"></i>';
                html += '</div>';
                html += ' <div class="modal-buy-img">';
                html += '<img src=' + listproduct.img + ' alt="">';
                html += '</div>';
                html += ' <div class="modal-buy-info">';
                html += '<header class="modal-buy-header">' + listproduct.name + '</header>';
                html += ' <div class="line"></div>';
                html += ' <p id="price">Price: ' + listproduct.price + ' VND</p>';
                if(listproduct.quantity > 0 &&listproduct.quantity < 10){
                    html += '<p class="quantity-info" id ="'+listproduct.id+'">Quantity: <span style="color: red">'+listproduct.quantity+' products.</span> </p>';
                }
                else if(listproduct.quantity == 0){
                    html += '<p class="quantity-info" id ="'+listproduct.id+'">Quantity: <span style="color: red">Sold out.</span> </p>';
                }
                else{
                    html += '<p class="quantity-info" id ="'+listproduct.id+'">Quantity: '+listproduct.quantity+' products. </p>';
                }
                html += '<div class="quantity-control">';
                html += ' <input class="btnPlusMinus" type="button" name="Minus" value="-" id="btnMinus" onclick="addAndMinusQuantity(this)">';
                html += '<input class="quantityBox" type="number" value="1" min="1" max="25" id="numberCol" disabled style="text-align:center;" >';
                html += '<input class="btnPlusMinus" type="button" name="Add" value="+" id="btnPlus" onclick="addAndMinusQuantity(this)" >';
                html += ' </div>';
                if(listproduct.quantity == 0){
                    html += ' <input class="btnAddtocart" type="button" name="Add-to-cart" value="Add to cart" disabled id="' + idbtnAddtocart + '" onclick="addCartItems(this); ">';
                }
                else{
                    html += ' <input class="btnAddtocart" type="button" name="Add-to-cart" value="Add to cart" id="' + idbtnAddtocart + '" onclick="addCartItems(this); ">';
                }
                html += '</div>';
                return html;
            }
        }
    });
    ListModalBuy[0].innerHTML = html;
}

//renderModalBuy(object);
/**
 * end: Hàm xử lý load dữ liệu lên modal buy
 */
renderProduct();
setTimeout(renderListPage(), 1000);
btnNext.addEventListener('click', () => {
    currentPage++;
    if (currentPage > totalPages) {
        currentPage = totalPages;
    }
    if (currentPage == totalPages) {
        $('.nextbtn').addClass('btn-active');
    }
    $('.prevbtn').removeClass('btn-active');
    $('#number-page li a').removeClass('active');
    $(`#number-page li a:eq(${currentPage - 1})`).addClass('active');
    getCurrentPage(currentPage);
    renderProduct();

})

btnPrev.addEventListener('click', () => {
    currentPage--;


    if (currentPage < 1) {
        currentPage = 1;
    }
    if (currentPage === 1) {
        $('.prevbtn').addClass('btn-active');
    }

    $('.nextbtn').removeClass('btn-active');
    $('#number-page li a').removeClass('active');
    $(`#number-page li a:eq(${currentPage - 1})`).addClass('active');
    getCurrentPage(currentPage);
    renderProduct();



})

function renderListPage() {
    let html = '';
    html += `<li ><a class="active" href="#btn_Filter">${1}</a></li>`;
    for (let i = 2; i <= totalPages; i++) {
        html += `<li><a href="#btn_Filter">${i}</a></li>`;
    }
    if (totalPages === 0) {
        html = ''
    }
    document.getElementById('number-page').innerHTML = html;
}

function changePage() {
    const currentPages = document.querySelectorAll('#number-page li a');
    console.log(currentPages);
    for (let i = 0; i < currentPages.length; i++) {
        currentPages[i].addEventListener('click', () => {
            const value = i + 1;
            currentPage = value;
            $("#number-page li a").removeClass('active');
            currentPages[i].classList.add('active');
            if (currentPage > 1 && currentPage < totalPages) {
                $('.nextbtn').removeClass('btn-active');
                $('.prevbtn').removeClass('btn-active');
            }
            if (currentPage === 1) {
                $('.nextbtn').removeClass('btn-active');
                $('.prevbtn').addClass('btn-active');
            }
            if (currentPage === totalPages) {
                $('.prevbtn').removeClass('btn-active');
                $('.nextbtn').addClass('btn-active');
            }
            getCurrentPage(currentPage);
            window.location = "#";
            setTimeout('renderProduct()', 0);
            
        })
    }
}
changePage();
//sự kiện nút Buy

const buyBtns = document.querySelectorAll('.btnBuy');
const modalBuy = document.querySelector('.modal-buy');
const btnCloseModal = document.querySelector('.modal-buy-close');
const btnPlus = document.querySelector('#btnPlus');
const btnMinus = document.querySelector('#btnMinus');

function showBuyModal() {
    if(loggedin1.length != 0){
        modalBuy.classList.add('active-modal-buy');
    }
    else
        window.alert('Vui lòng đăng nhập!');

}
// for(const buyBtn of buyBtns){
//     buyBtn.addEventListener('click', showBuyModal)
// }

function hideBuyModal() {
    modalBuy.classList.remove('active-modal-buy');
}

function loadPage(){
    window.location = "shop.html";
}

document.addEventListener('DOMContentLoaded', (event) => {
    // TODO: This html of .modal-buy-close class is commented out in shop.html 
    // btnCloseModal.addEventListener('click', hideBuyModal);
});


//xử lý thêm bớt sản phẩm
function addAndMinusQuantity(object) {
    let quantityObject = document.getElementById('numberCol');
    let quantity = parseInt(quantityObject.value);
    const maxQuantity = document.getElementById('numberCol').max,
        minQuantity = document.getElementById('numberCol').min;
    let btn = object.value;
    if (btn === "+") {
        if (quantity < maxQuantity) {
            quantityObject.value = quantity + 1;
        }
    } else {
        if (quantity > minQuantity) {
            quantityObject.value = quantity - 1;
        }
    }
}

///
var loggedin1 = JSON.parse(localStorage.getItem("loggedin"));
var userId1 = loggedin1[0].id;
var userName1 = loggedin[0].username;
var listUser1 = JSON.parse(localStorage.getItem("user-list"));

