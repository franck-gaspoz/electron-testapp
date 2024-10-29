const { app, Tray, Menu, nativeImage, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        titleBarStyle: 'visible',
        fullScreenable: 'true',
        frame: true,
        menuBarVisible: false,
        shadow: true,
        resizable: true,
        visibleOnAllWorkspaces: false,
        title: "electron app",
        movable: true,
        width: 1700,
        height: 956,
        minWidth: 1700,
        minHeight: 956
    })
    win.setMenuBarVisibility(false)
    win.center()
    win.fullScreen = true

    //win.loadFile('index.html')
    win.loadFile('C:\\Users\\franc\\source\\repos\\MovieDbAssistant\\MovieDbAssistant.App\\bin\\Debug\\net8.0-windows10.0.22621.0\\output\\ok.ru\\index.html')
}

const createTray = () => {
    const icon = nativeImage.createFromPath('icon.png')
    const tray = new Tray(icon)
    tray.setToolTip('Movie Db Assistant')
    tray.setTitle('Movie Db Assistant')
}

app.whenReady().then(() => {
    createTray()
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
