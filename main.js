// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

// Quit to prevent opening multiple windows
if (require("electron-squirrel-startup")) app.quit();

function createWindow () {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        title: "UCI Client",
        icon: "icon.png",
        webPreferences: {
            nodeIntegration: true,
            // contextIsolation: false,
            // webSecurity: false,
            preload: path.join(__dirname, "client/script.js")
        }
    });

    // and load the index.html of the app.
    mainWindow.loadURL("https://krunker.io/");
    mainWindow.setMenuBarVisibility(false);
    mainWindow.maximize();
    mainWindow.setFullScreen(true);

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Send customs
    mainWindow.webContents.on("dom-ready", () => {
        let customs_path = app.getPath("documents").replaceAll("\\", "/") + "/UCI Client/";
        
        if (!(fs.existsSync(customs_path))) {
            fs.mkdirSync(customs_path);
            for (let i = 0; i < 2; i++) {
                fs.mkdirSync(customs_path + ["userscripts/","userstyles/"][i]);
            };
        };

        let user_customs = {
            "userscripts": {},
            "userstyles": {}
        };

        for (let i = 0; i < 2; i++) {
            let customs = ["userscripts","userstyles"][i];
            let files_path = customs_path + customs;

            let files = fs.readdirSync(files_path);
            
            for (j = 0; j < files.length; j++) {
                let file_name = files[j];

                let file_content = fs.readFileSync(`${files_path}/${file_name}`, {encoding:"utf-8"});

                user_customs[customs][file_name] = file_content;
            };
        };
    
        mainWindow.webContents.send("customs", user_customs);

    });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
    app.commandLine.appendSwitch("disable-frame-rate-limit");
    createWindow();

    // await session.defaultSession.cookies.set({
    //     domain: "krunker.io/",
    //     name: "sameSite",
    //     value: "none"
    // });

    app.on("activate", function () {
        // On macOS it"s common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Quit when all windows are closed, except on macOS. There, it"s common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
    if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

// ipcMain.on("get_customs", async () => {
//     ipcMain.emit("customs", user_customs);
// });