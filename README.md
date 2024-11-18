![logo electron](https://camo.githubusercontent.com/c6a5b63f3d61c2932806c52e77e0650015d890a182ebc9fc977e4d0cbe826d95/68747470733a2f2f656c656374726f6e6a732e6f72672f696d616765732f656c656374726f6e2d6c6f676f2e737667)

# electron test app
___
from @ [https://www.electronjs.org/docs/latest/tutorial/tutorial-first-app](https://www.electronjs.org/docs/latest/tutorial/tutorial-first-app)

*notes*

```dos
--------------------------------------------------------------------
-- make electron app
--------------------------------------------------------------------

https://www.electronjs.org/docs/latest/tutorial/tutorial-first-app

// shell UTF8
"windows": {
  "runtimeExecutable": "chcp 65001 && ${workspaceFolder}/node_modules/.bin/electron.cmd"
}

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
