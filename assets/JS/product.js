var keyProductList = 'product-list';
// Yêu cầu: hàm khởi tạo đối tượng sản phẩm đồng hồ trong shop.
// Input: name, img, quantity, price, description.
// Output: new product object
var createProduct = (_name, _img, _quantity, _price, _description, _brand_id, _id) => {
    var newProduct = new Object();

    if (_id != null) {
        newProduct.id = _id;
    } else {
        newProduct.id = createId("W");
    }
    newProduct.name = _name;
    newProduct.img = _img;
    newProduct.quantity = _quantity;
    newProduct.price = _price;
    newProduct.description = _description;
    newProduct.brandId = _brand_id;

    newProduct.toJson = function () {
        return JSON.stringify(this);
    }

    return newProduct;
}

// Yêu cầu: chuyển từ một productJson sang object đầy đủ
var formatProductJsonToObject = (_productJson) => {
    let _product = JSON.parse(_productJson);
    _product = createProduct(_product.name, _product.img, _product.quantity, _product.price, _product.description, _product.brandId, _product.id);
    return _product;
}

// Yêu cầu: đưa một mảng product xuống localStorage
var saveProductListToLocalStorage = (_productArr) => {
    let _productArrJson = JSON.stringify(_productArr);
    localStorage.setItem(keyProductList, _productArrJson);
}

// Yêu cầu: lấy một mảng product lên từ localStorage và mảng phải là mảng chứa các đối tượng đầy đủ method.
var getProductListFromLocalStorage = () => {
    let _productArr = JSON.parse(localStorage.getItem(keyProductList));
    let _productArrFull = new Array();
    for (let product of _productArr) {
        _productArrFull.push(createProduct(product.name, product.img, product.quantity, product.price, product.description, product.brandId, product.id));
    }
    return _productArrFull;
}

// Yêu cầu: lấy một đối tượng product từ mảng khi truyền vào productId
// Input: product_id
// Output: product
var getProduct = (_product_id) => {
    let productFind = null;
    let productList = getProductListFromLocalStorage();
    for (let i = 0; i < productList.length; i++) {
        if (productList[i].id == _product_id) {
            productFind = productList[i];
            break;
        }
    }
    return productFind;
}

// Hiển thị danh sách quản lý sản phẩm
// Yêu cầu: xây dựng html string của một card sản phẩm
var productAdminHtml = (product) => {
    var html = '';
    html += '<tr class="products__tr products__tr--animation">';
    html += '<td class="products__td">' + product.id + '</td>';
    html += '<td class="products__td"><img class="products__td-img" src="' + product.img + '" alt="product"></td>';
    html += '<td class="products__td">' + product.name + '</td>';
    html += '<td class="products__td">' + new Intl.NumberFormat(`vi`, {style: `currency`, currency: `VND`}).format(product.price) + '</td>';
    html += '<td class="products__td">' + product.quantity + '</td>';
    html += '<td class="products__td">' + getBrand(product.brandId).name + '</td>';
    html += '<td class="products__td product__td-eye-icon"><i class="products__td-icon ti-eye" onclick="showModalDescription(\'' + product.id + '\')"></i></td>';
    html += '<td class="products__td"><i class="products__td-icon fa-regular fa-pen-to-square" onclick="showEditForm(\'' + product.id + '\')"></i></td>';
    html += '</tr>';
    return html;
}

// Yêu cầu: Xây dựng html string của một product List
var productListAdminHtml = (productList) => {
    var html = '';
    for (let i = 0; i < productList.length; i++) {
        html += productAdminHtml(productList[i]);
    }
    return html;
}

// Yêu cầu: Hiển thị danh sách sản phẩm ra giao diện admin
var showProductListHTML = () => {
    // 1. Truy cập tới node chứa danh sách sản phẩm
    let nodeProductList = document.querySelector('.products__tbody');

    // 2. Load danh sách sản phẩm từ localStorage và dựng html string
    let htmlString = productListAdminHtml(getProductListFromLocalStorage());

    // 3. innerHTML string đó vào node vừa truy cập
    nodeProductList.innerHTML = htmlString;
}

// Yêu cầu hiển thị danh sách sản phẩm khi truyền vào một arr sản phẩm ra giao diện admin, đồng thời phân trang sao cho mỗi lần chỉ hiển thị tối đa 5 sản phẩm
var printProductList = (currentPage) => {
    // 1. Load danh sách sản phẩm lên từ localStorage.
    let productList = getProductListFromLocalStorage();

    // 2. Khai báo các biến gồm: số sản phẩm trong một trang, số trang = tổng số sản phẩm/số sản phẩm trong một trang.
    const numProductsInAPage = 5;
    const numPages = Math.ceil(productList.length / numProductsInAPage);

    // 3. Duyệt vòng lặp để tạo phần ui cho phân trang
    // 3.1. Truy cập tới node ul chứa các node phân trang
    let nodePages = document.querySelector('.products__pages');

    // 3.2. Tạo htmlString cho ui phân trang
    let htmlPages = '';
    for (let i = 1; i <= numPages; i++) {
        htmlPages += '<li class="products__page" onclick="printProductList(' + i + ')">' + i + '</li>';
    }

    // 3.3. innerHTML htmlString cho node vừa truy cập
    nodePages.innerHTML = htmlPages;

    // Xét css nền đen chữ trắng cho item phân trang được chọn
    setNodePageCss(currentPage);

    // 4. Phân trang
    let pages = new Array();
    pages[0] = 0;
    pages[numPages] = productList.length;

    for (let i = 1; i < numPages; i++) {
        pages[i] = i * numProductsInAPage;
    }

    let htmlProductListInPage = '';
    for (let i = pages[currentPage - 1]; i < pages[currentPage]; i++) {
        htmlProductListInPage += productAdminHtml(productList[i]);
    }

    // 5. Truy cập tới node chứa danh sách sản phẩm admin và add htmlString này vào
    let nodeProductList = document.querySelector('.products__tbody');
    nodeProductList.innerHTML = htmlProductListInPage;
}

// Hàm xét lại css cho một node li phân trang khi nhấn vào
var setNodePageCss = (currentPage) => {
    let pageList = document.querySelectorAll('.products__page');
    for (let pageUi of pageList) {
        if (pageUi.innerText == currentPage) {
            pageUi.classList.add('products__page--active');
        } else {
            if (pageUi.classList.contains('products__page--active')) {
                pageUi.classList.remove('products__page--active');
            }
        }
    }
}

var searchProducts = (currentPage) => {
    // 1. Lấy danh sách sản phẩm tìm được khi truyền vào keywords được lấy từ node input search
    let productListSearch = getProductList(document.querySelector('.products .admin__tBSearch').value);
    console.log(productListSearch);

    // 2. Đặt các biến cơ bản: biến số lượng sản phẩm trong một trang, biến số trang
    let numProduct = 5;
    let totalPages = Math.ceil(productListSearch.length / numProduct);

    // 3. Duyệt vòng lặp để tạo ui phân trang
    var htmlPage = '';
    for (let i = 1; i <= totalPages; i++) {
        htmlPage += `<li class="products__page" onclick="searchProducts(${i})">${i}</li>`;
    }
    document.querySelector('.products__pages').innerHTML = htmlPage;

    // 4. Xét lại css cho thẻ li đang được chọn hiện tại
    setNodePageCss(currentPage);

    // 5. Tạo mảng phân trang
    var pages = new Array();
    pages[0] = 0;
    pages[totalPages] = productListSearch.length;
    for (let i = 1; i < totalPages; i++) {
        pages[i] = i * numProduct;
    }

    // 6. Phân trang
    var htmlProductSearchUI = '';
    for (let i = pages[currentPage - 1]; i < pages[currentPage]; i++) {
        htmlProductSearchUI += productAdminHtml(productListSearch[i]);
    }
    document.querySelector('.products__tbody').innerHTML = htmlProductSearchUI;
}

// Hàm lấy danh sách sản phẩm theo keywords truyền vào (brand, name)
var getProductList = (keywords) => {
    let productList = getProductListFromLocalStorage();
    let produtcListResults = [];
    for (let i = 0; i < productList.length; i++) {
        let product = productList[i];
        if (product.name.toLowerCase().indexOf(keywords.toLowerCase()) != -1
            || getBrand(product.brandId).name.toLowerCase().indexOf(keywords.toLowerCase()) != -1) {
            produtcListResults.push(product);
        }
    }
    return produtcListResults;
}

// Hiển thị popup xác nhận xóa khi nhấn vào icon trash
var confirmDeleteDialog = (productId) => {
    let popup = document.querySelector('.popup-delete-post[popupId=' + productId + ']');
    if (popup.classList.contains('open')) {
        popup.classList.remove('open');
    } else {
        popup.classList.add('open');
    }
}

function closeConfirmDeleteDialog(productId) {
    let popup = document.querySelector('.popup-delete-post[popupId=' + productId + ']');
    popup.classList.remove('open');
}

// Hàm xóa một phần tử khỏi mảng
var deleteProduct = (productId) => {
    // 1. Lấy danh sách sản phẩm lên từ localStorage
    let productList = getProductListFromLocalStorage();
    // 2. Duyệt mảng và tìm vị trí của sản phẩm cần xóa
    let index = -1;
    for (let i = 0; i < productList.length; i++) {
        let product = productList[i];
        if (product.id == productId) {
            index = i;
            break;
        }
    }
    // 3. Xóa phần tử trong mảng by func splice khi truyền vào index và số phần tử muốn xóa
    productList.splice(index, 1);

    // 3. Sau khi xóa thì đưa danh sách xuống local
    saveProductListToLocalStorage(productList);

    // 4. Hiển thị danh sách sau khi xóa ra ui
    printProductList(1);

    // 5. Hiển thị toast thông báo xóa thành công
    showSuccesToastDelete("This Product Was Deleted From Database");
}

// PHẦN JS KHI NHẤN VÀO ICON EYE Ở TABLE HIỂN THỊ SẢN PHẨM THÌ HIỂN THỊ DESCRIPTION CỦA PRODUCT ĐÓ
// VÀ KHI NHẤN VÀO MARK ICON THÌ ĐÓNG MODAL LẠI
function showModalDescription(productId) {
    // Cập nhật thông tin cho phần modal desc
    let productNow = getProduct(productId);
    // 1. Truy cập tới node chứa modal desc
    let nodeModalContainer = document.querySelector('.modal__container');

    // 2. Dựng html string
    let htmlDesc = '';
    htmlDesc += '<div class="modal__product-desc" onclick="stopPropagationDefault(event)">';
    htmlDesc += '<h2 class="modal__product-desc-heading">' + productNow.name + '</h2>';
    htmlDesc += '<ul class="modal__products-desc-content">';
    // Cắt chuỗi desc để hiển thị phần nội dung của modal
    let text = String(productNow.description).split('.');
    for (let i = 0; i < text.length; i++) {
        htmlDesc += '<li class="modal__products-desc-content-item">' + text[i] + '.</li>';
    }
    htmlDesc += '</ul>';
    htmlDesc += '<div class="modal__product-desc-mark">';
    htmlDesc += '<i class="fa-solid fa-xmark" onclick = "closeModalDesc()"></i>';
    htmlDesc += '</div>';
    htmlDesc += '</div>';

    // 3. Add html string vào node chứa
    nodeModalContainer.innerHTML = htmlDesc;

    // Phần hiển thị modal
    // 1. Truy cập tới phần modal
    let modal = document.querySelector('.modal');
    // 2. Js hiển thị modal
    modal.classList.add('open');
}

var closeModalDesc = () => {
    let modal = document.querySelector('.modal');
    modal.classList.remove('open');
}

// PHẦN NGĂN NGỪA SỰ KIỆN NỔI BỌT CỦA MODAL DESC
var stopPropagationDefault = (event) => {
    event.stopPropagation();
}

// Khi nhấn vào icon edit thì hiển thị form edit product
var showEditForm = (productId) => {
    var product = getProduct(productId);
    // 1. Truy cập tới node chứa modal content
    var modalContainer = document.querySelector('.modal__container');
    // 2. Dựng htmlString của form edit
    var htmlForm = `
    <div class="modal__form-edit" onclick="stopPropagationDefault(event)">
        <p class="modal-form-edit__heading">Product Form</p>

        <label class="modal-form-edit__label" for="product-name-edit">Name</label>
        <input class="modal-form-edit__input edit-product-notBlank" notBlank errNotBlank="Name can not be blank!" type="text" id="product-name-edit" value="${product.name}">
        <label class="error" for="product-name-edit"></label>

        <label class="modal-form-edit__label" for="product-price-edit">Price</label>
        <input class="modal-form-edit__input edit-product-notBlank edit-product-number" notBlank errNotBlank="Price can not be blank!" numberGreaterThan="Price must be a number and greater than 0" type="text" id="product-price-edit" value="${product.price}">
        <label class="error" for="product-price-edit"></label>

        <label class="modal-form-edit__label" for="">Image</label>
        <div class="modal-form-edit__frame-img">
            <label for="input-file-img-product-edit">
                <img src="${product.img}" alt="Product Img" class="modal-form-edit__img">
            </label>
            <input id="input-file-img-product-edit" type="file" value="${product.img}">
        </div>
        <label class="error" for="input-file-img-product-edit"></label>

        <label class="modal-form-edit__label" for="product-quantity-edit">Quantity</label>
        <input class="modal-form-edit__input edit-product-notBlank edit-product-integer" notBlank errNotBlank="Quantity can not be blank!" numIntGreaterThan0="Quantity must be a integer and grater than 0" type="text" id="product-quantity-edit" value="${product.quantity}">
        <label class="error" for="product-quantity-edit"></label>

        <label class="modal-form-edit__label"  for="product-brand-edit">Brand</label>
        <select errNotGetValueDefault="Please choose a brand!" id="product-brand-edit" class="modal-form-edit__brand">
            <option class="brand-option" value="seiko">Seiko</option>
            <option class="brand-option" value="casio">Casio</option>
            <option class="brand-option" value="citizen">Citizen</option>
            <option class="brand-option" value="orient">Orient</option>
        </select>
        <label class="error" for="product-brand-edit"></label>

        <label class="label-product-desc modal-form-edit__label" for="product-description-edit">Description</label>
        <textarea notBlank errNotBlank="Description can not be blank!" id="product-description-edit" class="modal-form-edit__description edit-product-notBlank" rows="8">${product.description}</textarea>
        <label class="error" for="product-description-edit"></label>

        <button class="modal-form-edit__btn js-modal-form-edit__btn" onclick="editProduct('${productId}')">Save</button>
    </div>`;
    // 3. innerHTM string vào node vừa truy cập
    modalContainer.innerHTML = htmlForm;
    // 4. Chọn brand cho section dựa vào product truyền vào
    let nodeBrand = document.querySelector('.modal-form-edit__brand');
    nodeBrand.value = getBrand(product.brandId).name.toLowerCase();
    // 5. Đăng kí sự kiện khi chọn ảnh trong input file thì xét lại src cho img edit
    changeImgWhenInputFileChangeAtForm ('input-file-img-product-edit', 'modal-form-edit__img');
    // 6. Hiển thị modal
    var modal = document.querySelector('.modal');
    modal.classList.add('open');
}