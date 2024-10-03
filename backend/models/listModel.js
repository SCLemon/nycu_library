// 讀取使用者預約記錄
const mongoose = require('mongoose');


const listSchema = new mongoose.Schema({
    token:String,
    reserve:[{
        id:String,
        date:String,
        room:String,
        timeRegion:String,
        content:String,
    }]
});


const listModel = mongoose.model('list', listSchema);


module.exports = listModel;