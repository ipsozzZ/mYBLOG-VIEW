import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
			redirect: '/login',
		},
		{
			path: '/login',
			component: resolve => require(['../components/Page/Login.vue'],resolve)
		},
		{
			path: "/index",
			component: resolve => require(["../components/index.vue"],resolve),
			children:[
				{
					path: "/HomeCard",
					component: resolve => require(["../components/Common/HomeCard.vue"], resolve)
				},
				{
					path: "/Message/List",
					component: resolve => require(["../components/Message/list.vue"], resolve)
				},
				{
					path: "/Message/Add",
					component: resolve => require(["../components/Message/add.vue"], resolve)
				},
				{
					path: "/Message/info",
					component: resolve => require(["../components/Message/info.vue"], resolve)
				},
				{
					path: "/User/List",
					component: resolve => require(["../components/User/list.vue"], resolve)
				},
				{
					path: "/User/Add",
					component: resolve => require(["../components/User/add.vue"], resolve)
				},
			]
		},
		
  ]
})
