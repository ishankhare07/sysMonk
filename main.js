'use strict';

const electron      = require('electron');
const app           = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = require('electron').ipcMain;

var mainWindow = null;

app.on('ready', function() {
    mainWindow = new BrowserWindow({width: 300,
         height: 735,
         frame: false,
         transparent: true,
         resizable: false
     });
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.setPosition(1060, 20);

    mainWindow.on('closed', function() {
        mainWindow = null;
    })
});


ipcMain.on('asynchronous-message', function(event, arg) {
    event.sender.send('asynchronous-reply', {
        'type': 'cpuUsage',
        'cpuId': arg.cpuId,
        'value': 50
    })
});
