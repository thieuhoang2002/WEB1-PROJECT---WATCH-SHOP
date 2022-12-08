// Khi trang web được load thì tiến hành load cac js can thiet
let body = document.querySelector('body');
body.onload = function () {
    // Side bar
    sideBarJS();
    sideBarUIProcessJS();

    // Set ngày tháng năm hiện tại mặc định cho các ô input date của các ui statistic và order
    setDateDefaultForBrandStatisticInputs();
    setDateDefaultForProductStatisticInputs();
    setDateDefaultForOrderInputs();
}


