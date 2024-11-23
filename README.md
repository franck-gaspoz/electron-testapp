![logo electron](https://camo.githubusercontent.com/c6a5b63f3d61c2932806c52e77e0650015d890a182ebc9fc977e4d0cbe826d95/68747470733a2f2f656c656374726f6e6a732e6f72672f696d616765732f656c656374726f6e2d6c6f676f2e737667)

# electron test app
___

## electronjs

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

------------------------------------------------------------------------

## electron app user agent

```
navigator.userAgent
'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) electron-testapp/1.0.0 Chrome/130.0.6723.59 Electron/33.0.2 Safari/537.36'
```

## electron-forge

from @ [https://www.electronjs.org/docs/latest/tutorial/tutorial-first-app](https://www.electronjs.org/docs/latest/tutorial/tutorial-first-app)

```dos
npm install --save-dev @electron-forge/cli

# migrate existing electron-app

# or create from scratch using template

```

### usefull commands

```ps1
# cleanup windows icons cache
ie4uinit.exe -show

# make forge appx
npx electron-forge make --targets=@electron-forge/maker-appx
```
