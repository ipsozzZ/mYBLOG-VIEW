
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
      path: '/Admin',
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

				/* 管理员 */
				{
					path: "/Manage/List",
					component: resolve => require(["../components/Manage/list.vue"], resolve)
				},
				{
					path: "/Manage/Add",
					component: resolve => require(["../components/Manage/add.vue"], resolve)
				},
				{
					path: "/Manage/info",
					component: resolve => require(["../components/Manage/info.vue"], resolve)
				},
				{
					path: "/Manage/edit",
					component: resolve => require(["../components/Manage/edit.vue"], resolve)
				},

				/* 用户 */
				{
					path: "/User/List",
					component: resolve => require(["../components/User/list.vue"], resolve)
				},
				{
					path: "/User/add",
					component: resolve => require(["../components/User/add.vue"], resolve)
				},
				{
					path: "/User/edit/:id",
					component: resolve => require(["../components/User/edit.vue"], resolve)
				},

				/* 文章 */
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
				{
					path: "/Article/edit/:id",
					component: resolve => require(["../components/Article/edit.vue"], resolve)
				},

				/* 栏目 */
				{
					path: "/Category/list",
					component: resolve => require(["../components/Category/list.vue"], resolve)
				},
				{
					path: "/Category/add",
					component: resolve => require(["../components/Category/add.vue"], resolve)
				},
				{
					path: "/Category/edit/:id",
					component: resolve => require(["../components/Category/edit.vue"], resolve)
				},

				/* 文件上传 */
				{
					path: "/Page/upload",
					component: resolve => require(["../components/Page/Upload.vue"], resolve)
				},

				/* 友情链接 */
				{
					path: "/Friend/list",
					component: resolve => require(["../components/Friend/list.vue"], resolve)
				},
				{
					path: "/Friend/add",
					component: resolve => require(["../components/Friend/add.vue"], resolve)
				},
				{
					path: "/Friend/edit/:id",
					component: resolve => require(["../components/Friend/edit.vue"], resolve)
				},

				/* 评论管理 */
				{
					path: "/Comment/list",
					component: resolve => require(["../components/Comment/list.vue"], resolve)
				},
				{
					path: "/Comment/edit/:id",
					component: resolve => require(["../components/Comment/edit.vue"], resolve)
				},

				/* 站点配置 */
				{
					path: "/Page/Config",
					component: resolve => require(["../components/Page/Config.vue"], resolve)
				},

				/* 图片管理 */
				{
					path: "/Page/Upload",
					component: resolve => require(["../components/Page/Upload.vue"], resolve)
				},
				{
					path: "/Picture/list",
					component: resolve => require(["../components/Picture/list.vue"], resolve)
				},
				{
					path: "/Picture/show/:id",
					component: resolve => require(["../components/Picture/show.vue"], resolve)
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
