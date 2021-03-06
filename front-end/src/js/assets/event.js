/**
 * 목표 기기의 실시간 정보를 연결하는 파트입니다
 * 방식은 자유지만 본 프로젝트에서는 mqtt를 사용함
 */
import mqtt from 'mqtt'

class Event {
  constructor(element, edukit) {
    const eventElement = document.createElement('div')
    eventElement.setAttribute('id', 'MQTT')
    const inputAddressElement = eventElement.appendChild(document.createElement('input'))
    inputAddressElement.placeholder = 'MQTT Host 입력'

    const inputPortElement = eventElement.appendChild(document.createElement('input'))
    inputPortElement.placeholder = 'MQTT Port 입력'

    const inputPathElement = eventElement.appendChild(document.createElement('input'))
    inputPathElement.placeholder = 'MQTT Path 입력'

    const inputTopicElement = eventElement.appendChild(document.createElement('input'))
    inputTopicElement.placeholder = 'MQTT Topic 입력'

    const buttonElement = eventElement.appendChild(document.createElement('button'))
    buttonElement.innerText = 'Connect'

    const statusElement = eventElement.appendChild(document.createElement('span'))
    statusElement.setAttribute('class', 'textOn')

    statusElement.innerText = '연결 상태'
    statusElement.style.color = '#888BBF'
    statusElement.style.opacity = '0.3'

    buttonElement.addEventListener('click', () => {
      let props = {
        hostname: inputAddressElement.value,
        port: inputPortElement.value,
        path: inputPathElement.value,
        topic: inputTopicElement.value,
        status: statusElement.style,
        edukit: edukit
      }
      statusElement.style.color = '#FF0000'
      statusElement.style.border = '3px solid #FF0000'
      statusElement.style.opacity = '1'

      if (this.client) this.client.end()

      this.setEvent(props)
    })

    element.appendChild(eventElement)
  }

  setEvent(props) {
    let { hostname, port, path, topic, status, edukit } = props

    const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
    this.client = mqtt.connect({
      clientId,
      clean: true,
      protocol: 'ws',
      reconnectPeriod: 200,
      hostname: hostname,
      port: port,
      path: path
    })

    this.client.on('connect', () => {
      // console.log('MQTT Connected')
      status.color = '#00ff00'
      status.border = '3px solid #00ff00'
      status.opacity = '1'
      this.client.subscribe([topic], () => {
        // console.log(`토픽 연결 완료: ${topic}`)
      })
      this.client.on('message', (topic, payload) => {
        // console.log(`토픽 ${topic}에서 전송된 메시지: ${payload.toString()}`)

        let message = JSON.parse(payload)
        let data = message.Wrapper.filter(p => p.tagId === '21' || p.tagId === '22')
        data = data.map(p => parseInt(p.value))

        edukit['yAxis'] = data[0]
        edukit['xAxis'] = data[1]
      })
    })
    let smartConnectormessage = this.message
    return smartConnectormessage
  }
}

export { Event }
