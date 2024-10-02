const { v4: uuidv4 } = require('uuid');
const userModel = require('../models/userModel');

const express = require('express');
const router = express.Router();

// 驗證
router.post('/verify/login',(req, res) => {
  var mail = req.body.mail;
  var password = req.body.password;
    req.body.token = uuidv4();
    userModel.findOne({mail:mail})
    .then((data,err)=>{
      if(!data){
        // 創建新帳號
        userModel.create(req.body)
        .then((data, err) => {
          if (err) res.status(200).send('帳號創建失敗')
          else {
            res.status(200).send({
              status:'success',
              message:'帳號創建成功',
              token:data.token
            })
          }
        })
      }
      else{
        // 驗證登入
        if(password == data.password){
          res.status(200).send({
            status:'success',
            message:'登入成功',
            token:data.token
          })
        }
        else res.status(200).send({
          status:'error',
          message:'帳號或密碼錯誤',
          token:''
        });
      }
    })
    .catch(e=>{
      res.status(200).send({
        status:'error',
        message:'帳號創建失敗',
        token:''
      });
    })
});

module.exports = router;