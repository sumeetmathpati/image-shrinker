const { app, BrowserWindow } = require('electron')

// Set environment
process.env.NODE_ENV = 'development'
const isDev = process.env.NODE_ENV !== 'production' ? true : false

const isLinux = process.platform === 'linux' ? true : false
const isMac = process.platform === 'darwin' ? true : false
const isWin = process.platform === 'win32' ? true : false

let mainWindow

function createMainWindow() {
    mainWindow = new BrowserWindow({
        title: 'Image Shrink',
        width: 500,
        height: 600,
        icon: './assets/icons/Icon_256x256.png',
        resizable: isDev ? true : false,
    });

    // mainWindow.loadURL(`file://${__dirname}/app/index.html`) 
    mainWindow.loadFile('./app/index.html')
}

app.on('ready', createMainWindow);

app.on('window-all-closed', () => {
    if (!isMac) {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow()
    }
})