const { app, BrowserWindow } = require('electron');
const path = require('path');
const windowStateKeeper = require("electron-window-state");
let win;

function createWindow () {
  const mainWindowState = windowStateKeeper({
    defaultHeight: 800,
    defaultWidth: 800,
  });


  // Create the browser window.
  win = new BrowserWindow({
    x: mainWindowState.x,
    y: mainWindowState.y,
    width: mainWindowState.width,
    height: mainWindowState.height,
    webPreferences: {
      nodeIntegration: true
    }
  })

  //load the index.html from a url LOCAL
  // win.loadURL('http://localhost:3000/');

  //load with file IN PROD
  win.loadURL('file://' + path.join(__dirname, '../build/index.html#/'));

  // Open the DevTools.
  win.webContents.openDevTools();
  mainWindowState.manage(win);
}

// This method will be called when Electron has finished initialization and is ready to create browser windows.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {  
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('before-quit', (e) => {
  console.warn("before-quit fired :: ");
  // e.preventDefault(); // this will not allow application to get quit. because before app quit, this will set its state to default.
});
