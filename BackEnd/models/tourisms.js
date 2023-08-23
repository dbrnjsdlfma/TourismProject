const mongoose = require('mongoose')
const { boolean } = require('webidl-conversions')

const { Schema } = mongoose
// mongoose.Schema.Types.ObjectId
const { Types: { ObjectId } } = Schema

const tourismsSchema = new Schema({ // 스키마 정의
    tourspotNm: {
        type : String ,
        trim : true ,
    },
    tourspotZip: {
        type : Number ,
        trim : true ,
    },
    tourspotAddr: {
        type : String , 
        trim : true ,
    }, 
    tourspotDtlAddr: {
        type : String ,
        trim : true ,
    },
    refadNo: {
        type : String ,
        trim : true ,
    },
    mngTime: {
        type : String ,
        trim : true ,
    } , 
    tourUtlzAmt: {
        type : String ,
        trim : true ,
    },
    pkgFclt: {
        type : String ,
        trim : true ,
    },
    cnvenFcltGuid: {
        type : String ,
        trim : true ,
    },
    urlAddr: {
        type : String ,
        trim : true ,
    },
    tourspotSumm: {
        type : String ,
        trim : true ,
    },
    mapLat: {
        type : Number ,
        trim : true ,
    },
    mapLot: {
        type : Number ,
        trim : true ,
    },
    imgUrl: {
        type : String ,
        trim : true , 
    },
    likeNo: {
        type : Number ,
        trim : true ,
    },
})

const Tourspot = mongoose.model('tourismData', tourismsSchema)
module.exports = Tourspot