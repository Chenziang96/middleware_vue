import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/login/login.vue'

Vue.use(Router)
//
import layout from '../views/layout/Layout'

export default new Router({
  routes: [
    {path: '/login', name: 'login', component: login, hidden: true},
    {
      path: '',
      component: layout,
      redirect: 'home',
      children: [{
        path: 'home',
        name: 'home',
        component: () => import('@/views/home/index'),
        meta: {title:'首页', icon:'home'}
      }]
    },
    {
      path:'/arrangement',
      component: layout,
      redirect: '/arrangement/register',
      name: 'arrangement',
      meta:{title:'中间件管理',icon:'order-setting'},
      children: [{
        path:'register',
        name:'register',
        component:() => import('@/views/arrangement/register'),
        meta:{title:'注册中心',icon:'product-attr'}
      },
        {
          path:'hystrix',
          name:'hystrix',
          component:() => import('@/views/arrangement/hystrix'),
          meta:{title:'熔断管理',icon:'product-attr'}
        },
      ]
    },

  ]
})
