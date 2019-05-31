// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import api from './HTTP/main'
import iView from 'iview'
import { Alert, Icon, Button, Modal, Tree, Message, Loader } from 'iview'
import 'iview/dist/styles/iview.css'
import commonjs from './HTTP/common'

/* 在组件中使用axios请求接口 */
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = Axios
Vue.prototype.HOST   = '/api' // 代理api,并挂载到原型上

Vue.config.productionTip = false

/* 在HTTP/main中完成的请求 */
Vue.prototype.$api = api
Vue.prototype.$commonjs = commonjs

Vue.use(iView);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
