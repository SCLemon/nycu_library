<template>
    <div class="info_main">
      <div class="info_title">
          <i class="fa-solid fa-id-card icon"></i> 更新密碼
      </div>
      <div class="form">
          <div class="form_each">
              <div class="input_title">原密碼：</div>
              <el-input class="input" v-model="input.original" placeholder="請輸入原密碼" show-password></el-input>
          </div>
          <div class="form_each">
              <div class="input_title">新密碼：</div>
              <el-input class="input" v-model="input.new" placeholder="請輸入新密碼" show-password></el-input>
          </div>
          <div class="form_each">
              <div class="input_title">驗證密碼：</div>
              <el-input class="input" v-model="input.newAgain" placeholder="再輸入一次新密碼" show-password></el-input>
          </div>
      </div>
      <el-button type="primary" class="btn" @click="save()" :loading="isLoading">更新密碼</el-button>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  import jsCookie from 'js-cookie'
  export default {
      name:'Info',
      data(){
          return{
            input:{
                original:'',
                new:'',
                newAgain:''
            },
            isLoading:false,
          }
      },
      computed:{
          checkInput(){
              for(let key in this.input) if((this.input[key]).toString().trim()=='') return {status:false, msg:'資料不可為空'}
              if(this.input.new !== this.input.newAgain) return {status:false, msg:'二次新密碼輸入不同'}
              return {status:true}
          }
      },
      methods:{
          save(){
              if(this.checkInput.status){
                  axios.post(`/reset/password`,this.input,{
                      headers:{
                          token:jsCookie.get('nycuTk')
                      }
                  })
                  .then(res=>{
                      this.$bus.$emit('handleAlert','個人資料維護提示',res.data.status,res.data.msg)
                      this.input.original = '';
                      this.input.new = '';
                      this.input.newAgain = '';
                  })
              }
              else this.$bus.$emit('handleAlert','資料填寫提示','warning',this.checkInput.msg);
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