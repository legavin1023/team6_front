# :zap: 에듀키트 디지털 트윈 모니터링 시스템 구축
> 실시간으로 PLC Edukit의 기기를 제어하는 동시에 데이터를 모니터링하는 기기 제어 대시보드 웹 서비스

![ezgif-1-e7d022f932](https://user-images.githubusercontent.com/96156114/163900276-60600b71-2074-46ed-9e9f-f837bfad2d33.gif)

[![Npm version][npm-image]][npm-url]
[![Node version][node-image]][node-url]
[![Vue version][vue-image]][vue-url]

- 프로젝트 기간 2022-03-16 ~ 2022-04-28
- 상세 정보 [notion](https://www.notion.so/digsomething/Metaverse-Bootcamp-2-70e4f46bcd674874a09a962575a35200) 문서 참고

<br/>

## :bulb: System Concept

**PLC Edukit의 기기를 제어하고 Edukit의 데이터를 모니터링하는 기기 제어 대시보드 웹 서비스**

![Untitled (1)](https://user-images.githubusercontent.com/96156114/163905822-3f63019c-cc1f-4193-80c5-60855babc5cc.png)

- 회원가입 및 로그인이 선행되어야 고객정보 로드/수정, 실시간 데이터 모니터링 및 Edukit 제어를 수행할 수 있다.
- 회원정보를 저장할 때 비밀번호는 암호화 되어야 한다.
- Edukit의 제어는 서버를 거치지 않고 MQTT를 통해 직접 연결된다.

<br/>

## :pushpin: Architecture

![Untitled (2)](https://user-images.githubusercontent.com/96156114/163905691-bb54e17b-e160-48f5-8c9b-ee5518473df0.png)

<br/>

## :mag: Features

**불량품 확인 및 체크**
- edukit의 실시간 데이터를 three.js로 웹에서 확인 가능
    - 웹에서 기기 클릭 후 실시간 비전 영상 확인 가능(비전 카메라 이용)
    - 3호기의 움직임 실시간 연동

**실시간 데이터 확인 대시보드**
- 실시간 데이터들을 three.js로 디지털 트윈된 3D 오브젝트와 함께 실시간 연동 그래프로 표시
- edukit에서 지정한 조건에 따라(주사위 값/박스 색) 불량품으로 간주
- 마이페이지는 사용자 정보 확인 및 수정이 가능하며 모달로 생성

**담당자 관리**
- 담당자 확인 가능
- 관리자의 경우, 담당자 정보 수정 및 삭제 가능

**작업 내역**
- 작업 내역 등록/수정/삭제 가능

<br/>

## :page_facing_up: Installation

front:

```sh
npm install // 설치
npm run serve
```

back:

_설치 전 DB에 `team6` 직접 생성 필요_
+ nodemon 적용 실행
```sh
npm install // 설치
npm run dev
```
+ 단순 실행
```sh
npm install // 설치
npm start
```

<br/>

## :books: Used

* [Node.js](https://nodejs.org/)
    * [Sequelize](https://sequelize.org/)
    * [Express.js](https://expressjs.com/)
    * [Postman](https://www.postman.com/)
* [Vue.js](https://v2.vuejs.org/)
    * [Chart.js](https://www.chartjs.org/)
    * [Three.js](https://threejs.org/)
* [PostgreSQL](https://www.postgresql.org/)
    * [Dbeaver](https://dbeaver.io/)
* [Mosquitto](https://mosquitto.org/)
    * [MQTTBox](https://chrome.google.com/webstore/detail/mqttbox/kaajoficamnjijhkeomgfljpicifbkaf?hl=ko)

<br/>

## :eyes: Members

김채은
+ [Github]()
+ YourEmail@example.com

<br/>

김희선
+ [Github]()
+ YourEmail@example.com

<br/>

백동기
+ [Github]()
+ YourEmail@example.com

<br/>

진아영
+ [Github](https://github.com/jay0v0)
+ [Blog](https://keepgoinglog.tistory.com/)
+ ayjindev@gmail.com

<br/>


<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/badge/npm-v6.14.15-orange?style=flat-square
[npm-url]: https://www.npmjs.com/
[node-image]: https://img.shields.io/badge/node-v14.18.1-blue?style=flat-square
[node-url]: https://nodejs.org/
[vue-image]: https://img.shields.io/badge/vue-v2.6.14-brightgreen?style=flat-square
[vue-url]: https://v2.vuejs.org/
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[wiki]: https://github.com/yourname/yourproject/wiki
