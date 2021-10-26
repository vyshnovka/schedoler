function userLogin() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    db.get("SELECT name FROM users where email = ? and password = ?", [email, password], function(err, row) {
        if (err) {
            console.log(err.message);        
        }
        else if (row) {
            require("electron").remote.getGlobal("user").name = row.name;
            location.href = require("electron").remote.getGlobal("user").indexJS + '/html/menu.html'; 
        }
        else {
            document.getElementById('email').style.borderBottomColor = "#a81c28";
            document.getElementById('email').title = "Login and password entered do not match.";
            document.getElementById('password').style.borderBottomColor = "#a81c28";
            document.getElementById('password').title = "Login and password entered do not match.";
        }
    });
};