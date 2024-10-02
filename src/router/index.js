import Vue from 'vue'
import VueRouter from 'vue-router'
import jsCookie from 'js-cookie'
import axios from 'axios'

import Main from '@/pages/Main/Main.vue'
import Home from '@/pages/Main/pages/Home.vue'
import Info from '@/pages/Main/pages/Info.vue'
import Password from '@/pages/Main/pages/Password.vue'
import Reserve from '@/pages/Main/pages/Reserve.vue'
import Login from '@/pages/Login/Login.vue'
Vue.use(VueRouter)
const router = new VueRouter({
    routes:[
        {
            path:'/main',
            component:Main,
            children:[
                {
                    path:'home',
                    component:Home
                },
                {
                    path:'info',
                    component:Info
                },
                {
                    path:'reserve',
                    component:Reserve
                },
                {
                    path:'password',
                    component:Password
                },
                {
                    path:'',
                    redirect:'home'
                }
            ]
        },
        {
            path:'/login',
            component:Login
        },
        {
            path:'/',
            redirect:'/main'
        }
    ]
})
router.beforeEach((to, from, next) => {
    const token = jsCookie.get('nycuTk');

    if (to.path !== '/login' && !token) {
      next('/login')
    } 

    else if(to.path.includes('/main') & to.path !=='/main/info'){
        axios.get(`/info/router/${token}`)
        .then(res=>{
            if(res.data) next();
            else{
                alert('個人資料填寫完畢後方可使用完整功能。')
                next('/main/info')
            }
        })
    }
    else next()
});
  
export default router