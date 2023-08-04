const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('app', {
  setTitle: (title) =>{
     ipcRenderer.send('set-title', title)
  },
  sendNotification: (msg) => {
    console.log('preload msg',msg)
    ipcRenderer.send('notify',msg)
  },
  getBatteryPercent: async (callback)=>{
    console.log('subscribed to battery percent')
      ipcRenderer.on('battery-level',(e,level)=>{
        console.log('preload battery level',level)
        callback(e,level)
      })

      return await ipcRenderer.invoke('get-battery-level')
  }
})