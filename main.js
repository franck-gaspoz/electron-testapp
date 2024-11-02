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

    const refW = 1920
    const refH = 1080
    const aspectRatio = refW / refH
    const medW = 1920 * 0.8
    const medH = medW / aspectRatio
    const minW = 400
    const minH = minW / aspectRatio

    const win = new BrowserWindow({
        title: "Electron App",

        frame: false,
        titleBarStyle: 'hidden',
        //titleBarOverlay: { color: 'black', 'symbolColor': 'white', height: 16 },

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

    win.setPosition(1920, -1080, false)     // for dev

    win.center()
    win.setFullScreen(true)
    app.setUserTasks([])
    const icon = nativeImage.createFromPath('./img/icon.png')
    win.setAspectRatio(aspectRatio, { width: minW, height: minH })
    win.setIcon(icon)
    ////win.setTitleBarOverlay({ color: 'red', 'symbolColor': 'blue', height: 16 })

    //win.loadFile('index.html')
    win.loadFile('C:\\Users\\franc\\source\\repos\\MovieDbAssistant\\MovieDbAssistant.App\\bin\\Debug\\net8.0-windows10.0.22621.0\\output\\ok.ru.arp188\\index.html')
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
    ipcMain.handle('ping', () => 'pong')
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
