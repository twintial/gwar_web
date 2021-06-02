const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const ipc = require('electron').ipcMain
const net = require('net')
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
            nodeIntegration: true,
            contextIsolation: false,
        },
        show: false
    })
    record_win.loadURL(path.join('file:',__dirname,'record.html')); //new.html是新开窗口的渲染进程
    record_win.once('ready-to-show', function () {
        record_win.show();
    });
    record_win.on('closed',()=>{
        record_win = null
        var client = net.connect({port: 31503}, function() {
            console.log('连接到服务器！');  
        });
        client.write('0')
    })

})

ipc.on('close-record-window',()=>
{
    record_win.close();
})