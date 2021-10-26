var flag = 0;

function hamburger() {
    if (!flag) {
      document.getElementById('leftmenu').classList.remove('leftclose');
      document.getElementById('backmenu').style.display = "block";
      flag = 1;
    }
    else {
      document.getElementById('leftmenu').classList.add('leftclose');
      document.getElementById('backmenu').style.display = "none";
      flag = 0;
    }
}