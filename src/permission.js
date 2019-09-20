import router from './router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (store.state.isLogin === true) {  //检测token是否存在
      next({path:''});
    }
    else {
      next({
        // path: '/login',
        // query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else {
    next();
  }
})
router.afterEach(()=>{
  NProgress.done();
})
