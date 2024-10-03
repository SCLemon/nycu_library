const listModel = require('../models/listModel');
const roomModel = require('../models/roomModel');
const express = require('express');
const router = express.Router();
const {format} = require('date-fns');
const { uuid } = require('uuidv4');

// 獲取使用者預約記錄
router.get('/list/getReserve/:token',(req,res)=>{
    var token = req.params.token
    listModel.findOne({token:token})
    .then((data,err)=>{
        if(data) res.send(data.reserve)
        else res.send([])
    })
})

// 移除預約
router.post('/list/removeReserve',(req,res)=>{
    var token = req.headers['token'];
    var target = req.body.target;
    listModel.findOneAndUpdate({token:token},{reserve:req.body.list},{upsert:true})
    .then((data,err)=>{
        removeRoomReserve(target)
        res.send({
            status:'success',
            msg:'空間預約刪除成功！'
        })
    })
    .catch(e=>{
        res.send({
            status:'error',
            msg:'空間預約刪除失敗，請洽於管理員！'
        })
    })
})
// 同步移除空間預約狀態
function removeRoomReserve(target){
    roomModel.updateOne({'date.date':target.date ,'date.room.num':target.room,'date.room.detail.time':target.timeRegion},
        {
            $set: {
                'date.room.detail.$.owner': '',
                'date.room.detail.$.hasReserved': false
            }
        }
    )
    .then((data,err)=>{})
    .catch(e=>{})
}

// 空間預約查詢
router.get('/list/get/:filter',(req,res)=>{
    var filter = JSON.parse(req.params.filter);
    roomModel.findOne({'date.date':format(filter.date,'yyyy-MM-dd') ,'date.room.num':filter.num})
    .then((data,err)=>{
        if(data == null) res.send('')
        else res.send(data)
    })
})

// 空間預約新增
router.post('/list/add',(req,res)=>{
    var token = req.headers['token'];
    var place = req.body.place;
    var timeRegion = req.body.timeRegion;
    var detail = req.body.detail;

    roomModel.findOneAndUpdate(
        { 'date.date':format(place.date,'yyyy-MM-dd'),'date.room.num': place.num },
        {
            $set: {
                'date.room.num': place.num,
                'date.room.status': true,
                'date.room.detail': detail
            }
        },
        { upsert: true, new: true }
    ).then((data,err)=>{
        addUserReserveList(token,place,timeRegion);
        res.send({status:'success', msg:'空間預約成功！'})
    })
    .catch(e=>{
        console.log(e)
        res.send({status:'error', msg:'空間預約失敗，請洽詢管理人員！'})
    })
})

// 空間預約同步至使用者紀錄
function addUserReserveList(token,place,timeRegion){
    var insert = {
        id: uuid(),
        date : format(place.date,'yyyy-MM-dd'),
        room:place.num,
        timeRegion:timeRegion,
        content:`已預約 ${place.num} ${place.type} ${timeRegion}`
    }
    listModel.findOne({ token: token })
    .then((doc) => {
        if (doc) return listModel.findOneAndUpdate({ token: token },{ $push: { reserve: insert } });
        else return listModel.create({token: token ,reserve: [insert]});
    })
    .then((data) => {})
    .catch((err) => {});
}
module.exports = router;