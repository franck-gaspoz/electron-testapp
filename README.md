# electron test app
___
from @ [https://www.electronjs.org/docs/latest/tutorial/tutorial-first-app](https://www.electronjs.org/docs/latest/tutorial/tutorial-first-app)

*notes*

```dos
--------------------------------------------------------------------
-- make electron app
--------------------------------------------------------------------

https://www.electronjs.org/docs/latest/tutorial/tutorial-first-app

// dos (ps: marche pas)
chcp 65001

npm init

// entry point should be main.js (you will be creating that file soon).
// author, license, and description can be any value, but will be necessary for packaging later on

npm run start

npm install electron --save-dev

// -----------------------------------------------------
// electron start: cf. package.json
// -----------------------------------------------------

{
  "name": "electron-testapp",
  "version": "1.0.0",
  "description": "test app electron",
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "electron",
    "test",
    "app"
  ],
  "author": "franck.gaspoz@gmail.com",
  "license": "MIT",
  "devDependencies": {
    "electron": "^33.0.2"
  }
}

// -----------------------------------------------------
// main.js : boostrap electron browser
// -----------------------------------------------------

const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })

    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// etc...
```
