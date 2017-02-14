/* jshint esversion: 6 */
/* jshint node: true */

'use strict';

// Change these to customize the app
var url = 'your-url-here.com';
var height = 750;
var width = 1200;

// Everything below this should be the same for most apps
var electron = require('electron');
var path = require('path');
var Menu = electron.Menu;
var app = electron.app;
var appName = app.getName();
var browserWindow = electron.BrowserWindow;
var appIcon = path.join(__dirname, 'images', 'app.png');
var ipc = electron.ipcMain;
var mainWindow;
var isQuitting = false;

function createMainWindow() {
  var win = new electron.BrowserWindow({
    title: appName,
    show: false,
    height: height,
    width: width,
    icon: appIcon,
    webPreferences: {
      nodeIntegration: false, // fails without this because of CommonJS script detection
      preload: path.join(__dirname, 'js', 'browser.js'),
      plugins: true,
      webSecurity: false,
    },
  });

  win.loadURL(url);

  return win;
}

function showAndCenter(win) {
  center(win);
  win.show();
  win.focus();
}

function center(win) {
  var electronScreen = electron.screen;
  var size = electronScreen.getPrimaryDisplay().workAreaSize;
  var x = Math.round(size.width / 2 - width / 2);
  var y = Math.round(size.height / 2 - height / 2);
  win.setPosition(x, y);
}

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  mainWindow = createMainWindow();

  var page = mainWindow.webContents;

  page.on('dom-ready', () => {
    showAndCenter(mainWindow);
  });

  page.on('new-window', (e, url) => {
    e.preventDefault();
    electron.shell.openExternal(url);
  });
});

app.on('activate', () => {
  showAndCenter(mainWindow);
});

ipc.on('notification-click', () => {
  showAndCenter(mainWindow);
});
