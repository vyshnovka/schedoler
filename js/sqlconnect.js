const sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database(require("electron").remote.getGlobal("user").indexJS + '/sqlite/database.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    else {
        console.log("Database connection: success...");
    }
});