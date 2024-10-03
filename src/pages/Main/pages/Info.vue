<template>
  <div class="info_main">
    <div class="info_title">
        <i class="fa-solid fa-id-card icon"></i> 基本資料
    </div>
    <div class="form">
        <div class="form_each">
            <div class="input_title">姓名：</div>
            <el-input class="input" v-model="user.name" placeholder="請輸入姓名"></el-input>
        </div>
        <div class="form_each">
            <div class="input_title">學號：</div>
            <el-input class="input" v-model="user.stuID" placeholder="請輸入學號" :disabled="!writeFirst"></el-input>
        </div>
        <div class="form_each">
            <div class="input_title">性別：</div>
            <el-input class="input" v-model="user.gender" placeholder="例如：男、女、不透露"></el-input>
        </div>
        <div class="form_each">
            <div class="input_title">出生年月日：</div> 
            <el-input class="input" v-model="user.birthday" placeholder="例如：1991/10/01"></el-input>
        </div>
        <div class="form_each">
            <div class="input_title">電子信箱：</div> 
            <el-input class="input" v-model="user.mail" placeholder="請輸入電子信箱" disabled></el-input>
        </div>
        <div class="form_each">
            <div class="input_title">行動電話：</div> 
            <el-input class="input" v-model="user.phone" placeholder="請輸入行動電話"></el-input>
        </div>
    </div>
    <el-button type="primary" class="btn" @click="save()" :loading="isLoading">儲存個人資料</el-button>
  </div>
</template>

<script>
import axios from 'axios'
import jsCookie from 'js-cookie'
export default {
    name:'Info',
    data(){
        return{
            tempStuId:'', // 檢查學號是否被更動。
            user:{
                name:'',
                stuID:'',
                gender:'',
                birthday:'',
                mail:'',
                phone:''
            },
            isLoading:false,
            writeFirst:true,
        }
    },
    computed:{
        checkInput(){
            for(let key in this.user) if((this.user[key]).toString().trim()=='') return false
            return true;
        }
    },
    mounted(){
        this.getInfo();
    },
    methods:{
        getInfo(){
            axios.get(`/info/get/${jsCookie.get('nycuTk')}`)
            .then(res=>{
                this.user = res.data;
                if(this.user.stuID!=''){
                    this.writeFirst= false;
                    this.tempStuId = this.user.stuID;
                }
                if(!res.data.readPermission) this.$bus.$emit('handleAlert','個人資料維護提示','warning','您尚未完成個人資料填寫！');
            })
        },
        save(){
            if(this.checkInput){
                if(!this.writeFirst && (this.tempStuId != this.user.stuID)) return; // 防止學號被更動。
                this.$confirm(`${this.writeFirst?'資料儲存後，學號即無法修改！':'確認是否儲存個人資料？'}`, '提示', {
                    confirmButtonText: '確定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post(`/info/revise`,this.user,{
                        headers:{
                            token:jsCookie.get('nycuTk')
                        }
                    })
                    .then(res=>{
                        this.getInfo();
                        this.$bus.$emit('handleAlert','個人資料維護提示',res.data.status,res.data.msg)
                    })
                }).catch(() => {})
            }
            else this.$bus.$emit('handleAlert','資料填寫提示','warning','資料不可為空。')
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
        border-bottom: 0.1px solid rgb(197, 197, 197);
        display: flex;
        justify-content: space-evenly;
    }
    .input_title{
        width: 20%;
    }
    .input{
        width: 80%;
    }
    .btn{
        margin-top: 20px;
    }
</style>