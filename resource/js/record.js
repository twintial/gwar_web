var net = require('net');
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
})
$('#finish').on('click', function(){
    var client = net.connect({port: 31503}, function() {
        console.log('连接到服务器！');  
    });
    client.write('4')
})