<template>
    <div class="main">
        <SideBar class="sidebar"></SideBar>
        <router-view class="view"></router-view>
    </div>
</template>

<script>
import SideBar from './components/SideBar.vue'
export default {
    name:'Main',
    components:{
        SideBar
    }
}
</script>

<style scoped>
    .main{
        display: flex;
    }
    .sidebar{
        width: 360px;
        height: 100vh;
    }
    .view{
        width: calc(100vw - 360px);
        height: 100vh;
        padding-left: 30px;
        padding-right: 30px;
    }
</style>