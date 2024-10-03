<template>
  <div class="login_main" ref="vantaRef">
    <div class="title">國立陽明交通大學</div>
    <div class="subTitle">圖書館空間預約系統</div>
    <div class="box">
        <div class="box_title">使用者登入</div>
        <div class="inputBox">
            <div class="inputTitle">電子信箱</div>
            <el-input placeholder="請輸入電子信箱" v-model="mail" clearable></el-input>
        </div>
        <div class="inputBox">
            <div class="inputTitle">密碼</div>
            <el-input placeholder="請輸入密碼" v-model="password" show-password></el-input>
        </div>
        <div class="loginBox">
            <el-button type="primary" class="btn" @click="login()" :loading="isloading">{{ isloading?'登入中...':'註冊 / 登入' }}</el-button>
        </div>
    </div>
    <div class="text">本系統目前由國立清華大學工科系四年級「林英豪」所設計以及維護。</div>
    <div class="text">採用 Vue 以及 MongoDB 技術開發而成，可以有效的轉移至各校作使用。</div>
    <div class="text">聯絡方式：blc0000421@gmail.com</div>
  </div>
</template>

<script>
import axio from 'axios'
import jsCookie from 'js-cookie'
import NET from 'vanta/dist/vanta.net.min'
export default {
    name:'Login',
    data(){
        return{
            mail:'',
            password:'',
            isloading:false,
        }
    },
    mounted() {
        this.vantaEffect = NET({
            el: this.$refs.vantaRef,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0xf7f7f7,
            backgroundColor: 0x0
        })
    },
    computed:{
        checkInput(){
            if(this.mail.trim()=='') return {status:false,msg:'帳號不可為空！'}
            else if(this.password.trim()=='') return {status:false,msg:'密碼不可為空！'}
            else return {status:true, msg:'登入中，請稍候！'}
        }
    },
    methods:{
        login(){
            this.isloading = true;
            if(this.checkInput.status){
                axio.post('/verify/login',{
                    mail:this.mail,
                    password:this.password
                })
                .then(res=>{
                    if(res.data.status=='success'){
                        jsCookie.set('nycuTk',res.data.token);
                        console.log(res.data.token)
                        this.$router.replace('/main').catch(()=>{});
                    }
                    else this.$bus.$emit('handleAlert','登入失敗','error',res.data.message);
                })
                .catch(e=>{
                    this.$bus.$emit('handleAlert','登入系統錯誤','error','請洽詢系統管理員！');
                })
            }
            else this.$bus.$emit('handleAlert','登入警示信息','error',this.checkInput.msg);
            this.isloading = false;
        }
    }
}
</script>

<style scoped>
    .login_main{
        padding-top: 40px;
        width: 100vw;
        height: 100vh;
        background: black;
        color: white;
    }
    .title{
        font-size: 58px;
        font-weight: bolder;
        text-align: center;
        line-height: 100px;
        background: white;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-shadow: 3px 3px 10px rgba(255, 255, 255, 0.891), 2px 2px 4px rgba(0, 0, 0, 0.1);
        
    }
    .subTitle{
        font-size: 24px;
        text-align: center;
        line-height: 40px;
        background: white;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-shadow: 3px 3px 10px rgba(255, 255, 255, 0.891), 2px 2px 5px rgba(0, 0, 0, 0.1);
    }
    .box{
        width: 530px;
        height: 400px;
        border-radius: 15px;
        margin: 0 auto;
        margin-top: 30px;
        margin-bottom: 30px;
        background: rgba(255,255,255,0.25);
    }
    .box_title{
        text-align: center;
        height: 90px;
        line-height: 90px;
        font-size: 32px;
    }
    .inputBox{
        width: 80%;
        margin: 0 auto;
        margin-top: 25px;
    }
    .inputTitle{
        font-size: 12px;
        margin-bottom: 10px;
    }
    .loginBox{
        width: 80%;
        margin: 0 auto;
        margin-top: 40px;
    }
    .btn{
        width: 100%;
        background: transparent;
        border: 1px solid white;
    }
    .btn:hover{
        background: white;
        color: black;
        border: 1px solid black;
    }
    .text{
        width: 530px;
        margin: 0 auto;
        height: 30px;
    }
</style>