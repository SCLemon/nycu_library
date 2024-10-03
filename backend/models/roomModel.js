// 讀取使用者預約記錄
const mongoose = require('mongoose');


const roomSchema = new mongoose.Schema({
    date:{
        date:String,
        room:{
            num:String,
            status:{ // 全體可否預約
                type:Boolean,
                default:true
            },
            detail:[
                {
                    idx: String,
                    hour:Number,
                    time: String,
                    hasReserved: Boolean
                }
            ],
        }
    }
});


const roomModel = mongoose.model('room', roomSchema);


module.exports = roomModel;