import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Home from '@/components/home'

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
			name: 'Home',
			component: Home
		}
  ]
})
