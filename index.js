const path = require('path');
const url = require('url');
const {app, BrowserWindow} = require('electron');

let win;
global.user = {
    name: null,
    indexJS: __dirname
};

function createWindow() {
    win = new BrowserWindow({
        width: 1280, 
        height: 720, 
        minWidth: 800,
        minHeight: 600,
        icon: __dirname + "/img/icon.png",
        webPreferences: {
            nodeIntegration: true,
        }
    });

    //win.webContents.openDevTools();
    win.setMenu(null);

    win.loadURL(url.format({
        pathname: path.join(__dirname, "/html/login.html"),
        protocol: 'file:',
        slashes: true
    }));

    win.on('closed', () => {
        win = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    app.quit();
});