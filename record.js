const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const ipc = require('electron').ipcMain
let record_win = null;
ipc.on('open-record-window',()=>
{
    if(record_win !== null) {
        record_win.show();
        return;
    }
    record_win = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            nodeIntegration : true
        },
        show: false
    })
    record_win.loadURL(path.join('file:',__dirname,'record.html')); //new.html是新开窗口的渲染进程
    record_win.once('ready-to-show', function () {
        record_win.show();
    });
    record_win.on('closed',()=>{record_win = null})

})