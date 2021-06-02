var net = require('net');
const ipc = require('electron').ipcRenderer
var l = 0
$('#start').on('click', function(){
    var client = net.connect({port: 31503}, function() {
        console.log('连接到服务器！');  
    });
    client.write('2')
})
$('#stop').on('click', function(){
    var client = net.connect({port: 31503}, function() {
        console.log('连接到服务器！');  
    });
    client.write('3')
    l += 20
    $('#progress-bar').attr('style', 'width: ' + l +'%')
})
$('#finish').on('click', function(){
    var client = net.connect({port: 31503}, function() {
        console.log('连接到服务器！');  
    });
    client.write('4')
    ipc.send('close-record-window')
})