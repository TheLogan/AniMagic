// @ts-ignore
let { app, BrowserWindow } = require('electron')
const path = require('path');
const isDev = require('electron-is-dev');

let win = null;
function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            nodeIntegration: true
        }
    })
    console.log('start up');
    win.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);

}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    console.log('shut down');
    if (process.platform !== 'darwin') {
        app.quit();
    }
});


app.on('activate', () => {
    if (win == null) {
        createWindow();
    }
});