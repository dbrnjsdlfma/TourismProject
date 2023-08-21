const express = require('express')
const Tourspot = require('../models/tourisms')
const expressAsyncHandler = require('express-async-handler')
// const { generateToken, isAuth } = require('../../auth')
const app = express()
const http = require('http')
const fs = require('fs')
const path = require('path')

const router = express.Router()

app.use(express.json()) // request body 파싱
router.get('/' ,async (req, res, next) => {
    const tourspotList = await Tourspot.find()
    // console.log(tourspotList)
    res.json(tourspotList)
    // res.sendFile(path.join(__dirname,'../../index.html'))
})

router.get('/:id', async (req, res, next) => {
    const tourspot = await Tourspot.findOne({
        tourspotNm: req.params.id
    })
    console.log(tourspot)
    res.json(tourspot)
    // res.sendFile(path.join(__dirname,'../../public/html/info.html'))
})

module.exports = router