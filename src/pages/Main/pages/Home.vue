<template>
    <div class="info_main">
      <div class="info_title">
        <i class="fa-solid fa-house icon"></i> 主頁
      </div>
      <div class="calendar">
        <el-calendar>
          <template
            slot="dateCell"
            slot-scope="{date, data}">
            <div class="eachBox">
              <p :class="isSelectedDate(data.day) ? 'is-selected' : ''">
                <div class="date">{{ data.day.split('-').slice(1).join('/') }}</div>
                <div class="contentBox">
                  <p v-for="(obj,id) in userData" :key="id" class="content" @click="deleteReserve(data.day,obj.content,obj.id,obj)">
                    <span v-if="obj.date == data.day">{{ obj.content }}</span>
                  </p>
                </div>
              </p>
            </div>
          </template>
        </el-calendar>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import jsCookie from 'js-cookie'

export default {
    name:'Home',
    data(){
      return{
        userData:[],
        timer:0,
      }
    },
    mounted(){
      this.getData();
      this.timer = setInterval(() => {
        this.getData();
      }, 5000);
      this.$nextTick(()=>{
        this.changeBtnText()
      })
    },
    methods:{
      getData(){
        axios.get(`/list/getReserve/${jsCookie.get('nycuTk')}`)
        .then(res=>{
          this.userData = res.data;
          console.log((res.data).sort((a,b)=>{
            return a.timeRegion.split(':')[0] - b.timeRegion.split(':')[0]
          }))
        })
      },
      changeBtnText(){
        var el = document.querySelectorAll('.el-button--mini')
        el[0].innerText = '上個月'
        el[1].innerText = '今天'
        el[2].innerText = '下個月'
      },
      isSelectedDate(date){
        return this.userData.some(item=>item.date == date);
      },
      deleteReserve(date,content,id,target){
        this.$confirm(`確認是否刪除 ${date} ${content.match(/\d+/)[0]} 空間預約？`, '提示', {
          confirmButtonText: '確定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          this.userData = this.userData.filter(item=>item.id!=id);
          axios.post('/list/removeReserve',{
            target:target,
            list:this.userData
          },
          {
            headers:{
              token:jsCookie.get('nycuTk')
            }
          })
          .then(res=>{
            this.$bus.$emit('handleAlert','預約刪除提示',res.data.status,res.data.msg)
          })
          .catch(e=>{})
          .finally(()=>{
            this.getData()
          })
        })
        .catch(() => {});
      }
    },
    beforeDestroy(){
      clearInterval(this.timer);
    }
}
</script>

<style scoped>
  ::-webkit-scrollbar{
      display: none;
  }
  .info_title{
    height: 80px;
    line-height: 80px;
    font-size: 24px;
  }
  .calendar{
    margin-top: 5px;
  }
  .eachBox{
    width: 100%;
    height: 100%;
  }
  .date{
    margin-bottom: 8px;
  }
  .contentBox{
    height: 40px;
    overflow-y: scroll;
  }
  .content{
    font-size: 12px;
    line-height: 1.75;
    overflow-y:scroll;
  }
  .content:hover{
    background: #9acaf9;
    color: white;
  }
</style>