const Command_Send = 'send'

const Vars_App = 'app'
const Vars_InDesktopEnv = 'IN_DESKTOP_ENV'

const { contextBridge, ipcRenderer } = require('electron')

/** send a signal to the ipc renderer */
const sendIpc = (signal, data) => {
    return ipcRenderer.invoke(Command_Send, signal, data)
}

contextBridge.exposeInMainWorld(Vars_App, {
    // first window state (from init) [fullscreen state]
    isWindowed: false,
    isMinimized: false,
    isMaximized: false,    
    // signal sender
    send: (signal, data) => {
        if (data===undefined) data = {}
        console.log("⭐⚡[Preload] handle signal: " 
            + signal
            + ' 📚 ' + data)
        sendIpc(signal+'', data)
    },
    // eval
    eval: text => {
        eval(text)
    },
    dependencies: {
        node: process.versions.node,
        chrome: process.versions.chrome,
        electron: process.versions.electron
    }
})

// if this exists (typeof !='undefined'), thus the js is running in electron app
contextBridge.exposeInMainWorld(Vars_InDesktopEnv, true);
