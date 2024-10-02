const userModel = require('../models/userModel');

const express = require('express');
const router = express.Router();

// router 驗證權限
router.post('/reset/password',(req,res)=>{
    var token = req.headers['token']
    userModel.updateOne({token:token,password:req.body.original},{
        password:req.body.new
    })
    .then((data,err)=>{
        if(data.modifiedCount) res.send({status:'success',msg:'密碼更新成功!'});
        else if(data.matchedCount) res.send({status:'warning',msg:'密碼尚無變動!'});
        else res.send({status:'error',msg:'密碼變更失敗!'});
    })
})

module.exports = router;