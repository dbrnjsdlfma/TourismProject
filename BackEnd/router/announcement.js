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
    const announcementList = await Announcement.find()
    const announcementListSort = announcementList.sort((d1, d2) => d2.announcementNo - d1.announcementNo)
    // console.log(announcementList)
    console.log(announcementListSort)
    res.json(announcementListSort)
})

router.get('/:id', async (req, res, next) => {
    console.log(req.params.id)
    const announcementListOne = await Announcement.findOne({
        announcementTitle : req.params.id
    })
    announcementListOne.announcementCheck += 1 
    const updateAnnouncementListOne = announcementListOne.save()
    // console.log(req.params.id)
    console.log(updateAnnouncementListOne)
    res.json(announcementListOne)
})
router.post('/:id', async (req, res, next) => {
    console.log(req.params.id)
    const announcementListOne = await Announcement.findOne({
        announcementTitle : req.params.id ,
    })
    console.log(req.body.No)
    announcementListOne.announcementCheck = req.body.No
    const updateAnnouncementListOne = await announcementListOne.save()
    console.log(updateAnnouncementListOne)
    return res.json({
        code: 200,
        messate : 'success',
        updateAnnouncementListOne
    })
})
module.exports = router