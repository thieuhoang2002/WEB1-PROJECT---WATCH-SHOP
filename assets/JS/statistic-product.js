// Khai báo các biến hằng truy cập đến các node, muốn khai báo thì để những tag script phía dưới body
const inputProductDate1 = document.getElementById('statistic-product__input-date1');
const inputProductDate2 = document.getElementById('statistic-product__input-date2');

// Yêu cầu: tạo một class productStatistic mô tả một đối tượng lưu trữ dữ liệu thống kê của một product
class ProductSatistic {
  // constructor
  constructor(productId, productQuantity) {
    this.productId = productId;
    this.productQuantity = productQuantity;
  }

  // method
  getTotalPrice() {
    return getProduct(this.productId).price * this.productQuantity;
  }
}

// Yêu cầu: trả về một danh sách sản phẩm thống kê từ dateFrom đến dateTo
var getProductStatisticList = () => {
  // 1. Tạo một mảng để lưu các đối tượng ProductStatisticList 
  let productStatisticList = new Array();
  // 2. Truy cập đến 2 node input date của statistic by product và lấy value của nó và ép nó thành kiểu date
  let dateFrom = new Date(inputProductDate1.value);
  let dateTo = new Date(inputProductDate2.value);
  // 3. Lấy danh sách order lên từ local Storage, duyệt danh sách và lọc order ra để xét với điều kiện status == true và date phải nằm từ dateFrom đến dateTo
  let orderList = getOrderListFromLocalStorage();
  let count = 0;
  for (let i = 0; i < orderList.length; i++) {
    let order = orderList[i];
    let date = new Date(order.date);
    if (order.status == true && (date >= dateFrom && date <= dateTo)) {
      // Lấy danh sách chi tiết order của order đó và duyệt, mỗi lần duyệt danh sách chi tiết là song song với một lần duyệt danh sách ProductStatistic
      let detailOrderList = getDetailOrderList(order.id);
      for (let i = 0; i < detailOrderList.length; i++) {
        let detailOrder = detailOrderList[i];
        count = 0;
        for (let i = 0; i < productStatisticList.length; i++) {
          // Mỗi lần duyệt nếu có chi tiết nào có productId trùng với productId của một ProductStatistic nào thì cập nhập dữ liệu thống kê cho đối tượng ProductStatistic đó và break
          let productStatistic = productStatisticList[i];
          if (detailOrder.productId == productStatistic.productId) {
            productStatistic.productQuantity += detailOrder.quantity;
            count++;
            break;
          }
        }
        // Nếu không tìm thấy, thì thêm productId của detail đó vàoProductStatisticList
        if (count == 0) {
          var newProductStatistic = new ProductSatistic(detailOrder.productId, detailOrder.quantity);
          productStatisticList.push(newProductStatistic);
        }
      }
    }
  }
  // Sort lại mảng productStatistic theo thứ tự từ lớn đến bé
  productStatisticList.sort((a, b) => a.productQuantity < b.productQuantity ? 1 : -1);
  // 4. Return về đối ProductStatisticList
  return productStatisticList;
}

// Yêu cầu: reset lại node canvas để load biểu đồ
var resetProductCanvas = () => {
  let canvasContainer = document.querySelector(`.statistic-product__chart`);
  canvasContainer.innerHTML = `<canvas id="productCanvas"></canvas>`;
}

// Yêu cầu: vẽ product chart khi truyền vào id của node canvas cần vẽ và một arr statistic
var drawProductStatisticChart = (productStatisticList) => {
  // Trước khi vẽ thì reset lại canvas
  resetProductCanvas();
  let productCanvas = document.getElementById(`productCanvas`);
  let datas = [];
  for (let i = 0; i < productStatisticList.length; i++) {
    if (i == 10) {
      break;
    }
    datas.push(productStatisticList[i].productQuantity);
  }
  let labels = [];
  for(let i = 0; i < datas.length; i++) {
    labels.push(i + 1);
  }
  while(labels.length < 10) {
    labels.push('');
    if(labels.length == 10) {
      break;
    }
  }
  let chart = {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Product Quantity Sold ',
        data: datas,
        fill: false,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
          'rgba(15, 238, 45, 0.2)',
          'rgba(15, 134, 238, 0.2)',
          'rgba(138, 238, 15, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
          'rgb(15, 238, 45)',
          'rgb(15, 134, 238)',
          'rgb(138, 238, 15)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  }
  return new Chart(productCanvas, chart);
}

// Yêu cầu: reset table note
var resetTableNote = () => {
  let table = document.querySelector('.table-note');
  table.innerHTML = '';
}

// Yêu cầu: show dữ liệu thống kê từ dateFrom đến dateTo ra ui
var showProductStatisticToUI = () => {
  let dateFrom = formatDateToShowUi(inputProductDate1.value);
  let dateTo = formatDateToShowUi(inputProductDate2.value);
  // Lấy danh sách thống kê sản phẩm
  let productStatisticList = getProductStatisticList();
  // Truy cập đến node heading
  let productStatisticHeading = document.querySelector('.statistic-product__desc');
  // Check nếu mảng thống kê là rỗng thì hiển thị thông báo không có data và fix text of heading
  if(productStatisticList.length == 0) {
    showNotifyStatistic(`There Are No Satistical Datas From ${dateFrom} To ${dateTo}`);
    productStatisticHeading.innerText = `There Are No Satistical Product Data From ${dateFrom} To ${dateTo}`;
    resetProductCanvas();
    resetTableNote();
  } else {
    // 1. Xét lại text của heading
  productStatisticHeading.innerText = `Top Best Selling Products From ${dateFrom} To ${dateTo}`;
  // 2. Load lại biểu đồ thống kê
  drawProductStatisticChart(productStatisticList);
  // 3. Reset lại bảng chú thích
  // 3.1. Truy cập đến node table
  let nodeTable = document.querySelector('.table-note');
  // 3.2. Tạo htmlstring của table
  // Tạo htmlstring for rows
  let htmlRows = '';
  for(let i = 0; i < productStatisticList.length; i++) {
    let productStatistic = productStatisticList[i];
    if(i == 10) {
      break;
    }
    htmlRows += `
    <tr class="table-note__tr table-note__tr--animation">
      <td class="table-note__td">${i + 1}</td>
      <td class="table-note__td">${productStatistic.productId}</td>
      <td class="table-note__td">${getProduct(productStatistic.productId).name}</td>
    </tr>
    `;
  }
  // Tạo htmlstring for table
  let htmlTable = `
  <thead class="table-note__thead">
  <th class="table-note__th">Num</th>
  <th class="table-note__th">Product Id</th>
  <th class="table-note__th">Product Name</th>
  </thead>
  <tbody class="table-note__tbody">
    ${htmlRows}
  </tbody>
  `;
  // 3.3. Add htmlstring vào node vừa truy cập
  nodeTable.innerHTML = htmlTable;
  }
}

// Yêu cầu: Xét ngày tháng năm hiện tại default cho 2 ô input date của product brand
var setDateDefaultForProductStatisticInputs = () => {
  inputProductDate1.value = getDateNow();
  inputProductDate2.value = getDateNow();
}

// Yêu cầu: Khi một trong hai input date thay đổi thì xét, nếu dateFrom > dateTo: load lại dữ liệu trên màn hình thống kê, ngược lại thì show ErrInvalidDate
var eventForProductStatisticInput = () => {
  inputProductDate1.addEventListener('input', function () {
    let date1 = new Date(`${this.value}`);
    let date2 = new Date(`${inputProductDate2.value}`);
    if (date1 > date2) {
      showErrorInvalidDate();
    } else {
      showProductStatisticToUI();
    }
  })

  inputProductDate2.addEventListener('input', function () {
    let date2 = new Date(`${this.value}`);
    let date1 = new Date(`${inputProductDate1.value}`);
    if (date1 > date2) {
      showErrorInvalidDate();
    } else {
      showProductStatisticToUI();
    }
  })
}

