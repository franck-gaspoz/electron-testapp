const {
    app,
    Tray,
    Menu,
    nativeImage,
    BrowserWindow,
    nativeTheme,
    ipcMain,
    webFrameMain,
    globalShortcut
} = require('electron')

const path = require('node:path')

// keyboard shortcuts
const Shortcut_MainWindow_ToggleState = 'Control+Shift+X'

// emitted
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

/** @type {BrowserWindow} browser window */
var mainWindow = null

const sendWindowEvent = (win, name, value, frame) => {
    frame = frame || win.webContents.mainFrame
    const valueStr = JSON.stringify(value)
    const code = "if (typeof signal != 'undefined') signal('"
        + name
        + "','"
        + valueStr
        + "')"
    console.log("⚡ SIGNAL ⚡ " + name + " ----- " + valueStr)
    frame.executeJavaScript(code)
}

/** toggle main window state (fullscreen -> restore -> minimized -> fullscreen */
const toggleMainWindowState = () => {

    console.debug("🔵 toggle main window state");

    if (!mainWindow) return

    console.debug("fullscreen:"+mainWindow.isFullScreen())
    console.debug("maximized:"+mainWindow.isMaximized())
    console.debug("minimized:"+mainWindow.isMinimized())
    
    if (mainWindow.isFullScreen())
        mainWindow.setFullScreen(false)
    else {
        if (mainWindow.isMaximized())
        {
            mainWindow.unmaximize()
        } else {
            if (mainWindow.isMinimized())
            {
                mainWindow.restore()
                mainWindow.setFullScreen(true)
            }
            else
                /* !full,!maximized,!minimized */
                mainWindow.minimize()
        }
    }
}

/** setup keyboard shortcuts  */
const setupKeyboardShortcuts = () => {

    var check = globalShortcut.register(Shortcut_MainWindow_ToggleState, () => {
        console.debug("#️⃣  "+Shortcut_MainWindow_ToggleState+" pressed");
        toggleMainWindowState()
    });
    if (check) console.debug("🟢 "+Shortcut_MainWindow_ToggleState+" registered successfully");

    /*globalShortcut.registerAll(["CommandOrControl+X",
        "CommandOrControl+Y"], () => {
            console.log("One Global Shortcut defined " +
                "in registerAll() method is Pressed.");
        });*/
}

/**
 * setup events
 * @param {BrowserWindow} win browser window
 */
const setupEvents = win => {

    console.debug("setup events");

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

/** create window */
const createWindow = () => {

    console.debug("create window");

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
        //alwaysOnTop: true,

        width: medW,
        height: medH,
        minWidth: minW,
        minHeight: minH,

        show: false,

        //skipTaskbar: true,

        webPreferences: {
            preload: path.join(__dirname, '/js/preload.js')
        }
    })

    mainWindow = win
    ////win.setTitleBarOverlay({ color: 'red', 'symbolColor': 'blue', height: 16 })
    //win.loadFile('index.html')
    //win.loadFile('C:\\Users\\franc\\source\\repos\\MovieDbAssistant\\MovieDbAssistant.App\\bin\\Debug\\net8.0-windows10.0.22621.0\\win-x64\\output\\Catalog Nov. 2024\\index.html')
    win.loadFile('C:\\Users\\franc\\source\\repos\\MovieDbAssistant\\MovieDbAssistant.App\\bin\\Debug\\net8.0-windows10.0.22621.0\\win-x64\\output\\Sample catalog\\index.html')
    
    win.setPosition(
        0,//1920,
        -1080,
        false)     // for dev

    win.center()
    setupEvents(win)
    app.setUserTasks([])
    const icon = nativeImage.createFromPath('./img/icon.png')
    win.setAspectRatio(aspectRatio, { width: minW, height: minH })
    win.setIcon(icon)

    win.setFullScreen(true)
    
    win.once("ready-to-show", () => {

        console.debug("⭐⚡ready-to-show: show");

        win.show()
        sendWindowEvent(win, Signal_Window_State_Changed_Enter_FullScreen, {})
    })
}

/** create tray */
const createTray = () => {

    console.debug("create tray");

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

/** setup ipc */
const setupIpc = () => {

    console.debug("setup Ipc");

    ipcMain.handle('send', (signal, data) => {
        console.log("⭐⚡[main] handle signal: " + signal)
    })
}

app.whenReady().then(() => {

    console.debug("⭐⚡whenReady: create window");

    setupIpc()
    setupKeyboardShortcuts()
    nativeTheme.themeSource = "dark"
    createTray()
    createWindow()

    app.on('activate', function () {

        console.debug("⭐⚡activate");

        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
      })    
})

app.on('window-all-closed', () => {

    console.debug("⭐⚡window-all-closed");
    
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
})
