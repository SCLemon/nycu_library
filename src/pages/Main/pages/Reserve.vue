<template>
    <div class="">
        <div class="info_title">
            <i class="fa-solid fa-magnifying-glass icon mr1"></i> 空間預約
        </div>
        <div class="form">
            <div class="form_each">
                <div class="input_title">日期：</div>
                <el-date-picker class="input" style="width:80%" v-model="place.date" type="date"  placeholder="選擇日期" :picker-options="pickerOptions"></el-date-picker>
            </div>
            <div class="form_each" v-if="place.date!=''">
                <div class="input_title">類型：</div>
                <el-select v-model="place.type" placeholder="請選擇" class="input">
                    <el-option v-for="item in roomTypes" :key="item.value" :label="item.label" :value="item.label">
                        <span style="float: left">{{ item.label }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                    </el-option>
                </el-select>
            </div>
            <div class="form_each" v-if="place.type!=''">
                <div class="input_title">空間：</div>
                <el-select v-model="place.num" placeholder="請選擇" class="input">
                    <el-option v-for="item in roomSelection" :key="item.value" :label="item.label" :value="item.value">
                        <span style="float: left">{{ item.label }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="list">
            <button :class="`listEach ${(obj.hasReserved || (!compareDate && obj.hour<= new Date().getHours()))?'disabled':'enabled'}`" @click="(obj.hasReserved || (!compareDate && obj.hour<= new Date().getHours()))?'':reserve(obj.idx,obj.time)" v-for="(obj,id) in showTime" :key="id">{{ obj.time }}</button>
        </div>
    </div>
  </template>

<script>
import axios from 'axios';
import jsCookie from 'js-cookie';
import {format, isAfter} from 'date-fns'
export default {
    name:'Reserve',
    data(){
        return{
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now()-86400000;
                },
            },
            place:{
                date:'',
                type:'',
                num:''
            },
            roomTypes:[
                {value: 'Research Room',label: '研究小間'},
                {value: 'Meeting Room',label: '討論室'},
                {value: 'Group Study Room',label: '團體室'},
                {value: 'Presentation Practice Room',label: '簡報練習室'},
                {value: 'Computer Learning Area',label: '電腦共學區'},
            ],
            roomNums:{
                '研究小間':[301,302,401,402,403,501,502],
                '討論室':[303,304,404,503,504],
                '團體室':[305,405,406,505],
                '簡報練習室':[306,407,506],
                '電腦共學區':[201,202,203],
            },
            showTime:[]
        }
    },
    watch:{
        'place.type':{
            deep:true,
            handler(){
                this.place.num='';
            }
        },
        place:{
            deep:true,
            handler(){
                this.showTime = [];
                if(this.place.type!='' && this.place.num!=''){
                    axios.get(`/list/get/${JSON.stringify(this.place)}`)
                    .then(res=>{
                        if(res.data == '') this.showTime = this.initTimes();
                        else this.showTime = res.data.date.room.detail;
                    })
                }
            }
        }
    },
    computed:{
        roomSelection(){
            var roomNums = this.roomNums[this.place.type];
            var output = roomNums.map(item=>{
                return {label:`Room ${item}`, value:item}
            })
            return output
        },
        compareDate(){
            return isAfter(this.place.date,new Date())
        }
    },
    methods:{
        initTimes(){ // 初始化第一次時間選擇 <-- 可自行調整
            var output = [];
            for(var i=8 ;i <= 20; i++){ // 8:00~21:00
                output.push({
                    idx:i-8,
                    hour:i,
                    time:`${i}:00 - ${i+1}:00`,
                    hasReserved:false
                })
            }
            return output
        },
        reserve(idx,time){
            this.$confirm(`確認是否預約時段 ${time}`, '提示', {
                confirmButtonText: '確定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.showTime[idx]['hasReserved'] = true;
                axios.post('/list/add',{
                    place:this.place,
                    timeRegion:this.showTime[idx]['time'],
                    detail:this.showTime
                },{
                    headers:{
                        'token':jsCookie.get('nycuTk')
                    }
                }).then(res=>{
                    this.$bus.$emit('handleAlert','空間預約提示',res.data.status,res.data.msg);
                });
            }).catch(() => {})
        }
    }
}
</script>

<style scoped>
    .info_title{
        height: 80px;
        line-height: 80px;
        font-size: 24px;
    }
    .form_each{
        font-size: 16px;
        line-height: 60px;
        height: 60px;
        display: flex;
        justify-content: space-evenly;
    }
    .input_title{
        width: 20%;
    }
    .input{
        width: 80%;
    }
    .list{
        width: 100%;
        margin-top: 20px;
        border-top: 0.1px solid rgba(0,0,0,0.3);
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 10px;
        width: 100%;
        padding-top: 20px;
    }
    .listEach{
        height: 50px;
        border-radius: 5px;
        line-height: 50px;
        text-align: center;
        border: 1px solid black;
        color: black;
        background: transparent;
    }
    .enabled:hover{
        cursor: pointer;
        background: black;
        border: white;
        color: white;
    }
    .disabled{
        cursor: not-allowed;
        background: rgba(210,210,210);
        border: white;
        color: white;
    }
</style>