const mongoose = require('mongoose')
const { boolean } = require('webidl-conversions')

const { Schema } = mongoose
// mongoose.Schema.Types.ObjectId
const { Types: { ObjectId } } = Schema

const announcementsSchema = new Schema({ // 스키마 정의
    announcementNo: {
        type : Number ,
        required : true ,
        trim : true ,
    },
    announcementTitle: {
        type : String ,
        required : true ,
        trim : true ,
    },
    announcementContents: {
        type : String ,
        required : true ,
        trim : true ,
    },
    announcementPeple: {
        type : String ,
        required : true , 
        trim : true ,
    },
    announcementCreateDate: {
        type : Date , 
        default : Date.now,
    },
    announcementModifyDate: {
        type : Date , 
        default : Date.now,
    },
})

const Announcement = mongoose.model('announcements', announcementsSchema)
module.exports = Announcement