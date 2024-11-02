const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ping: () => ipcRenderer.invoke('ping')
    // we can also expose variables, not just functions
})

contextBridge.exposeInMainWorld('app', {
    isWindowed: false,
    isMinimized: false,
    isMaximized: false,
    dependencies: {
        node: process.versions.node,
        chrome: process.versions.chrome,
        electron: process.versions.electron
    }
})

// if this exists (typeof !='undefined'), thus the js is running in electron app
contextBridge.exposeInMainWorld("IN_DESKTOP_ENV", true);
