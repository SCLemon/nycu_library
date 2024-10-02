<template>
  <div class="sidebar_main">
    <div class="title">NYCU 圖書館空間預約系統</div>
    <div class="linkBox">
        <router-link :class="{link:true, highlight:$route.path.includes('/main/home')}" :to="'/main/home'"><i class="fa-solid fa-house icon"></i> 主頁</router-link>
        <router-link :class="{link:true, highlight:$route.path.includes('/main/info')}" :to="'/main/info'"><i class="fa-solid fa-id-card icon"></i> 基本資料</router-link>
        <router-link :class="{link:true, highlight:$route.path.includes('/main/reserve')}" :to="'/main/reserve'"><i class="fa-solid fa-magnifying-glass icon mr1"></i> 空間預約</router-link>
        <router-link :class="{link:true, highlight:$route.path.includes('/main/password')}" :to="'/main/password'"><i class="fa-solid fa-terminal icon"></i> 更新密碼</router-link>
        <div class="link logout" @click="logout()"><i class="fa-solid fa-right-from-bracket icon mr1"></i> 登出</div>
    </div>
  </div>
</template>

<script>
import jsCookie from 'js-cookie';
export default {
    name:'SideBar',
    methods:{
        logout(){
            this.$confirm('確認是否登出系統？', '提示', {
                confirmButtonText: '確定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(() => {
                jsCookie.remove('nycuTk');
                this.$router.replace('/login');
            })
            .catch(() => {});
        }
    }
}
</script>

<style scoped>
    .sidebar_main{
        width: 100vw;
        height: 100vh;
        background: black;
        color: white;
    }
    .title{
        font-weight: bolder;
        height: 55px;
        font-size: 16px;
        line-height: 55px;
        padding-left: 20px;
    }
    .linkBox{
        display: flex;
        flex-direction: column;
    }
    .link{
        color: white;
        text-decoration: none;
        height: 45px;
        line-height: 45px;
        padding-left: 20px;
    }
    .highlight{
        background: white;
        color: black;
    }
    .link:hover{
        text-decoration: none;
        background: white;
        color: black;
    }
    .logout:hover{
        cursor: pointer;
    }
    .icon{
        margin-right: 10px;
    }
    .mr1{
        margin-right: 12px;
    }
</style>