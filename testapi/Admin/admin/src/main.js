// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import Axios from 'axios'
import api from './HTTP/main'
import { Alert, Icon, Button, Modal, Tree, Message, Loader } from 'iview'
import 'iview/dist/styles/iview.css'
import commonjs from './HTTP/common'
import VueSimplemde from 'vue-simplemde'
import 'simplemde/dist/simplemde.min.css'

/* 允许提交表单形式的数据到接口 */ // header('Access-Control-Allow-Origin:*');
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';

Vue.config.productionTip = false
Vue.use(iView)
Vue.prototype.$axios = Axios
// Vue.prototype.HOST = '/api'
Vue.prototype.$api = api
Vue.prototype.$commonjs = commonjs
Vue.prototype.$Message = Message
Vue.use(VueSimplemde)


/* eslint-disable no-new */
new Vue({
	mode: 'history',
	el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

