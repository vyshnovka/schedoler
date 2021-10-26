var today = new Date();
var tempDate = new Date();
var parent;
var userName = require("electron").remote.getGlobal("user").name;
var category;
var display;

const day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

document.getElementById('today').innerHTML = day[today.getDay()] + ", " + month[today.getMonth()] + " " + today.getDate(); //big today's date

function rebuildContent(callback, arg1, arg2) {
    parent = document.getElementById('content');

    var clearParent = document.createElement('div');
    clearParent.id = "content";
    clearParent.className = "content";

    parent.replaceWith(clearParent);
    parent = clearParent;

    callback(arg1, arg2);
};

function setCategory(newCategory, element) {
    document.getElementsByClassName("choosenLeft")[0].className = "option";
    element.className = "choosenLeft";
    category = newCategory;
    display();
};

function changeDisplay(element) {
    document.getElementsByClassName("choosenTop")[0].className = "displayButton";
    element.className = "choosenTop";
}

function next() {
    if (display == showWeek) {
        tempDate.setDate(tempDate.getDate() + 7);
        showWeek();
    }
    else if (display == showMonth) {
        tempDate.setMonth(tempDate.getMonth() + 1);
        showMonth();
    }
    else {
        tempDate.setDate(tempDate.getDate() + 1);
        showDay();
    }
}

function prev() {
    if (display == showWeek) {
        tempDate.setDate(tempDate.getDate() - 7);
        showWeek();
    }
    else if (display == showMonth) {
        tempDate.setMonth(tempDate.getMonth() - 1);
        showMonth();
    }
    else {
        tempDate.setDate(tempDate.getDate() - 1);
        showDay();
    }
}

showWeek();