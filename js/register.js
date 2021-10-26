function userRegister() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    db.get("SELECT count(*) number FROM users where email = ?", [email], function (err, row) {
        if (err) {
            console.log(err.message);
        }
        else if (row.number == 0) {
            db.run("INSERT INTO users(name, email, password) VALUES(?, ?, ?)", [name, email, password], function (err) {
                if (err) {
                    console.log(err.message);
                }
                else {
                    require("electron").remote.getGlobal("user").name = name;
                    location.href = require("electron").remote.getGlobal("user").indexJS + '/html/menu.html';
                }
            });
        }
        else {
            document.getElementById('email').style.borderBottomColor = "#a81c28";
            document.getElementById('email').title = "This email is already taken.";
        }
    });
};