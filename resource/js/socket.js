var bufferToArrayBuffer = require('buffer-to-arraybuffer');
var echarts = require('echarts');
var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
const ipc = require('electron').ipcRenderer
var option;
// window.$ = window.jQuery = require('jquery')
option = {
    title: {
        text: 'Phase diff',
        x: 'center'
    },
    xAxis: {
        type: 'category',
        data: [...Array(1400).keys()]
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [...Array(1400).keys()],
        type: 'line'
    }]
};
console.log(option.series[0].data)
myChart.setOption(option);

const net = require('net')
const phase_diff_server = net.createServer()
// phase diff listen
phase_diff_server.listen('31500', '127.0.0.1')
phase_diff_server.on('listening', function(){
    console.log('31500 listening...')
})
let buffers = []
phase_diff_server.on('connection', function(socket){
    socket.on('data', function(buffer_data){
        buffers.push(buffer_data)
        // const phase_diff_vector = new Float32Array(bufferToArrayBuffer(buffer_data)); // or buffer_data.buffer
        // console.log(phase_diff_vector)
        if (socket.bytesRead === 313600){
            phase_buffer = Buffer.concat(buffers)
            // console.log(phase_buffer.length)
            const phase_diff_vector = new Float32Array(bufferToArrayBuffer(phase_buffer)); // or buffer_data.buffer
            // console.log(phase_diff_vector.length)
            let phase_diff = []
            let n = 1400
            for (let i = 0; i < 56; i++){
                phase_diff.push(phase_diff_vector.slice(i*n, (i+1)*n))
            }
            // console.log(phase_diff.length)
            buffers = []
            option.series[0].data = Array.from(phase_diff[0])
            // console.log(option.series[0].data)
            myChart.setOption(option)
        }
    })
})

const waken_server = net.createServer()
waken_server.listen('31501', '127.0.0.1')
waken_server.on('listening', function(){
    console.log('31501 listening...')
})
waken_server.on('connection', function(socket){
    socket.on('data', function(buffer_data){
        console.log(buffer_data.toString())
        $('#waken').attr("class", 'alert alert-success')
        $('#waken-text').html('waken')
    })
})

const gesture_server = net.createServer()
gesture_server.listen('31502', '127.0.0.1')
gesture_server.on('listening', function(){
    console.log('31502 listening...')
})
gesture_server.on('connection', function(socket){
    socket.on('data', function(buffer_data){
        console.log(buffer_data.readInt8())
        gesture_code = buffer_data.readInt8()
        $('#gesture-img').attr("src", "./resource/pic/x.png".replace('x', gesture_code));
    })
})

$('#record').on('click', function(){
    ipc.send('open-record-window')
})