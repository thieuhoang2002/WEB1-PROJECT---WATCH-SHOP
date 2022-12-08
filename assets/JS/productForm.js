/* JS khi nhấn vào button "Add Product của Page "Add Product UI", trước khi xử lý thì phải kiểm tra tính hợp lệ của form,
nếu hợp lệ thì tiếp tục xử lý, nếu không hợp lệ thì hiển thị lỗi tương ứng ra các label hiển thị lỗi của từng node input*/
// Yêu cầu:
/* 
    1. Tất cả node input không được để trống.
    2. Node input nhập giá sản phẩm phải là số và lớn hơn 0.
    3. Node input số lượng sản phẩm phải là số nguyên và lớn hơn 0.
    4. Node img chứa url khác với url mặc định.
    5. Node chọn brand không được để mặc định.
 */
// Các bước thực hiện
function addProduct () {
        // Gọi hàm kiểm tra tính hợp lệ của form, nếu hợp lệ thì cho phép tiếp tục xử lý, nếu không hợp lệ, hiển thị thông báo lỗi cụ thể của từng ô
        if(checkFormAddProduct()) {
            // Xử lý thêm sản phẩm
            // 1. Lấy tất cả data đầu vào: input name, input price, input img, input quantity, input brand, input desc
            let name = document.getElementById('product-name').value;
            let price = document.getElementById('product-price').value;
            let imgSrc = document.querySelector('.admin-container-body-add-product__img').src;
            let quantity = document.getElementById('product-quantity').value;
            let brand = document.getElementById('product__brand').value;
            let desc = document.getElementById('product-description').value;
            // 2. Tạo một đối tượng product từ các tham số truyền vào
            let newProduct = createProduct(name, imgSrc, quantity, price, desc, getBrandByName(brand).id);

            // 3. Lấy danh sách sản phẩm lên từ local
            let productList = getProductListFromLocalStorage();

            // 4. Thêm sản phẩm vừa tạo vào danh sách và đẩy danh sách xuống local
            productList.push(newProduct);
            saveProductListToLocalStorage(productList);

            // 5. Reset form
            resetFormAddProduct();

            // 6. Hiển thị thông báo thêm sản phẩm thành công
            showSuccessToast();
        } else {
            showErrorToast();
        }
}

// Hàm kiểm tra tính hợp lệ của form add product
var checkFormAddProduct = () => {
    let valid = true;
    // 1. Tất cả node input không được để trống.
    if(!checkNotBlank('add-product-notBlank')) {
        valid = false;
    }

    // 2. Check Input number
    if(!checkInputNumber('add-product-number')) {
        valid = false;
    }

    // 3. Check Input interger
    if(!checkInputInterger('add-product-integer')) {
        valid = false;
    }

    // 4. Node img chứa url khác với url mặc định.
    if(!checkNodeInputFile('input-file-img-product')) {
        valid = false;
    }

    // 5. Check node select choose brand không được mang giá trị default là "Choose Brand".
    if(!checkNodeChooseBand('product__brand')) {
        valid = false;
    }

    return valid;
}

// Check node input file type xem người dùng có chọn file hay chưa
var checkNodeInputFile = (nodeInputId) => {
    let valid = true;
    // 1. Truy cập tới nodeInput điều hướng người dùng tới File Exploer và lấy value của nó
    let nodeInputFile = document.getElementById(`${nodeInputId}`);
    let nodeInputFileData = nodeInputFile.value;
    // 2. Truy cập tới node show lỗi của node này
    let nodeShowError = getNodeShowError(nodeInputFile.getAttribute('id'));
    nodeShowError.innerHTML = '';
    // 3. Check data
    if(nodeInputFileData == '') {
        valid = false;
        nodeShowError.innerHTML = '&nbsp<i class="ti-info-alt"></i>&nbsp' + "Please choose a product image!";
    }
    return valid;
}

// Check node select choose brand có mang giá trị default là "Choose Brand" thì hiển thị lỗi và trả về false
var checkNodeChooseBand = (nodeBrandId) => {
    let valid = true;
    // 1. Truy cập tới node select brand và lấy data
    let nodeChooseBand = document.getElementById(`${nodeBrandId}`);
    let nodeChooseBandData = nodeChooseBand.value;
    
    // 2. Truy cập tới node hiển thị lỗi
    let nodeShowError = nodeChooseBand.nextElementSibling;
    nodeShowError.innerHTML = '';

    // 3. Check data
    if(nodeChooseBandData == "choose brand") {
        // 4. Nếu data không hợp lệ thì hiển thị lỗi
        valid = false;
        nodeShowError.innerHTML ='&nbsp<i class="ti-info-alt"></i>&nbsp' + nodeChooseBand.getAttribute('errNotGetValueDefault');
    }
    
    return valid;
}

// Yêu cầu: Khi input file type thay đổi value thì xét lại src cho thẻ img.
function changeImgWhenInputFileChangeAtForm (inputFileId, imgClass) {
    var inputFile = document.getElementById(`${inputFileId}`);

    inputFile.addEventListener('change', function(event) {
        // Tip: 1
        // const files = event.target.files;
        // const file = files[0];
        // let inputImg = document.querySelector('.admin-container-body-add-product__img');
        // inputImg.src = URL.createObjectURL(file);

        // Tip: 2
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onload = function () {
            let url = reader.result;
            let inputImg = document.querySelector(`.${imgClass}`);
            inputImg.src = url;
        }
        reader.readAsDataURL(file);
    });
}

// Yêu cầu: Hàm xét lại giá trị của các ô input
var resetFormAddProduct = () => {
    let name = document.getElementById('product-name');
    name.value = '';
    let price = document.getElementById('product-price');
    price.value = '';
    let imgSrc = document.querySelector('.admin-container-body-add-product__img');
    imgSrc.src = '../assets/img/admin/admin-add-product/image-placeholder.jpg';
    let nodeInputFile = document.getElementById('input-file-img-product');
    nodeInputFile.value = '';
    let quantity = document.getElementById('product-quantity');
    quantity.value = '';
    let brand = document.getElementById('product__brand');
    brand.value = 'choose brand';
    let desc = document.getElementById('product-description');
    desc.value = '';
}

/* Yêu cầu: Khi nhấn vào btn save của form edit, trước khi sử lý thì phải kiểm tra tính hợp lệ của form, nếu all infor hợp lệ thì
edit sản phẩm trong local, ngược lại hiển thị lỗi tương ứng ra các label hiển thị lỗi của từng ô input */
// Yêu cầu:
/* 
    1. Tất cả node input không được để trống.
    2. Node input nhập giá sản phẩm phải là số và lớn hơn 0.
    3. Node input số lượng sản phẩm phải là số nguyên và lớn hơn 0.
    4. Node img chứa url khác với url mặc định.
    5. Node chọn brand không được để mặc định.
 */
function editProduct(productId) {
        if(checkFormEditProduct()) {
            // 1. Truy cập tới all node input của form và lấy value
            let name = document.getElementById('product-name-edit').value;
            let price = document.getElementById('product-price-edit').value;
            let img = document.querySelector('.modal-form-edit__img').src;
            let quantity = document.getElementById('product-quantity-edit').value;
            let brand = document.getElementById('product-brand-edit').value;
            let desc = document.getElementById('product-description-edit').value;

            // 2. Load sanh sách lên từ local
            let productList = getProductListFromLocalStorage();

            // 3. Tìm kiếm sản phẩm theo id và edit
            for(let i = 0; i < productList.length; i++) {
                let product = productList[i];
                if(product.id == productId) {
                    product.name = name;
                    product.price = price;
                    product.img = img;
                    product.quantity = quantity;
                    product.brandId = getBrand(brand).id;
                    product.description = desc;
                    break;
                }
            }
            // 4. Lưu lại danh sách xuống local
            saveProductListToLocalStorage(productList);

            // 5. Load lại danh sách sản phẩm từ local render ra ui
            printProductList(1);

            // 6. Ẩn modal
            let modal = document.querySelector('.modal');
            modal.classList.remove('open');

            // 7. Hiển thị thông báo sửa product successfully
            showSuccessToastEdit();
        } else {
            // Hiển thị thông báo sửa product thất bại
            showErrorToast();
        }
}

// Yêu cầu: Hàm kiểm tra tính hợp lệ của form edit product
var checkFormEditProduct = () => {
    let valid = true;
    // 1. all node input không được để trống
    if(!checkNotBlank('edit-product-notBlank')) {
        valid = false;
    }
    if(!checkInputNumber('edit-product-number')) {
        valid = false;
    }
    if(!checkInputInterger('edit-product-integer')) {
        valid = false;
    }
    if(!checkNodeChooseBand('product-brand-edit')) {
        valid = false;
    }
    return valid;
}