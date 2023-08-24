const express = require('express')
const Announcement = require('../models/announcements')
const expressAsyncHandler = require('express-async-handler')
// const { generateToken, isAuth } = require('../../auth')
const app = express()
const http = require('http')
const fs = require('fs')
const path = require('path')

const { v4: uuidv4 } = require('uuid');
// const cookie = require('cookie')
const cookieParser = require('cookie-parser');
const requestIp = require('request-ip');

const router = express.Router()

app.use(express.json()) // request body 파싱
app.use(cookieParser())

router.get('/', async (req, res, next) => {

})


module.exports = router