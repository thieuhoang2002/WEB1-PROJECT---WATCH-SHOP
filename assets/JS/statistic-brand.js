// Khai báo các biến hằng truy cập đến các node, muốn khai báo thì để những tag script phía dưới body
const inputBrandDate1 = document.getElementById('statistic-brand__input-date1');
const inputBrandDate2 = document.getElementById('statistic-brand__input-date2');

// Yêu cầu: Xét ngày tháng năm hiện tại mặc định cho hai ô input của brand statistic khi load trang
function setDateDefaultForBrandStatisticInputs () {
    inputBrandDate1.value = getDateNow();
    inputBrandDate2.value = getDateNow();
}

// Hàm thống kê số lượng và doanh thu mỗi brand bán được theo thời gian
var getBrandListStatistic = () => {
    // 1. Truy cập đến hai node input date để lấy value
    let dateString1 = inputBrandDate1.value;
    let dateString2 = inputBrandDate2.value;
    // 2. Ép value về kiểu Date()
    let dateFrom = new Date(dateString1);
    let dateTo = new Date(dateString2);
    // 3. Lấy danh sách đơn hàng từ local
    let orderList = getOrderListFromLocalStorage();
    // 4. Tạo một mảng hai chiều, có 2 dòng và 4 cột, dòng 0 sẽ lưu giữ số lượng của mỗi brand, dòng 1 sẽ lưu trữ doanh thu của mỗi brand, cột 0 sẽ là casio, 1 là orient, 2 là citizen, 3 là seiko
    let brandListStatistic = [[0, 0, 0, 0], [0, 0, 0, 0]];
    // 5. Duyệt danh sách đơn hàng và lọc ra những đơn hàng đã xử lý, có ngày nằm trong khoảng dateFrom, dateTo
    for(let i = 0; i < orderList.length; i++) {
        let order = orderList[i];
        let orderDate = new Date(order.date);
        if(order.status == true && (orderDate >= dateFrom && orderDate <= dateTo)) {
            // 5.1. Mỗi lần tìm thấy thì lấy danh sách chi tiết đơn hàng tương ứng
            // 5.2 Duyệt danh sách chi tiết đơn hàng và đếm + set mảng hai chiểu
            let detailOrderList = getDetailOrderList(order.id);
            for(let i = 0; i < detailOrderList.length; i++) {
                let detailOrder = detailOrderList[i];
                if(getProduct(detailOrder.productId).brandId == 'casio') {
                    brandListStatistic[0][0] += detailOrder.quantity;
                    brandListStatistic[1][0] += detailOrder.calcUnitPrice();
                } else if(getProduct(detailOrder.productId).brandId == 'orient') {
                    brandListStatistic[0][1] += detailOrder.quantity;
                    brandListStatistic[1][1] += detailOrder.calcUnitPrice();
                } else if (getProduct(detailOrder.productId).brandId == 'citizen') {
                    brandListStatistic[0][2] += detailOrder.quantity;
                    brandListStatistic[1][2] += detailOrder.calcUnitPrice();
                } else {
                    brandListStatistic[0][3] += detailOrder.quantity;
                    brandListStatistic[1][3] += detailOrder.calcUnitPrice();
                }
            }
        }
    }
    // 6. Return về mảng hai chiều đã tạo và xét giá trị
    return brandListStatistic;

}

// Hàm hiển thị thống kê ra giao diện
var showBrandListStatistic = () => {
    // 1. Lấy danh sách thống kê brand từ dateFrom đến dateTo
    let brandListStatistic = getBrandListStatistic();
    // 2. Truy cập và lấy giá trị của 2 node input date và innertText và hai label có chứa hai date này
    let date1 = inputBrandDate1.value;
    let date2 = inputBrandDate2.value;

    let pDateInfo = document.querySelector('.statistic-brand__date-info');
    let pStatisticInfo = document.querySelector('.statistic-brand__info');

    pDateInfo.innerText = `From ${formatDateToShowUi(date1)} To ${formatDateToShowUi(date2)}`;
    pStatisticInfo.innerText = `Total Number Of Products Sold By Each Brand From ${formatDateToShowUi(date1)} To ${formatDateToShowUi(date2)}`;
    // 3. Xét lại các giá trị trong total quantities và total sales
    let quantity = document.querySelector('.statistic-brand__quantity');
    let sales = document.querySelector('.statistic-brand__sales');
    let numData = 0;
    let salesData = 0;

    for(let i = 0; i < brandListStatistic[0].length; i++) {
        numData += brandListStatistic[0][i];
        salesData += brandListStatistic[1][i];
    }

    quantity.innerText = numData;
    sales.innerHTML = new Intl.NumberFormat('vi', {style: 'currency', currency: 'VND'}).format(salesData);
    // 4. Nếu mảng tồn tại dữ liệu thống kê thì load chart, ngược lại hiển thị thông  báo
    if(brandListStatistic[0][0] == 0 && brandListStatistic[0][1] == 0 && brandListStatistic[0][2] == 0 && brandListStatistic[0][3] == 0) {
        pStatisticInfo.innerText = `There Are No Statistical Data For Each Brand From ${formatDateToShowUi(date1)} To ${formatDateToShowUi(date2)}`;
        resetBrandCanvas();
        showNotifyStatistic(`There Are No Satistical Datas From ${formatDateToShowUi(date1)} To ${formatDateToShowUi(date2)}`);
    } else {
        createBrandChart(brandListStatistic);
    }
}

// Yêu cầu: Tạo một brand Chart từ mảng thống kê brand
var createBrandChart = (brandListStatistic) => {
    // Reset canvas, IMPORTANT
    resetBrandCanvas();
    // 1. Truy cập tới node canvas
    let myCanvas = document.getElementById('brandCanvas');
    // 2. Tạo chart
    let numCasio = brandListStatistic[0][0], numOrient = brandListStatistic[0][1], numCitizen = brandListStatistic[0][2], numSeiko = brandListStatistic[0][3];
    let chart = {
        type: 'doughnut',
        data: {
            labels: [
                'Casio',
                'Orient',
                'Citizen',
                'Seiko'
            ],
            datasets: [{
                label: 'My First Dataset',
                data: [numCasio, numOrient, numCitizen, numSeiko],
                backgroundColor: [
                  'rgb(255, 99, 132)',
                  'rgb(54, 162, 235)',
                  'rgb(255, 205, 86)',
                  'rgb(204,204,204)'
                ],
                hoverOffset: 4
            }]
        }
    };
    // 4.3. Tạo một đối tượng chart từ chart và node canvas
    return new Chart(myCanvas, chart);
}

// Reset canvas
var resetBrandCanvas = () => {
    let canvasContainer = document.querySelector('.statistic-brand__chart');
    canvasContainer.innerHTML = '<canvas id="brandCanvas"></canvas>';
}

// Yêu cầu: Xét sự kiện khi input date của brand statistic thay đổi thì show lại các thông tin thống kê ra ui
var eventForBrandStatisticInput = () => {
    inputBrandDate1.addEventListener('input', function() {
        let date1 = new Date(`${this.value}`);
        let date2 = new Date(`${inputBrandDate2.value}`);
        if(date1 > date2) {
            showErrorInvalidDate();
        } else {
            showBrandListStatistic();
        }
    });
    inputBrandDate2.addEventListener('input', function() {
        let date1 = new Date(`${inputBrandDate2.value}`);
        let date2 = new Date(`${this.value}`);
        if(date1 > date2) {
            showErrorInvalidDate();
        } else {
            showBrandListStatistic();
        }
    });
}