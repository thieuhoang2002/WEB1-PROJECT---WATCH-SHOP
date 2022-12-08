// Yêu cầu: hàm khởi tạo id nhanh
var createId = (type) => {
    return type + Math.random().toString().substr(2, 4) + "_" + String(new Date().getTime());
}

// Yêu cầu: Trả về chuỗi năm-tháng-ngày hiện tại
var getDateNow = () => {
    let date = new Date();
    let year = date.getFullYear().toString();
    let month = (date.getMonth() + 1).toString();
    if(month.length == 1) {
        month = `0${month}`;
    }
    let day = date.getDate().toString();
    if(day.length == 1) {
        day = `0${day}`;
    }
    return `${year}-${month}-${day}`;
}

// Yêu cầu: format năm-tháng-ngày thành ngày/tháng/năm
var formatDateToShowUi = (dateString) => {
    let date = dateString.split('-');
    return `${date[2]}/${date[1]}/${date[0]}`;
}

