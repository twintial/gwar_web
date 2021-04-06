var bufferToArrayBuffer = require('buffer-to-arraybuffer');
var echarts = require('echarts');
var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom);
var option;
option = {
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
const server = net.createServer()
server.listen('31500', '127.0.0.1')
server.on('listening', function(){
    console.log('listening...')
})
let buffers = []
server.on('connection', function(socket){
    socket.on('data', function(buffer_data){
        buffers.push(buffer_data)
        // const phase_diff_vector = new Float32Array(bufferToArrayBuffer(buffer_data)); // or buffer_data.buffer
        // console.log(phase_diff_vector)
        if (socket.bytesRead === 313600){
            phase_buffer = Buffer.concat(buffers)
            console.log(phase_buffer.length)
            const phase_diff_vector = new Float32Array(bufferToArrayBuffer(phase_buffer)); // or buffer_data.buffer
            console.log(phase_diff_vector.length)
            let phase_diff = []
            let n = 1400
            for (let i = 0; i < 56; i++){
                phase_diff.push(phase_diff_vector.slice(i*n, (i+1)*n))
            }
            console.log(phase_diff.length)
            buffers = []
            option.series[0].data = Array.from(phase_diff[0])
            console.log(option.series[0].data)
            myChart.setOption(option)
        }
    })
})