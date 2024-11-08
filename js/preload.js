const Command_Send = 'send'

const Vars_App = 'app'
const Vars_InDesktopEnv = 'IN_DESKTOP_ENV'

const { contextBridge, ipcRenderer } = require('electron')

const send = (name, data) => {
    ipcRenderer.invoke(Command_Send, [name, data])
}

contextBridge.exposeInMainWorld(Vars_App, {
    // first window state (from init) [fullscreen state]
    isWindowed: false,
    isMinimized: false,
    isMaximized: false,
    // signal handler
    e_send: (signal, data) => {
        console.log("[Preload] handle signal: " + signal)
        console.debug(data)
        send(signal, data)
    },
    // eval
    e_eval: text => {
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
