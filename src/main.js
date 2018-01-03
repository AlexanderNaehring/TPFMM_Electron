'use strict';
const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path')
const url = require('url')

// keep global reference (otherwise closed when garbage collected)
let mainWindow

function init() {

  mainWindow = new BrowserWindow({minWidth: 600, minHeight: 500})

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'main.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })



}

// make app single instance
let running = app.makeSingleInstance((argv, workingDirectory) => {
  // function receives signal when second instance is started
  // restore and focus current instance window
  if(mainWindow) {
    if(mainWindow.isMinimized())
      mainWindow.restore();
    mainWindow.focus();
  }

  // handle parameters
  // TODO
  argv.forEach((element) => {
    console.log(element);
  });
});

if (running) {
  app.quit();
  return;
}



// App Event Handlers
app.on('ready', init)

app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    init()
  } else {
    mainWindow.restore();
    mainWindow.focus();
  }
})
