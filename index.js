const { app, BrowserWindow, Menu, globalShortcut } = require('electron')

// Set environment
process.env.NODE_ENV = 'development'
const isDev = process.env.NODE_ENV !== 'production' ? true : false

const isLinux = process.platform === 'linux' ? true : false
const isMac = process.platform === 'darwin' ? true : false
const isWin = process.platform === 'win32' ? true : false

let mainWindow

const menuTemplate = [
    ...(isMac ? [{ role: 'appMenu' }] : []),
    {
        role: 'fileMenu',
    },
    ...(isDev
        ? [
            {
                label: 'Developer',
                submenu: [
                    { role: 'reload' },
                    { role: 'forcereload' },
                    { type: 'separator' },
                    { role: 'toggledevtools' },
                ],
            },
        ]
        : []),
]

if (isMac) {
    menuTemplate.unshift({
        role: 'appMenu'
    })
}

function createMainWindow() {
    mainWindow = new BrowserWindow({
        title: 'Image Shrink',
        width: 500,
        height: 600,
        icon: './assets/icons/Icon_256x256.png',
        resizable: isDev ? true : false,
        backgroundColor: 'white'
    });

    // mainWindow.loadURL(`file://${__dirname}/app/index.html`) 
    mainWindow.loadFile('./app/index.html')
}

app.on('ready', () => {
    createMainWindow()

    const mainMenu = Menu.buildFromTemplate(menuTemplate)
    Menu.setApplicationMenu(mainMenu)

    globalShortcut.register('CmdOrCtrl+R', () => mainWindow.reload())
    globalShortcut.register(isMac ? 'Command+Alt+I' : 'Ctrl+Shift+I', () => mainWindow.toggleDevTools())

    mainWindow.on('ready', () => mainWindow = null)
});

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