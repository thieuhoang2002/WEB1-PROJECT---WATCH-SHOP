var keyBrandList = "brand-list";
// Yêu cầu: khởi tạo một đối tượng thương hiệu sản phẩm.
// Input: mã, tên.
// Output: trả về một đối tượng brand mới.
var createBrand = (_brand_name, _brand_id) => {
    // 1. Khởi tạo đối tượng
    var newBrand = new Object();
    
    // 2. Khởi tạo thuộc tính
    if(_brand_id != null) {
        newBrand.id = _brand_id;
    } else {
        newBrand.id =createId("B");
    }
    newBrand.name = _brand_name;

    // 3. Phương thức chuyển đối tượng brand sang cấu trúc JSON
    newBrand.toJson = function () {
        return JSON.stringify(this);
    }

    return newBrand;
}

// Yêu cầu: Format từ một JSON sang object đầy đủ.
// Input: đối tượng dạng JSON.
// Output: đối tượng.
var formatBrandJsonToObject = (_objectJson) => {
    let _object =  JSON.parse(_objectJson);
    let _objectFull = createBrand(_object.name, _object.id);
    return _objectFull;
}

// Yêu cầu: đưa một mảng chứa nhiều brand xuống localStorage.
// Input: array
// Output: array được lưu xuống localStorage
var saveBrandListToLocalStorage = (_brand_list) => {
    let _brand_list_Json = JSON.stringify(_brand_list);
    localStorage.setItem(keyBrandList, _brand_list_Json);
}

// Yêu cầu: lấy mảng chứa các brand từ localStorage lên.
// Input:
// Output: danh sách brand với các đối tượng đầy đủ
var getBrandListFromLocalStorage = () => {
    let _brandListJson = localStorage.getItem(keyBrandList);
    let _brandList = JSON.parse(_brandListJson);
    let _brandListFull = [];
    for(let i = 0; i < _brandList.length; i++) {
        let _brand = _brandList[i];
        _brandListFull[i] = createBrand(_brand.name, _brand.id);
    }
    return _brandListFull;
}

// Yêu cầu: lấy một đối tượng brand từ mảng khi truyền vào brandid
// Input: brnad_id
// Output: brand
var getBrand = (_brand_id) => {
    let brandFind = null;
    let brandList = getBrandListFromLocalStorage();
    for(let i = 0; i < brandList.length; i++) {
        if(brandList[i].id == _brand_id) {
            brandFind = brandList[i];
            break;
        }
    }
    return brandFind;
}

// Yêu cầu: lấy một đối tượng brand khi truyền vào brand name
// Input: brand name
// Output: brand
var getBrandByName = (_brand_name) => {
    let brandFind = null;
    let brandList = getBrandListFromLocalStorage();
    for(let brand of brandList) {
        if(String(brand.name).toLocaleLowerCase() == _brand_name.toLocaleLowerCase()) {
            brandFind = brand;
            break;
        }
    }
    return brandFind;
}