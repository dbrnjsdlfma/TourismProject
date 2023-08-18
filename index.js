const express = require('express')
const app = express()
const cors = require('cors')
const logger = require('morgan')
const mongoose = require('mongoose')
const axios = require('axios')

const config = require('./config')

const http = require('http')
const fs = require('fs')
const path = require('path')
const port = 5000

const corsOptions = {
    origin : 'http://127.0.0.1:5500',// 해당 URL 주소만 요청을 허락함
    credentials : true // 사용자 인증이 필요한 리소스를 요청할 수 있도록 허용함
}

// const CONNECT_URL = 'mongodb://127.0.0.1:27017/yg1403'
mongoose.connect(config.MONGODB_URL)
.then(() => console.log('mongodb connect ...'))
.catch( e => console.log(`faild to connect mongodb ${e}`))

app.use(cors(corsOptions)) // CORS 설정
app.use(express.json()) // request body 파싱
app.use(logger('tiny')) // logger 설정

app.use(express.static(path.join( __dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'index.html'))
})

app.get('/error', (req, res, next) => {
    throw new Error('서버에 치명적인 에러가 발생했습니다.')
})
// 폴백 핸들러 (fallback handler)
app.use((req, res, next) => { // 사용자가 요청한 페이지가 없는 경우 에러 처리
    res.status(404).send('Page not Found')
})

app.use((err, req, res, next) => { // 서버내부 오류처리
    console.error(err.stack)
    res.status(500).send('Internal Server Error')
})
app.listen(port, () => {
    console.log('server is runnig on port 5000...')
})