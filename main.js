const {
    app,
    Tray,
    Menu,
    nativeImage,
    BrowserWindow,
    nativeTheme,
    ipcMain,
    webFrameMain
} = require('electron')

const path = require('node:path')

// emetted
const Signal_Window_DidNavigate = 'Signal_Window_DidNavigate'
const Signal_Window_State_Changed_Enter_FullScreen = 'Signal_Window_State_Changed_Enter_FullScreen'
const Signal_Window_State_Changed_Leave_FullScreen = 'Signal_Window_State_Changed_Leave_FullScreen'
const Signal_Window_State_Changed_Minimize = 'Signal_Window_State_Changed_Minimize'
const Signal_Window_State_Changed_Restore = 'Signal_Window_State_Changed_Restore'
const Signal_Window_State_Changed_Maximize = 'Signal_Window_State_Changed_Maximize'
const Signal_Window_State_Changed_Unmaximize = 'Signal_Window_State_Changed_Unmaximize'

// accepted
const Command_FullScreen_Toggle = 'Command_FullScreen_Toggle'
const Command_Minize = 'Command_Minimize'
const Command_Maximize = 'Command_Maximize'

const sendWindowEvent = (win, name, value, frame) => {
    frame = frame || win.webContents.mainFrame
    const valueStr = JSON.stringify(value)
    const code = "if (typeof signal != 'undefined') signal('"
        + name
        + "','"
        + valueStr
        + "')"
    console.log("SIGNAL: " + name + " ----- " + valueStr)
    frame.executeJavaScript(code)
}

const setupEvents = win => {

    win.webContents.on(
        'did-frame-navigate',
        (event, url, httpResponseCode, httpStatusText, isMainFrame, frameProcessId, frameRoutingId) => {
            const frame = webFrameMain.fromId(frameProcessId, frameRoutingId)
            if (frame) {
                sendWindowEvent(win, Signal_Window_DidNavigate, url, frame)
            }
        }
    )

    win.on('enter-full-screen', (event, isAlwaysOnTop) => {
        sendWindowEvent(win, Signal_Window_State_Changed_Enter_FullScreen, {})
    })
    win.on('leave-full-screen', (event, isAlwaysOnTop) => {
        sendWindowEvent(win, Signal_Window_State_Changed_Leave_FullScreen, {})
    })
    win.on('minimize', (event, isAlwaysOnTop) => {
        sendWindowEvent(win, Signal_Window_State_Changed_Minimize, {})
    })
    win.on('restore', (event, isAlwaysOnTop) => {
        sendWindowEvent(win, Signal_Window_State_Changed_Restore, {})
    })
    win.on('maximize', (event, isAlwaysOnTop) => {
        sendWindowEvent(win, Signal_Window_State_Changed_Maximize, {})
    })
    win.on('unmaximize', (event, isAlwaysOnTop) => {
        sendWindowEvent(win, Signal_Window_State_Changed_Unmaximize, {})
    })
}

const createWindow = () => {

    const refW = 1920
    const refH = 1080
    const aspectRatio = refW / refH
    const medW = refW * 0.8
    const medH = medW / aspectRatio
    const minW = 400
    const minH = minW / aspectRatio

    const win = new BrowserWindow({
        title: "Electron App",

        frame: false,
        titleBarStyle: 'hidden',
        //titleBarOverlay: { color: 'black', 'symbolColor': 'white', height: 16 },  // buttons overlay

        fullscreen: false,
        fullScreenable: 'true',
        menuBarVisible: false,
        shadow: true,
        resizable: true,
        movable: true,
        visibleOnAllWorkspaces: false,

        width: medW,
        height: medH,
        minWidth: minW,
        minHeight: minH,

        //skipTaskbar: true,

        webPreferences: {
            preload: path.join(__dirname, '/js/preload.js')
        }
    })

    win.setPosition(
        0,//1920,
        -1080,
        false)     // for dev

    win.center()
    setupEvents(win)
    win.setFullScreen(true)
    app.setUserTasks([])
    const icon = nativeImage.createFromPath('./img/icon.png')
    win.setAspectRatio(aspectRatio, { width: minW, height: minH })
    win.setIcon(icon)
    ////win.setTitleBarOverlay({ color: 'red', 'symbolColor': 'blue', height: 16 })

    //win.loadFile('index.html')
    win.loadFile('C:\\Users\\franc\\source\\repos\\MovieDbAssistant\\MovieDbAssistant.App\\bin\\Debug\\net8.0-windows10.0.22621.0\\win-x64\\output\\ok.ru\\index.html')
    sendWindowEvent(win, Signal_Window_State_Changed_Enter_FullScreen, {})
}

const createTray = () => {
    const icon = nativeImage.createFromPath('./img/icon.png')
    const tray = new Tray(icon)
    tray.setToolTip('Electron App tooltip')
    tray.setTitle('Electron App title')

    const contextMenu = Menu.buildFromTemplate([
        { label: 'Item1', type: 'radio' },
        { label: 'Item2', type: 'radio' },
        { label: 'Item3', type: 'radio', checked: true },
        { label: 'Item4', type: 'radio' }
    ])
    tray.setContextMenu(contextMenu)
}

const setupIpc = () => {
    ipcMain.handle('send', (signal, data) => {
        console.log("[main] handle signal: " + signal)
    })
}

app.whenReady().then(() => {
    setupIpc()
    nativeTheme.themeSource = "system"
    createTray()
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
