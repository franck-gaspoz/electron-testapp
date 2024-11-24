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
const Shortcut_MainWindow_ToggleState = 'CommandOrControl+Shift+X'
const Shortcut_MainWindow_Fullscreen = 'CommandOrControl+Shift+J'
const Shortcut_MainWindow_Minimize = 'CommandOrControl+Shift+L'
const Shortcut_MainWindow_ToggleOnTop = 'CommandOrControl+Shift+M'

// emitted
const Signal_Window_DidNavigate = 'Signal_Window_DidNavigate'
const Signal_Window_State_Changed_Enter_FullScreen = 'Signal_Window_State_Changed_Enter_FullScreen'
const Signal_Window_State_Changed_Leave_FullScreen = 'Signal_Window_State_Changed_Leave_FullScreen'
const Signal_Window_State_Changed_Minimize = 'Signal_Window_State_Changed_Minimize'
const Signal_Window_State_Changed_Restore = 'Signal_Window_State_Changed_Restore'
const Signal_Window_State_Changed_Maximize = 'Signal_Window_State_Changed_Maximize'
const Signal_Window_State_Changed_Unmaximize = 'Signal_Window_State_Changed_Unmaximize'

// accepted
const Command_FullScreen = 'Command_FullScreen'
const Command_Minimize = 'Command_Minimize'
const Command_Maximize = 'Command_Maximize'
const Command_Restore = 'Command_Restore'
const Command_Close = 'Command_Close'

/** @type {BrowserWindow} browser window */
var mainWindow = null

const sendSignal = (win, name, value, frame) => {
    frame = frame || win.webContents.mainFrame
    const jsonValue = JSON.stringify(value)
    const code = "if (typeof signal != 'undefined') signal('"
        + name
        + "',"
        + jsonValue
        + ")"
    console.log("⚡ SIGNAL ⚡ " + name + ' 📚 ' + jsonValue)
    frame.executeJavaScript(code)
}

/** set main window fullscreen state */
const setMainWindowFullscreen = () => {
    console.debug("🔵 set fullscreen")
    if (mainWindow.isMinimized()) mainWindow.restore()
    mainWindow.setFullScreen(true)
}

/** minimize main window */
const minimizeMainWindow = () => {
    console.debug("🔵 minimize")
    mainWindow.minimize()
}

const toggleMainWindowOnTop = () => {
    console.debug("🔵 toggle on top: "+mainWindow.isAlwaysOnTop()+ " " + (!mainWindow.isAlwaysOnTop()))
    mainWindow.setAlwaysOnTop(!mainWindow.isAlwaysOnTop())
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

const registerShortcut = (shortcut,fun) => {
    const check = globalShortcut.register(shortcut, () => {
        console.debug("#️⃣  "+shortcut+" pressed");
        fun()
    });
    if (check) console.debug("🟢 "+shortcut+" registered successfully");
}

/** setup keyboard shortcuts  */
const setupKeyboardShortcuts = () => {

    console.debug("🟣 setup keyboard shortcuts")

    registerShortcut(Shortcut_MainWindow_ToggleState, () => toggleMainWindowState() );
    registerShortcut(Shortcut_MainWindow_Fullscreen, () => setMainWindowFullscreen() );
    registerShortcut(Shortcut_MainWindow_Minimize, () => minimizeMainWindow() );
    registerShortcut(Shortcut_MainWindow_ToggleOnTop, () => toggleMainWindowOnTop() );
    
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

    console.debug("🟣 setup events");

    win.webContents.on(
        'did-frame-navigate',
        (event, url, httpResponseCode, httpStatusText, isMainFrame, frameProcessId, frameRoutingId) => {
            const frame = webFrameMain.fromId(frameProcessId, frameRoutingId)
            if (frame) {
                sendSignal(win, Signal_Window_DidNavigate, url, frame)
            }
        }
    )

    win.on('enter-full-screen', (event, isAlwaysOnTop) => {
        sendSignal(win, Signal_Window_State_Changed_Enter_FullScreen, {})
    })
    win.on('leave-full-screen', (event, isAlwaysOnTop) => {
        sendSignal(win, Signal_Window_State_Changed_Leave_FullScreen, {})
    })
    win.on('minimize', (event, isAlwaysOnTop) => {
        sendSignal(win, Signal_Window_State_Changed_Minimize, {})
    })
    win.on('restore', (event, isAlwaysOnTop) => {
        sendSignal(win, Signal_Window_State_Changed_Restore, {})
    })
    win.on('maximize', (event, isAlwaysOnTop) => {
        sendSignal(win, Signal_Window_State_Changed_Maximize, {})
    })
    win.on('unmaximize', (event, isAlwaysOnTop) => {
        sendSignal(win, Signal_Window_State_Changed_Unmaximize, {})
    })
}

/** create window */
const createWindow = () => {

    console.debug("🟣 create window");

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
    win.loadFile('C:\\Users\\franc\\source\\repos\\MovieDbAssistant\\MovieDbAssistant.App\\bin\\Debug\\net8.0-windows10.0.22621.0\\win-x64\\output\\Catalog Nov. 2024\\index.html')
    //win.loadFile('C:\\Users\\franc\\source\\repos\\MovieDbAssistant\\MovieDbAssistant.App\\bin\\Debug\\net8.0-windows10.0.22621.0\\win-x64\\output\\Sample catalog\\index.html')
    
    if (false)
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
        sendSignal(win, Signal_Window_State_Changed_Enter_FullScreen, {})
    })
}

/** create tray */
const createTray = () => {

    console.debug("🟣 create tray");

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

    console.debug("🟣 setup Ipc");

    ipcMain.handle('send', (e, ...args) => {
        var signal = args[0]
        var data = args[1]
        console.debug("⭐⚡[main] handle signal: " + signal + ' 📚 '
            + args[0]
            + ' 📚 ' + JSON.stringify(args[1]))
        
        var f = eval("Handle_"+signal)
        if (f) f(e,data)            
    })
}

app.whenReady().then(() => {

    console.debug("⭐⚡whenReady: create window");

    nativeTheme.themeSource = "dark"
    setupIpc()
    setupKeyboardShortcuts()
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

// ------------ command handlers ------------

const Handle_Command_Maximize = () => mainWindow.maximize()

const Handle_Command_Minimize = () => mainWindow.minimize()

const Handle_Command_Restore = () => mainWindow.restore()

const Handle_Command_Close = () => app.quit()

const Handle_Command_Fullscreen = () => mainWindow.setFullScreen(true)
