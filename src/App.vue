<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  mounted(){
    this.$bus.$on('handleAlert',this.handleAlert);
  },
  methods:{
    handleAlert(title,type,msg){
      this.$notify({
        title: title,
        message: msg,
        type: type
      });
    },
  }
}
</script>

<style>
  body{
    overflow: hidden;
  }
</style>
