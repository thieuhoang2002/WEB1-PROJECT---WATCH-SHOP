const count_group = document.getElementsByClassName('item');
const active = 0;
const begin = true;
const nextbtn = document.getElementsByClassName('icon2');
const prevbtn = document.getElementsByClassName('icon1');

function Loadprev() {
    nextbtn[0].classList.remove('hidebtn');
    count_group[0].classList.remove('hide');
    count_group[0].classList.add('active');
    count_group[1].classList.add('hide');
    prevbtn[0].classList.add('hidebtn');
}

function Loadnext() {
    prevbtn[0].classList.remove('hidebtn');
    count_group[0].classList.remove('active');
    count_group[0].classList.add('hide');
    count_group[1].classList.remove('hide');
    count_group[1].classList.add('active');
    nextbtn[0].classList.add('hidebtn');
}

/*1*/
const brandimgtitle = document.getElementsByClassName('title-brand1');
const brandimg = document.getElementsByClassName('brand-img1');

function active_img() {
    active_Title();
    brandimg[0].classList.add('brand-img-active');
}
function hide_img() {
    hide_Title();
    brandimg[0].classList.remove('brand-img-active');
}
function active_Title() {
    brandimgtitle[0].classList.add('brand-img-title-active');
}
function hide_Title() {
    brandimgtitle[0].classList.remove('brand-img-title-active');
}
/*1*/

/*2*/
function active_img2() {
    active_Title2();
    brandimg[1].classList.add('brand-img-active');
}
function hide_img2() {
    hide_Title2();
    brandimg[1].classList.remove('brand-img-active');
}
function active_Title2() {
    brandimgtitle[1].classList.add('brand-img-title-active');
}
function hide_Title2() {
    brandimgtitle[1].classList.remove('brand-img-title-active');
}
/*2*/
/*3*/
function active_img3() {
    active_Title3();
    brandimg[2].classList.add('brand-img-active');
}
function hide_img3() {
    hide_Title3();
    brandimg[2].classList.remove('brand-img-active');
}
function active_Title3() {
    brandimgtitle[2].classList.add('brand-img-title-active');
}
function hide_Title3() {
    brandimgtitle[2].classList.remove('brand-img-title-active');
}
/*3*/
/*4*/
function active_img4() {
    active_Title4();
    brandimg[3].classList.add('brand-img-active');
}
function hide_img4() {
    hide_Title4();
    brandimg[3].classList.remove('brand-img-active');
}
function active_Title4() {
    brandimgtitle[3].classList.add('brand-img-title-active');
}
function hide_Title4() {
    brandimgtitle[3].classList.remove('brand-img-title-active');
}
/*4*/
/*5*/
function active_img5() {
    active_Title5();
    brandimg[4].classList.add('brand-img-active');
}
function hide_img5() {
    hide_Title5();
    brandimg[4].classList.remove('brand-img-active');
}
function active_Title5() {
    brandimgtitle[4].classList.add('brand-img-title-active');
}
function hide_Title5() {
    brandimgtitle[4].classList.remove('brand-img-title-active');
}
/*5*/
/*6*/
function active_img6() {
    active_Title6();
    brandimg[5].classList.add('brand-img-active');
}
function hide_img6() {
    hide_Title6();
    brandimg[5].classList.remove('brand-img-active');
}
function active_Title6() {
    brandimgtitle[5].classList.add('brand-img-title-active');
}
function hide_Title6() {
    brandimgtitle[5].classList.remove('brand-img-title-active');
}
/*6*/
/*7*/
function active_img7() {
    active_Title7();
    brandimg[6].classList.add('brand-img-active');
}
function hide_img7() {
    hide_Title7();
    brandimg[6].classList.remove('brand-img-active');
}
function active_Title7() {
    brandimgtitle[6].classList.add('brand-img-title-active');
}
function hide_Title7() {
    brandimgtitle[6].classList.remove('brand-img-title-active');
}
/*7*/
/*8*/
function active_img8() {
    active_Title8();
    brandimg[7].classList.add('brand-img-active');
}
function hide_img8() {
    hide_Title8();
    brandimg[7].classList.remove('brand-img-active');
}
function active_Title8() {
    brandimgtitle[7].classList.add('brand-img-title-active');
}
function hide_Title8() {
    brandimgtitle[7].classList.remove('brand-img-title-active');
}
/*8*/

/*close hotlines*/

const closebtn = document.getElementsByClassName('close-hotlines');
const hotlines = document.getElementsByClassName('hotlines');
const openbtn = document.getElementsByClassName('open-hotlines');

function closehotlines() {
    hotlines[0].classList.remove('active-open-hotline');
    hotlines[0].classList.add('active-close-hotline');
    closebtn[0].classList.add('hide-btnclosehotlines');
    openbtn[0].classList.add('active-btnopenhotlines');
}

function onpenhotlines() {
    hotlines[0].classList.remove('active-close-hotline');
    hotlines[0].classList.add('active-open-hotline');
    closebtn[0].classList.remove('hide-btnclosehotlines');
    closebtn[0].classList.add('active-btnclosehotlines');
    openbtn[0].classList.remove('active-btnopenhotlines');
}

/**sự kiện cho nút ontoppage */

/**sự kiện nút ontoppage */
//Get the button
var btn_ontoppage = document.getElementById('btn_ontoppage');

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btn_ontoppage.style.display = "block";
    } else {
        btn_ontoppage.style.display = "none";
    }
}