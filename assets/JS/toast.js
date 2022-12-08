function toast({type, desc}) {
    // 1. Truy cập tới node chứa toast
    let main = document.getElementById('toast');

    // 2. Tạo htmlString cho một toast
    const icons = {
        success: '<i class="fa-solid fa-check"></i>',
        error: '<i class="fa-solid fa-xmark"></i>',
        notify: '<i class="ti-bell"></i>'
    };

    var htmlToast =  `
    <div class="toast toast--${type}">
        <div class="toast__icon">
            ${icons[type]}
        </div>
        <div class="toast__desc">${desc}</div>
    </div>`;

    // 3. InnerHtml string vừa tạo vào node đã truy cập
    main.innerHTML = htmlToast;
}

function showSuccessToast () {
    toast({
        type: "success",
        desc: "Your Product Was Added To The Database"
    });
}

var showErrorToast = () => {
    toast({
        type: "error",
        desc: "Invalid Information! Please check again!"
    });
}

var showSuccessToastEdit = () => {
    toast({
        type: 'success',
        desc: 'This Product Was Edited To The Database'
    });
}

var showSuccesToastDelete = (desc) => {
    toast({
        type: 'success',
        desc: desc
    });
}

var showErrorInvalidDate = () => {
    toast({
        type: 'error',
        desc: 'Start Date Must Be Less Than Or Equal To End Date'
    });
}

var showNotifyStatistic = (notify) => {
    toast({
        type: 'notify',
        desc: `${notify}`
    });
}