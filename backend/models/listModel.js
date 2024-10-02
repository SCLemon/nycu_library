//导入 mongoose
const mongoose = require('mongoose');

// 创建文档结构
const listSchema = new mongoose.Schema({
    token:String,
    reserve:[{
        date:String,
        content:String
    }]
});

//创建模型对象
const listModel = mongoose.model('list', listSchema);

//暴露
module.exports = listModel;