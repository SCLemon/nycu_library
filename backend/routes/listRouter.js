const listModel = require('../models/listModel');

const express = require('express');
const router = express.Router();

router.get('/list/getReserve/:token',(req,res)=>{
    var token = req.params.token
    listModel.findOne({token:token})
    .then((data,err)=>{
        res.send(data.reserve)
    })
})

router.post('/list/removeReserve',(req,res)=>{
    var token = req.headers['token'];
    listModel.findOneAndUpdate({token:token},{reserve:req.body.list},{upsert:true})
    .then((data,err)=>{
       res.send('success')
    })
})

module.exports = router;