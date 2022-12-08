// Fill Brands
if(localStorage.getItem(keyBrandList) == null) {
    var brand1 = createBrand('Casio', 'casio');
    var brand2 = createBrand('Orient', 'orient');
    var brand3 = createBrand('Citizen', 'citizen');
    var brand4 = createBrand('Seiko', 'seiko');
    
    var brandList = new Array();
    
    brandList.push(brand1);
    brandList.push(brand2);
    brandList.push(brand3);
    brandList.push(brand4); 
    saveBrandListToLocalStorage(brandList);
}

// Fill Products
if(localStorage.getItem(keyProductList) == null) {
    // Casio brand
    var casio1 = createProduct('Casio AE-1200WHD-1AVDF Men Quartz', '../assets/img/products/Casio/AE-1200WHD-1AVDF-3-1.jpg', 50, 1308000, 'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers', 'casio', 'W3834_1665879975641');
    var casio2 = createProduct('Casio AE-1000W-2AVDF Men Quartz', '../assets/img/products/Casio/casio-ae-1000w-2avdf.jpg', 50, 987000, 'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers', 'casio', 'W0925_1665879975642');
    var casio3 = createProduct('Casio G-SHOCK GA-120-1ADR Men Quartz', '../assets/img/products/Casio/casio-ga-120-1adr.jpg', 50, 4612000, 'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers', 'casio', 'W4695_1665879975643');
    var casio4 = createProduct('Casio G-SHOCK GA-700VB-1ADR Men Quartz', '../assets/img/products/Casio/casio-GA-700VB-1ADR-1.jpg', 50, 3809000, 'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers', 'casio', 'W4011_1665879975644');
    var casio5 = createProduct('Casio G-SHOCK GA-2100VB-1ADR Men Quartz', '../assets/img/products/Casio/casio-GA-2100VB-1ADR-1.jpg', 50, 3628000, 'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers', 'casio', 'W1216_1665879975645');
    var casio6 = createProduct('Casio G-SHOCK GA-2200M-1ADR Men Quartz', '../assets/img/products/Casio/casio-GA-2200M-1ADR-1.jpg', 50, 4638000, 'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers', 'casio', 'W5922_1665879975646');
    var casio7 = createProduct('Casio G-SHOCK DW-5600BB-1DR Men Quartz', '../assets/img/products/Casio/casio-g-shock-DW-5600BBN-1DR.jpg', 50, 3524000, 'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers', 'casio', 'W1549_1665879975647');
    var casio8 = createProduct('Casio MTP-VT01L-1BUDF Men Quartz', '../assets/img/products/Casio/Casio-MTP-VT01L-1BUDF.jpg', 50, 1036000, 'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers', 'casio', 'W4179_1665879975648');
    var casio9 = createProduct('Casio MTP-1374L-1AVDF Men Quartz', '../assets/img/products/Casio/dong-ho-casio-mtp-1374l-1avdf-nam-pin-day-da-a.jpg', 50, 1999000, 'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers', 'casio', 'W9373_1665879975649');
    var casio10 = createProduct('Casio MTP-E321L-1AVDF Men Quartz', '../assets/img/products/Casio/MTP-E321L-1AVDF-1.jpg', 50, 2739000, 'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers', 'casio', 'W0965_1665879975650');
    var casio11 = createProduct('Casio MTP-VD01BL-5BVUDF Men Quartz', '../assets/img/products/Casio/MTP-VD01BL-5BVUDF-1.jpeg', 50, 1184000, 'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers', 'casio', 'W7630_1665879975651');
    var casio12 = createProduct('Casio MTP-VD300BL-1EUDF Men Quartz', '../assets/img/products/Casio/MTP-VD300BL-1EUDF-1.jpg', 50, 1727000, 'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers', 'casio', 'W9141_1665879975652');
    
    var productList = new Array();
    productList.push(casio1);
    productList.push(casio2);
    productList.push(casio3);
    productList.push(casio4);
    productList.push(casio5);
    productList.push(casio6);
    productList.push(casio7);
    productList.push(casio8);
    productList.push(casio9);
    productList.push(casio10);
    productList.push(casio11);
    productList.push(casio12);
    
    var orient1 = createProduct('Orient FAG00004D0 Auto Mechanical Men', '../assets/img/products/Orient/orient-fag00004d0.jpg', 40, 8050000,'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers' ,'orient', 'W5406_1665879975653');
    var orient2 = createProduct('Orient FGW01004A0 Men Quartz', '../assets/img/products/Orient/orient-FGW01004A0.jpg', 40, 4160000,'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers' ,'orient', 'W9533_1665879975654');
    var orient3 = createProduct('Orient FGW03005W0 Men Quartz', '../assets/img/products/Orient/orient-FGW03005W0.jpg', 40, 4260000,'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers' ,'orient', 'W8696_1665879975655');
    var orient4 = createProduct('Orient FKU00003W0 Men Quartz', '../assets/img/products/Orient/orient-fku00003w0.jpg', 40, 4610000,'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers' ,'orient', 'W1676_1665879975656');
    var orient5 = createProduct('Orient FUNG2003B0 Men Quartz', '../assets/img/products/Orient/orient-FUNG2003B0.jpg', 40, 3260000,'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers' ,'orient', 'W2720_1665879975657');
    var orient6 = createProduct('Orient RA-AA0B02R19B Auto Mechanical Men', '../assets/img/products/Orient/orient-RA-AA0B02R19B.jpg', 40, 7800000,'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers' ,'orient', 'W3759_1665879975658');
    var orient7 = createProduct('Orient RA-AC0F06L10B Auto Mechanical Men', '../assets/img/products/Orient/orient-RA-AC0F06L10B.jpg', 40, 5880000,'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers' ,'orient', 'W8676_1665879975659');
    var orient8 = createProduct('Orient RA-AC0J05L10B Auto Mechanical Men', '../assets/img/products/Orient/orient-RA-AC0J05L10B-1.jpg', 40, 7480000,'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers' ,'orient', 'W2979_1665879975660');
    var orient9 = createProduct('Orient RE-AV0B03B00B Auto Mechanical Men', '../assets/img/products/Orient/orient-RE-AV0B03B00B-1.jpg', 40, 25730000,'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers' ,'orient', 'W3312_1665879975661');
    var orient10 = createProduct('Orient SUNE5005W0 Men Quartz', '../assets/img/products/Orient/orient-SUNE5005W0.jpg', 40, 3080000,'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers' ,'orient', 'W7477_1665879975662');
    
    productList.push(orient1);
    productList.push(orient2);
    productList.push(orient3);
    productList.push(orient4);
    productList.push(orient5);
    productList.push(orient6);
    productList.push(orient7);
    productList.push(orient8);
    productList.push(orient9);
    productList.push(orient10);
    
    var citizen1 = createProduct('Citizen AN8195-58E Men Quartz', '../assets/img/products/Citizen/citizen-AN8195-58E-1.jpg', 50, 5630000, 'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers', 'citizen', 'W0489_1665879975663');
    var citizen2 = createProduct('Citizen BE9170-05L Men Quartz', '../assets/img/products/Citizen/citizen-BE9170-05L.jpg', 50, 3700000, 'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers', 'citizen', 'W7573_1665879975664');
    var citizen3 = createProduct('Citizen BE9173-07X Men Quartz', '../assets/img/products/Citizen/citizen-BE9173-07X.jpg', 50, 3950000, 'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers', 'citizen', 'W8173_1665879975665');
    var citizen4 = createProduct('Citizen BE9180-52E Men Quartz', '../assets/img/products/Citizen/citizen-BE9180-52E.jpg', 50, 3780000, 'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers', 'citizen', 'W3640_1665879975666');
    var citizen5 = createProduct('Citizen BE9187-53E Men Quartz', '../assets/img/products/Citizen/citizen-BE9187-53E.jpg', 50, 4600000, 'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers', 'citizen', 'W2549_1665879975667');
    var citizen6 = createProduct('Citizen BH5000-08A Men Quartz', '../assets/img/products/Citizen/citizen-BH5000-08A.jpg', 50, 2900000, 'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers', 'citizen', 'W0474_1665879975668');
    var citizen7 = createProduct('Citizen NH8353-00H Auto Mechanical Men', '../assets/img/products/Citizen/citizen-NH8353-00H-1.jpg', 50, 5500000, 'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers', 'citizen', 'W7196_1665879975669');
    var citizen8 = createProduct('Citizen NH8360-80J Auto Mechanical Men', '../assets/img/products/Citizen/citizen-NH8360-80J-1.jpg', 50, 6090000, 'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers', 'citizen', 'W4977_1665879975670');
    var citizen9 = createProduct('Citizen NH8370-86E Auto Mechanical Men', '../assets/img/products/Citizen/citizen-NH8370-86E.jpg', 50, 5300000, 'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers', 'citizen', 'W0736_1665879975671');
    var citizen10 = createProduct('Citizen NP1010-01L Auto Mechanical Men', '../assets/img/products/Citizen/Citizen-NP1010-01L.jpg', 50, 12200000, 'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers', 'citizen', 'W9708_1665879975672');
    
    productList.push(citizen1);
    productList.push(citizen2);
    productList.push(citizen3);
    productList.push(citizen4);
    productList.push(citizen5);
    productList.push(citizen6);
    productList.push(citizen7);
    productList.push(citizen8);
    productList.push(citizen9);
    productList.push(citizen10);
    
    var seiko1 = createProduct('Seiko 5 Sports SRPD53K1 Auto Mechanical Men', '../assets/img/products/Seiko/seiko-5-SRPD53K1.jpg', 40, 6689000, 'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers', 'seiko', 'W3474_1665879975673');
    var seiko2 = createProduct('Seiko 5 Sports SRPD59K1 Auto Mechanical Men', '../assets/img/products/Seiko/seiko-5-SRPD59K1.jpg', 40, 6689000, 'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers', 'seiko', 'W9239_1665879975674');
    var seiko3 = createProduct('Seiko 5 Sports SRPD69K1 Auto Mechanical Men', '../assets/img/products/Seiko/seiko-5-SRPD69K1.jpg', 40, 8370000, 'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers', 'seiko', 'W4138_1665879975675');
    var seiko4 = createProduct('Seiko 5 Sports SRPD76K1 Auto Mechanical Men', '../assets/img/products/Seiko/seiko-5-SRPD76K1.jpg', 40, 8370000, 'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers', 'seiko', 'W7159_1665879975676');
    var seiko5 = createProduct('Seiko 5 Sports SRPD79K1 Auto Mechanical Men', '../assets/img/products/Seiko/seiko-5-SRPD79K1.jpg', 40, 7648000, 'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers', 'seiko', 'W0543_1665879975677');
    var seiko6 = createProduct('Seiko 5 Sports SRPD81K1 Auto Mechanical Men', '../assets/img/products/Seiko/seiko-5-SRPD81K1.jpg', 40, 7648000, 'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers', 'seiko', 'W7563_1665879975678');
    var seiko7 = createProduct('Seiko SRPD85K1S Auto Mechanical Men', '../assets/img/products/Seiko/seiko-5-SRPD85K1.jpg', 40, 7656000, 'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers', 'seiko', 'W0588_1665879975679');
    var seiko8 = createProduct('Seiko SRPE27K1S Auto Mechanical Men', '../assets/img/products/Seiko/seiko-SRPE27K1S.jpg', 40, 12864000, 'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers', 'seiko', 'W8741_1665879975680');
    var seiko9 = createProduct('Seiko SRPE31K1S Auto Mechanical Men', '../assets/img/products/Seiko/seiko-SRPE31K1S.jpg', 40, 14400000, 'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers', 'seiko', 'W9526_1665879975681');
    var seiko10 = createProduct('Seiko SRPE61K1S Auto Mechanical Men', '../assets/img/products/Seiko/seiko-SRPE61K1S.jpg', 40, 6456000, 'Electronic clock with analog, multi-function time. Light material, durable, comfortable to use. Design masculine, youthful and dynamic, suitable for many styles. High quality Japanese movement. Cheap price, suitable for all customers', 'seiko', 'W1449_1665879975682');
    
    productList.push(seiko1);
    productList.push(seiko2);
    productList.push(seiko3);
    productList.push(seiko4);
    productList.push(seiko5);
    productList.push(seiko6);
    productList.push(seiko7);
    productList.push(seiko8);
    productList.push(seiko9);
    productList.push(seiko10);
    
    saveProductListToLocalStorage(productList);
}

// Fill users
if(localStorage.getItem(keyUserList) == null) {
    var user1 = createUser("Võ Văn Hùng", "521/91E CMT8, P13, Q10, HCM", "0907604514", "admin123", "admin123", "admin", 'U3577_1665879975643');
    var user2 = createUser("Thiều Việt Hoàng", "521/91E CMT8, P13, Q10, HCM", "0327794828", "hoang123", "hoang123", "user", 'U1053_1665879975643');
    var user3 = createUser("Đặng Huỳnh Như Y", "521/91E CMT8, P13, Q10, HCM", "0907504514", "nhuy123", "nhuy123", "user", 'U0421_1665879975643');
    var user4 = createUser("Võ Quang Đăng Khoa", "521/91E CMT8, P13, Q10, HCM", "0327794826", "khoavo123", "khoavo123", "user", 'U8191_1665879975643');
    var user5 = createUser("Đặng Tùng Uy", "521/91E CMT8, P13, Q10, HCM", "0907604518", "uy123", "uy123", "user", 'U9223_1665879975643');
    var user6 = createUser("Thiều Bảo Trâm", "521/91E CMT8, P13, Q10, HCM", "0327794827", "tram123", "tram123", "user", 'U6922_1665879975643');
    var user7 = createUser("Nguyễn Đăng Khoa", "521/91E CMT8, P13, Q10, HCM", "0907608514", "khoanguyen123", "khoanguyen123", "user", 'U6590_1665879975643');
    var user8 = createUser("Nguyễn Hoài Phúc", "521/91E CMT8, P13, Q10, HCM", "0327794849", "hoaiphuc123", "hoaiphuc123", "user", 'U1361_1665879975643');
    var user9 = createUser("Ngô Minh Hiếu", "521/91E CMT8, P13, Q10, HCM", "0907304514", "hieu123", "hieu123", "user", 'U3042_1665879975643');
    var user10 = createUser("Nguyễn Nhật Huy", "521/91E CMT8, P13, Q10, HCM", "0327794859", "huy123", "huy123", "user", 'U8837_1665879975643');
    var user11 = createUser("Nguyễn Thị Thúy Kiều", "521/91E CMT8, P13, Q10, HCM", "0907604574", "kieu123", "kieu123", "user", 'U0647_1665879975643');
    var user12 = createUser("Phạm Hồng Thúy Vân", "521/91E CMT8, P13, Q10, HCM", "0327794889", "thuyvan123", "thuyvan123", "user", 'U9697_1665879975643');

    var users = new Array();
    users.push(user1);
    users.push(user2);
    users.push(user3);
    users.push(user4);
    users.push(user5);
    users.push(user6);
    users.push(user7);
    users.push(user8);
    users.push(user9);
    users.push(user10);
    users.push(user11);
    users.push(user12);
    saveUserListToLocalStorage(users);
}

// Fill orders
if(localStorage.getItem(keyOrderList) == null) {
    var orders = [];
    var order1 = createOrder('U9697_1665879975643', '2022-10-14', '0327794828', '770 CTM8, P5, Q.TB, HCM', 34245000, true, 'O8217_1665881444808');
    var order2 = createOrder('U9697_1665879975643', '2022-10-14', '0327794828', '770 CTM8, P5, Q.TB, HCM', 5147000, false, 'O6719_1665881444809');
    var order3 = createOrder('U3577_1665879975643', '2022-10-12', '0907504514', 'Số 3, Thành Thái, Q10, HCM', 34245000, true, 'O9369_1665881444810');
    var order4 = createOrder('U3577_1665879975643', '2022-10-12', '0907504514', 'Số 3, Thành Thái, Q10, HCM', 5147000, true, 'O3397_1665881444811');
    var order5 = createOrder('U1053_1665879975643', '2022-10-12', '0907605789', '36, An Định A, Ba Chúc, Tri Tôn, An Giang', 34245000, true, 'O7250_1665881444812');
    var order6 = createOrder('U1053_1665879975643', '2022-10-12', '0907605789', '36, An Định A, Ba Chúc, Tri Tôn, An Giang', 5147000, true, 'O0442_1665881444813');
    var order7 = createOrder('U1053_1665879975643', '2022-10-12', '0907605789', '36, An Định A, Ba Chúc, Tri Tôn, An Giang', 34245000, true, 'O6333_1665881444814');
    var order8 = createOrder('U0421_1665879975643', '2022-10-12', '0907604519', '60 CTM8, P5, Q.TB, HCM', 5147000, true, 'O5138_1665881444815');
    var order9 = createOrder('U0421_1665879975643', '2022-10-12', '0907604519', '60 CTM8, P5, Q.TB, HCM', 34245000, true, 'O7046_1665881444816');
    var order10 = createOrder('U0421_1665879975643', '2022-10-12', '0907604519', '60 CTM8, P5, Q.TB, HCM', 5147000, true, 'O8426_1665881444817');
    var order11 = createOrder('U8191_1665879975643', '2022-07-15', '0906544231', 'Số 4, Cao Lỗ, P4, Q8, HCM', 50387000, true, 'O6211_1665881444818');
    var order12 = createOrder('U8191_1665879975643', '2022-04-13', '0906544231', 'Số 4, Cao Lỗ, P4, Q8, HCM', 50387000, true, 'O9813_1665881444819');

    orders.push(order1);
    orders.push(order2);
    orders.push(order3);
    orders.push(order4);
    orders.push(order5);
    orders.push(order6);
    orders.push(order7);
    orders.push(order8);
    orders.push(order9);
    orders.push(order10);
    orders.push(order11);
    orders.push(order12);

    saveOrderListToLocalStorage(orders);
}

// Fill order details
if(localStorage.getItem(keyDetailOrderList) == null) {
    // Order: O8217_1665881444808
    var detail1 = createDetailOrder('O8217_1665881444808', 'W3834_1665879975641', 2);
    var detail2 = createDetailOrder('O8217_1665881444808', 'W5406_1665879975653', 1);
    var detail3 = createDetailOrder('O8217_1665881444808', 'W0489_1665879975663', 3);
    var detail4 = createDetailOrder('O8217_1665881444808', 'W3474_1665879975673', 1);

    // Order: O6719_1665881444809
    var detail5 = createDetailOrder('O6719_1665881444809', 'W0925_1665879975642', 1);
    var detail6 = createDetailOrder('O6719_1665881444809', 'W9533_1665879975654', 1);

    // Order: O9369_1665881444810
    var detail7 = createDetailOrder('O9369_1665881444810', 'W3834_1665879975641', 2);
    var detail8 = createDetailOrder('O9369_1665881444810', 'W5406_1665879975653', 1);
    var detail9 = createDetailOrder('O9369_1665881444810', 'W0489_1665879975663', 3);
    var detail10 = createDetailOrder('O9369_1665881444810', 'W3474_1665879975673', 1);

    // Order: O3397_1665881444811
    var detail11 = createDetailOrder('O3397_1665881444811', 'W0925_1665879975642', 1);
    var detail12 = createDetailOrder('O3397_1665881444811', 'W9533_1665879975654', 1);

    // Order: O7250_1665881444812
    var detail13 = createDetailOrder('O7250_1665881444812', 'W3834_1665879975641', 2);
    var detail14 = createDetailOrder('O7250_1665881444812', 'W5406_1665879975653', 1);
    var detail15 = createDetailOrder('O7250_1665881444812', 'W0489_1665879975663', 3);
    var detail16 = createDetailOrder('O7250_1665881444812', 'W3474_1665879975673', 1);

    // Order: O0442_1665881444813
    var detail17 = createDetailOrder('O0442_1665881444813', 'W0925_1665879975642', 1);
    var detail18 = createDetailOrder('O0442_1665881444813', 'W9533_1665879975654', 1);

    // Order: O6333_1665881444814
    var detail19 = createDetailOrder('O6333_1665881444814', 'W3834_1665879975641', 2);
    var detail20 = createDetailOrder('O6333_1665881444814', 'W5406_1665879975653', 1);
    var detail21 = createDetailOrder('O6333_1665881444814', 'W0489_1665879975663', 3);
    var detail22 = createDetailOrder('O6333_1665881444814', 'W3474_1665879975673', 1);

    // Order: O5138_1665881444815
    var detail23 = createDetailOrder('O5138_1665881444815', 'W0925_1665879975642', 1);
    var detail24 = createDetailOrder('O5138_1665881444815', 'W9533_1665879975654', 1);

    // Order: O7046_1665881444816
    var detail25 = createDetailOrder('O7046_1665881444816', 'W3834_1665879975641', 2);
    var detail26 = createDetailOrder('O7046_1665881444816', 'W5406_1665879975653', 1);
    var detail27 = createDetailOrder('O7046_1665881444816', 'W0489_1665879975663', 3);
    var detail28 = createDetailOrder('O7046_1665881444816', 'W3474_1665879975673', 1);

    // Order: O8426_1665881444817
    var detail29 = createDetailOrder('O8426_1665881444817', 'W0925_1665879975642', 1);
    var detail30 = createDetailOrder('O8426_1665881444817', 'W9533_1665879975654', 1);

    // Order: O6211_1665881444818
    var detail31 = createDetailOrder('O6211_1665881444818', 'W9141_1665879975652', 2);
    var detail32 = createDetailOrder('O6211_1665881444818', 'W7630_1665879975651', 1);
    var detail33 = createDetailOrder('O6211_1665881444818', 'W2549_1665879975667', 3);
    var detail34 = createDetailOrder('O6211_1665881444818', 'W4138_1665879975675', 1);
    var detail35 = createDetailOrder('O6211_1665881444818', 'W0489_1665879975663', 3);
    var detail36 = createDetailOrder('O6211_1665881444818', 'W3474_1665879975673', 1);

    // Order: O9813_1665881444819
    var detail37 = createDetailOrder('O9813_1665881444819', 'W9141_1665879975652', 2);
    var detail38 = createDetailOrder('O9813_1665881444819', 'W7630_1665879975651', 1);
    var detail39 = createDetailOrder('O9813_1665881444819', 'W2549_1665879975667', 3);
    var detail40 = createDetailOrder('O9813_1665881444819', 'W4138_1665879975675', 1);
    var detail41 = createDetailOrder('O9813_1665881444819', 'W0489_1665879975663', 3);
    var detail42 = createDetailOrder('O9813_1665881444819', 'W3474_1665879975673', 1);

    var orderDetails = [];
    orderDetails.push(detail1);
    orderDetails.push(detail2);
    orderDetails.push(detail3);
    orderDetails.push(detail4);
    orderDetails.push(detail5);
    orderDetails.push(detail6);
    orderDetails.push(detail7);
    orderDetails.push(detail8);
    orderDetails.push(detail9);
    orderDetails.push(detail10);
    orderDetails.push(detail11);
    orderDetails.push(detail12);
    orderDetails.push(detail13);
    orderDetails.push(detail14);
    orderDetails.push(detail15);
    orderDetails.push(detail16);
    orderDetails.push(detail17);
    orderDetails.push(detail18);
    orderDetails.push(detail19);
    orderDetails.push(detail20);
    orderDetails.push(detail21);
    orderDetails.push(detail22);
    orderDetails.push(detail23);
    orderDetails.push(detail24);
    orderDetails.push(detail25);
    orderDetails.push(detail26);
    orderDetails.push(detail27);
    orderDetails.push(detail28);
    orderDetails.push(detail29);
    orderDetails.push(detail30);
    orderDetails.push(detail31);
    orderDetails.push(detail32);
    orderDetails.push(detail33);
    orderDetails.push(detail34);
    orderDetails.push(detail35);
    orderDetails.push(detail36);
    orderDetails.push(detail37);
    orderDetails.push(detail38);
    orderDetails.push(detail39);
    orderDetails.push(detail40);
    orderDetails.push(detail41);
    orderDetails.push(detail42);

    saveDetailOrderListToLocalStorage(orderDetails);

}