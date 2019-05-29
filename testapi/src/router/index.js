import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
		// },
		// {
		// 	path: '/',
		// 	name: 'Register',
		// 	component: Register
		// },

		{
			path: '/',
			redirect: '/home',
		},
		{
			path: '/home',
			name: 'Home',
			component: resolve => require(['../components/home.vue'], resolve)
		},
		{
			path: '/index',
			name: 'Index',
			component: resolve => require(['../Page/index.vue'], resolve)
		},

		// {
		// 	path: '/Page/index',
		// 	name: 'Home',
		// 	component: Home
		// }
  ]
})
