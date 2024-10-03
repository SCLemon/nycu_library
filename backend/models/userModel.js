// 讀取使用者個人資料
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    token:String,
    mail:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        default:'',
    },
    stuID:{
        type: String,
        default:'',
    },
    gender:{
        type: String,
        default:'',
    },
    birthday:{
        type: String,
        default:'',
    },
    phone:{
        type: String,
        default:'',
    },
    readPermission:{
        type: Boolean,
        default:false,
    }
});


const userModel = mongoose.model('users', userSchema);


module.exports = userModel;