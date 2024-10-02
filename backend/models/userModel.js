//导入 mongoose
const mongoose = require('mongoose');

// 创建文档结构
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

//创建模型对象
const userModel = mongoose.model('users', userSchema);

//暴露
module.exports = userModel;