import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
		{
			path: '/',
			redirect: '/index',
		},
		// {
		// 	path: '/home',
		// 	name: 'Home',
		// 	component: resolve => require(['../components/home.vue'], resolve)
		// },
		{
			path: '/index',
			name: 'Index',
			component: resolve => require(['../Page/index.vue'], resolve),
			redirect: '/Article/list',
			children:[
				{
					path: "/Article/list",
					component: resolve => require(['../Page/articleList.vue'], resolve),
				},
				{
					path: "/About",
					component: resolve => require(['../Page/about.vue'], resolve),
				},
				{
					path: "/AddFriend",
					component: resolve => require(['../Page/addFriend.vue'], resolve),
				},
				{
					path: "/User/aplay",
					component: resolve => require(['../user/add.vue'], resolve),
				},
			]
		},
  ]
})
