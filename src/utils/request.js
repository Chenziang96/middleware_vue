import axios from 'axios'
import router from '../router/index'
import store from '../store/index.js'


axios.interceptors.response.use((response) => {
  return response
}, (error) => {
  if (error.response) {
    switch (error.response.status) {
      // case 404:
      //   // 这里写清除token的代码
      //   router.replace({
      //     path: '/404',
      //     query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
      //   })
      case 401:
        // 这里写清除token的代码
        // localStorage.removeItem('isLogin');
        // store.commit('deleteLogin');
        // router.replace({
          // path: '/login',
          // query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
        // })
      // case 500:
      //   // 这里写清除token的代码
      //   router.replace({
      //     path: '/500',
      //     query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
      //   })
    }
  }
  return Promise.reject(error)
});
let config = {
  //添加请求头
  headers: {"Content-Type": "multipart/form-data"},
};
export default {
  /**
   * get方法，对应get请求
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */

  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: params,
      }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  },
  /**
   * post方法，对应post请求
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
  post(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  put(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.put(url, params).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  delete(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.delete(url, {data: params}).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  postData(url,params={},config={}){
    return new Promise((resolve, reject) => {
      axios.post(url, params,config).then(res => {
        resolve(res.data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}
