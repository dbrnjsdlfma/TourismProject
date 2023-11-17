const express = require('express')
const session = require('express-session')
const Tourspot = require('../models/tourisms')
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

app.use(session({
    resave: true,
    saveUninitialized: true ,
    secret: 1234,
    cookie : {
        httpOnly: false,
        secure : false,
        maxAge : 60 * 60 * 24 * 1000,
    },
    name: 'session-cookie',
}))

app.use(express.json()) // request body 파싱
app.use(cookieParser())

router.get('/like' , async (req, res, next) => {
    try {
        const tourspotList = await Tourspot.find()
        const likeTourspotList = tourspotList.sort((d1, d2) => d2.likeNo - d1.likeNo)
        const ip = requestIp.getClientIp(req);
        const uuid = uuidv4()
        console.log(uuid)
        res.cookie('like', uuid, {maxAge : 60 * 60 * 24 * 1000, path: 'http://127.0.0.1:5300/like', httpOnly: false })
        res.json({likeTourspotList, uuid})
    } catch(err) {
        console.log(err);
    }
})

router.post('/like' , async (req, res, next) => {
    const tourspotListOne = await Tourspot.findOne({
        tourspotNm : req.body.tourspotNm
    })
    const uuid = req.body.uuid
    console.log(uuid)
    if(tourspotListOne.likePeple.length === 0) {
        tourspotListOne.likePeple[0] = uuid
    } else {
        for(let i=0; i<tourspotListOne.likePeple.length; i++){
            if(!tourspotListOne.likePeple.includes(uuid)) {
                tourspotListOne.likePeple.push(uuid)
                break;
            }
             else {
                tourspotListOne.likePeple.pop(uuid)
                break;
            }
        }
    }
    console.log(tourspotListOne.likePeple)
    tourspotListOne.likeNo = req.body.likeNo
    const updateTourspot = await tourspotListOne.save()
    return res.json({
        code: 200,
        message : 'success',
        updateTourspot
    })
})

router.get('/' , async (req, res, next) => {
    const tourspotList = await Tourspot.find()
    res.json(tourspotList)
})

router.get('/:id' , async (req, res, next) => {
    const tourspot = await Tourspot.findOne({
        tourspotNm: req.params.id
    })
    console.log(tourspot)
    res.json(tourspot)
    // res.sendFile(path.join(__dirname,'../../public/html/info.html'))
})



module.exports = router