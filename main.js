'use strict';

const electron      = require('electron');
const app           = electron.app;
const BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

app.on('ready', function() {
    console.log(__dirname);
    mainWindow = new BrowserWindow({width: 300,
         height: 725,
         frame: false,
         transparent: true,
         resizable: false
     });
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.setPosition(1060, 0);

    mainWindow.on('closed', function() {
        mainWindow = null;
    })

});
