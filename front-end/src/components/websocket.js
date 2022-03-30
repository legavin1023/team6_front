// var WebSocket = require('faye-websocket'),
//   ws = new WebSocket.Client('ws://www.test.com/')

// ws.on('open', function (event) {
//   console.log('open')
//   ws.send('Hello, world!')
// })

// ws.on('message', function (event) {
//   console.log('message', event.data)
// })

// ws.on('close', function (event) {
//   console.log('close', event.code, event.reason)
//   ws = null
// })

// // var client = new faye.Client('http://localhost:8000/faye')

// const mqtt = require('mqtt')
// var client = mqtt.connect('mqtt://127.0.0.1:1883')

// // 토픽 구독
// client.on('connect', function () {
//   client.subscribe('UVC-EDU-01')
//   console.log('Client has subscribed 성공')
// })
// // 구독한 메세지를 받음
// client.on('message', function (topic, message) {
//   console.log(message.toString())
// })

// const mqtt = require('mqtt')
// var client = mqtt.connect('mqtt://broker.mqttdashboard.com')

// // 토픽 구독
// client.on('connect', function () {
//   client.subscribe('#')
//   console.log('Client has subscribed 성공')
// })
// // 구독한 메세지를 받음
// client.on('message', function (topic, message) {
//   console.log(message.toString())
// })
