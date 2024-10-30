const {
    app,
    Tray,
    Menu,
    nativeImage,
    BrowserWindow,
    nativeTheme,
    ipcMain
} = require('electron')

const path = require('node:path')

const createWindow = () => {
    const win = new BrowserWindow({
        title: "Electron App",

        frame: false,
        titleBarStyle: 'hidden',
        titleBarOverlay: false,

        fullscreen: false,
        fullScreenable: 'true',
        menuBarVisible: false,
        shadow: true,
        resizable: true,
        movable: true,
        visibleOnAllWorkspaces: false,
        /*
        width: 1700,
        height: 956,
        minWidth: 1700,
        minHeight: 956,
        */
        width: 800,
        height: 600,
        minWidth: 400,
        minHeight: 200,

        //skipTaskbar: true,

        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    app.setUserTasks([])
    const icon = nativeImage.createFromPath('icon.png')
    win.setIcon(icon)
    //win.setTitleBarOverlay({ color: 'red', 'symbolColor': 'blue', height: 16 })
    win.center()

    win.loadFile('index.html')
    //win.loadFile('C:\\Users\\franc\\source\\repos\\MovieDbAssistant\\MovieDbAssistant.App\\bin\\Debug\\net8.0-windows10.0.22621.0\\output\\ok.ru\\index.html')
}

const createTray = () => {
    const icon = nativeImage.createFromPath('icon.png')
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
    ipcMain.handle('ping', () => 'pong')
}

app.whenReady().then(() => {
    setupIpc()
    nativeTheme.themeSource = "dark"
    createTray()
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
