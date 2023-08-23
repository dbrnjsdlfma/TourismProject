const express = require('express')
const Tourspot = require('../models/tourisms')
const expressAsyncHandler = require('express-async-handler')
// const { generateToken, isAuth } = require('../../auth')
const app = express()
const http = require('http')
const fs = require('fs')
const path = require('path')

const requestIp = require('request-ip');

const router = express.Router()

app.use(express.json()) // request body 파싱

router.get('/like' , async (req, res, next) => {
    try {
        const tourspotList = await Tourspot.find()
        const likeTourspotList = tourspotList.sort((d1, d2) => d2.likeNo - d1.likeNo)
        const ip = requestIp.getClientIp(req);
        console.log(ip)
        // console.log(req.body)
        res.json(likeTourspotList)
    } catch(err) {
        console.log(err);
    }
})

router.post('/like' , async (req, res, next) => {
    try {
        const tourspotListOne = await Tourspot.findOne({
            tourspotNm : req.body.key
        })
        console.log(req.body.key)
        console.log(tourspotListOne)
    } catch(err) {
        console.log(err)
    }

})

router.get('/' , async (req, res, next) => {
    const tourspotList = await Tourspot.find()
    // console.log(tourspotList)
    res.json(tourspotList)
    // res.sendFile(path.join(__dirname,'../../index.html'))
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