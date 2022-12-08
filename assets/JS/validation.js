// Yêu cầu: Kiểm tra các node input do người dùng nhập vào có node nào để trống không
// Input
// Output: true/false và hiển thị lỗi ra label hiển thị lỗi tương ứng của từng node input
var checkNotBlank = (inputClass) => {

    let valid = true;
    // 1. Truy cập all node có thuộc tính là notBlank 
    let nodeNotBlanks = document.querySelectorAll(`.${inputClass}[notBlank]`);

    let stringIcon = stringIconOfNodeShowError();
    
    for(let i = 0; i < nodeNotBlanks.length; i++) {
        // 2. Truy cập tới node input của từng node và lấy data
        let nodeNotBlank = nodeNotBlanks[i];

        let nodeNotBlankData = nodeNotBlank.value;
        
        // 3. Truy cập tới label hiển thị lỗi của từng node input (xây dựng một function truyền vào id của node input và trả về label hiển thị lỗi)
        let nodeShowError = getNodeShowError(nodeNotBlank.getAttribute('id'));
        nodeShowError.innerHTML = "";

        // 4. Check data
        if(nodeNotBlankData == "" || nodeNotBlankData == null) {
            // 5. Nếu data không hợp lệ thì xét biến valid là false và hiển thị lỗi ra label hiển thị lỗi (xây dựng một func truyền vào một nodeinput và trả về lỗi của node input đó)
            valid = false;
            nodeShowError.innerHTML = stringIcon + getErrorNotBlank(nodeNotBlank);
        }
    }
    
    return valid;
}

// Hàm lấy node label hiển thị lỗi khi truyền vào node input id tương ứng
function getNodeShowError(nodeNotBlankId) {
    let nodeShowError = document.querySelector('label[for="' + nodeNotBlankId + '"].error')
    return nodeShowError;
}

// Hàm lấy lỗi khi truyền vào một node inut id
var getErrorNotBlank = (nodeNotBlank) => {
    let error = "This field can not be blank!";
    if(nodeNotBlank.hasAttribute('errNotBlank')) {
        error = nodeNotBlank.getAttribute('errNotBlank');
    }
    return error;
}

// Hàm trả về chuỗi hiển thị icon của label hiển thị lỗi
function stringIconOfNodeShowError() {
    let html = '';
        html+= '&nbsp<i class="ti-info-alt"></i>&nbsp';
    return html;
}

// Yêu cầu: Kiểm tra dữ liệu đầu vào phải là số và lớn hơn không (check giá)
// Input:
// Output: Trả về true/false và hiển thị lỗi của từng node input nếu có.
var checkInputNumber = (inputClass) => {
    let valid = true;
    // 1. Truy cập các node input chỉ được nhập số
    let nodeInputNumbers = document.querySelectorAll(`.${inputClass}[numberGreaterThan]`);
    
    for(let nodeInputNumber of nodeInputNumbers) {
        // 2. Duyệt vòng lặp và lấy data của từng node input
        let nodeInputNumberData = nodeInputNumber.value;

        // 3. lấy node hiển thị lỗi của từng node input
        let nodeShowError = nodeInputNumber.nextElementSibling;

        /* 4. Kiểm tra nếu: node hiển thị lỗi đang không hiển thị lỗi nào khác ở thượng nguồn,
        dữ liệu nhập vào không phải là số hoặc số lớn hơn 0,
        thì hiển thị lỗi, ngược lại không làm gì*/
        // Lấy nội dung text bên trong của từng label hiển thị lỗi
        let errText = nodeShowError.innerText;


        let isNum = isNumber(nodeInputNumberData);
        let num;

        if(isNum) {
            num = parseFloat(nodeInputNumberData);
        }

        if(errText == '' && (!isNumber(nodeInputNumberData) || num < 0)) {
            valid = false;
            nodeShowError.innerHTML = stringIconOfNodeShowError() + nodeInputNumber.getAttribute('numberGreaterThan');
        }
    }

    return valid;
}

// Function check input data, if number is return true, else return false
function isNumber(valueInput) {
    var isNumber = true;
    // isNaN format string thanh number to check
    if(isNaN(valueInput)) {
        isNumber = false;
    }
    return isNumber;
}

// Yêu cầu: dữ liệu đầu vào phải là số nguyên và lớn hơn 0
// Input:
// Output: trả về true/false và hiển thị lỗi nếu có.
var checkInputInterger = (inputClass) => {
    let valid = true;
    // 1. Truy cập tới all node input có thuộc tính numIntGreaterThan0
    let nodeInputIntergers = document.querySelectorAll(`.${inputClass}[numIntGreaterThan0]`);

    for(let i = 0; i < nodeInputIntergers.length; i++) {
        // 2. Duyệt qua và lấy data đầu vào của từng node input
        let nodeInputInterger = nodeInputIntergers[i];

        let nodeInputIntergerData = nodeInputInterger.value;

        // 3. Truy cập tới node show lỗi của từng node input by func or nextElementSibling
        let nodeShowError = getNodeShowError(nodeInputInterger.getAttribute('id'));

        // 4. Check data: node input hiển thị lỗi đang không có lỗi, data nhập vào không phải integer và bé hơn 0.

        let errText = nodeShowError.innerText;

        // Number.isInteger(num) check xem num truyền vào có phải là int, nếu là string thì cần ép thành số trước khi đưa vào.
        let isInt = Number.isInteger(Number(nodeInputIntergerData));
        let intNum;

        if(isInt) {
            intNum = Number(nodeInputIntergerData);
        }

        if(errText == '' && (!isInt || intNum < 0)) {
            valid = false;
            // 5. Trường hợp check err thì hiển thị lỗi, ngược lại không.
            nodeShowError.innerHTML = stringIconOfNodeShowError() + nodeInputInterger.getAttribute('numIntGreaterThan0');
        }
    }
    return valid;
}