const userModel = require('../models/userModel');

const express = require('express');
const router = express.Router();

// getInfo
router.get('/info/get/:token',(req,res)=>{
    var token = req.params.token;
    userModel.findOne({token:token})
    .then((data,err)=>{
        var output = {
            name:data.name,
            stuID:data.stuID,
            gender:data.gender,
            birthday:data.birthday,
            mail:data.mail,
            phone:data.phone,
            readPermission:data.readPermission
        }
        res.send(output)
    })
})
// router 驗證權限
router.get('/info/router/:token',(req,res)=>{
    var token = req.params.token;
    userModel.findOne({token:token})
    .then((data,err)=>{
        res.send(data.readPermission);
    })
})

router.post('/info/revise',(req, res) => {
    var token = req.headers['token'];
    var body = req.body
    body.readPermission = true;
    userModel.updateOne({token:token},body)
    .then((data,err)=>{
        if(data.modifiedCount) res.send({
            status:'success',msg:'資料更新成功！'
        });
        else if(data.matchedCount) res.send({
            status:'warning',msg:'資料尚未更動！'
        });
        else res.send({
            status:'error',msg:'資料更新失敗！'
        });
    });
});

module.exports = router;