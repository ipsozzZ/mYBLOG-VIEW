
/**
 * 路由管理
 * @author ipso
 */


import Vue from 'vue'
import Router from 'vue-router'
import common from '../HTTP/common'

Vue.use(Router)

/* 路由规则 */
let router = new Router({
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
			meta: {
				requireAuth: true
			},
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
					path: "/Message/edit",
					component: resolve => require(["../components/Message/edit.vue"], resolve)
				},
				{
					path: "/User/List",
					component: resolve => require(["../components/User/list.vue"], resolve)
				},
				{
					path: "/User/add",
					component: resolve => require(["../components/User/add.vue"], resolve)
				},
				{
					path: "/Article/list",
					component: resolve => require(["../components/Article/list.vue"], resolve)
				},
				{
					path: "/Article/add",
					component: resolve => require(["../components/Article/add.vue"], resolve)
				},
				{
					path: "/Article/show/:id",
					component: resolve => require(["../components/Article/show.vue"], resolve)
				},
			]
		},
		
  ]
})

/**
 * 路由拦截登录
 */
router.beforeEach((to, from, next) => {
	if (to.matched.some(res => res.meta.requireAuth)){ // 判断是否需要登录权限
		if (common.getCache('m_user') && common.getCache('m_id')){
			next()
		}else{
			next({
				path: '/login',
				query: {redirect: to.fullPath}
			})
		}
	}else{
		next()
	}
})

export default router
