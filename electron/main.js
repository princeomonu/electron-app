// main.js

// Modules to control application life and create native browser window
const { app,ipcMain, BrowserWindow,Notification,powerMonitor } = require('electron')
const path = require('path')
const batteryLevel = require('battery-level')

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar:true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadURL("http://localhost:3000")

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  return mainWindow
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  const mainWindow = createWindow()

  ipcMain.handle('get-battery-level', async (e)=>{

    setInterval(()=>{
      batteryLevel().then(level=>{
        console.log('battery level',level)
        mainWindow.webContents.send('battery-level',level*100)
      })
    },5*1000)

    const level = await batteryLevel()
    return  level*100
  })


  ipcMain.on('set-title', (event, title) => {
    console.log('setting title....')
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    win.setTitle(title)
  })

  ipcMain.on('notify', (event, msg) => {
    console.log('notify:',msg)
    const notification = new Notification({
      title: 'Lhezie App',
      body: msg,
      icon: path.join(__dirname, 'icon.png') // Path to your app icon
    });
  
    notification.show();
  })

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.