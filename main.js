const electron      = require('electron');
const app           = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain       = require('electron').ipcMain;

var mainWindow = null;

app.on('ready', function() {
    mainWindow = new BrowserWindow({width: 300,
         height: 740,
         frame: false,
         transparent: true,
         resizable: false
    });
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.setPosition(1060, 0);
    mainWindow.setVisibleOnAllWorkspaces(true);

    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});
