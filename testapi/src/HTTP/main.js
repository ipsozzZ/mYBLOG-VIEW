/**
 * 前后台数据交互
 * @author ipso
 */

import axios from 'axios'

// 使用代理跨域
/* 需要跨域时将此处注释代码取消注释 */
let HOST_ROOT = '/api'

/* 设置axios为form-data */
axios.defaults.transformRequest = [function (data) {
	let ret = ''
	for (let it in data) {
		ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
	}
	return ret
}]

/* ------------------  用户begin  -------------------- */

/**
 * 用户登录
 * @param { 用户名 } user
 * @param { 用户密码 } pass
 */
function Login(user,pass){
	let url = HOST_ROOT + '/?s=User.login';
	return axios({
		method: 'post',
		url: url,
		data: {
			name: user,
			pass: pass,
		}
	})
} 

/**
 * 通过用户id获取用户信息
 * @param { 用户id } Id
 * @returns
 */
function getUser(Id){
	let url = HOST_ROOT + '/?s=User.getById'
	return axios({
		method: 'post',
		url: url,
		data: {
			id: Id
		}
	})
}

/**
 * 通过用户名获取用户信息
 * @param { 用户名 } Name
 * @returns
 */
function getUserByName(Name){
	let url = HOST_ROOT + '/?s=User.getByName'
	return axios({
		method: 'post',
		url: url,
		data: {
			name: Name
		}
	})
}

/**
 * 用户注册
 * @param {*} data 用户信息
 * @returns
 */
function addUser(data){
	let url = HOST_ROOT + '/?s=User.add'
	return axios({
		method: 'post',
		url: url,
		data: data
	})
}

/* ------------------  用户end  -------------------- */

/* ------------------  用户begin  -------------------- */

/**
 * 获取友情链接列表
 * @returns
 */
function getFriends(){
	let url = HOST_ROOT + '/?s=Friendlink.getFriends'
	return axios({
		method: 'get',
		url: url,
	})
}

/**
 * 申请友链
 * @param { 友链信息 } data
 * @returns
 */
function aplayFriend(data){
	let url = HOST_ROOT + '/?s=Friendlink.add'
	return axios({
		method: 'post',
		url: url,
		data: data
	})
}

/* ------------------  用户end  -------------------- */

/* ------------------  站点配置begin  -------------------- */

/**
 * 获取站点配置信息
 * @param { 配置id } Id
 * @returns
 */
function getConfigs(Id){
	let url = HOST_ROOT + '/?s=Config.getCof'
	return axios({
		method: 'post',
		url: url,
		data: {
			id: Id
		}
	})
}

/**
 * 获取站点配置id
 * @returns
 */
function getConfigId(){
	let url = HOST_ROOT + '/?s=Config.getId'
	return axios({
		method: 'get',
		url: url
	})
}

/* ------------------  站点配置end  -------------------- */

/* ------------------  栏目begin  -------------------- */

/**
 * 获取栏目列表
 * @returns
 */
function getCates(){
	let url = HOST_ROOT + '/?s=Category.getList'
	return axios({
		method: 'post',
		url: url
	})
}

/**
 * 通过id获取栏目信息
 * @param {Number} Id 栏目id
 * @returns
 */
function getCateById(Id){
	let url = HOST_ROOT + '/?s=Category.getById'
	return axios({
		method: 'post',
		url: url,
		data: {
			id: Id,
		}
	})
}

/* ------------------  栏目end  -------------------- */

/* ------------------  文章begin  -------------------- */

/**
 * 获取文章数量
 * @returns
 */
function countArticle(){
	let url = HOST_ROOT + '/?s=Article.getArtsCount'
	return axios({
		method: 'get',
		url: url
	})
}

/**
 * 获取文章列表
 * @param {number} [page=1] 当前页
 * @param {number} [num=10] 每页数量
 * @param {number} [cate=0] 文章分类id
 * @returns
 */
function getArticles(page = 1, num = 10, cate = 0){
	if(cate === 0){
		let url = HOST_ROOT + '/?s=Article.getArts'
		return axios({
			method: 'post',
			url: url,
			data:{
				page: page,
				num: num
			}
		})
	}
	let url = HOST_ROOT + '/?s=Article.getListByCate'
	return axios({
		method: 'post',
		url: url,
		data: {
			page: page,
			num: num,
			cate: cate
		}
	})
}

/**
 * 通过id获取文章详情
 * @param {Number} Id 文章id
 * @returns
 */
function getArtById(Id){
	let url = HOST_ROOT + '/?s=Article.getById'
	return axios({
		method: 'post',
		url: url,
		data: {
			id: Id,
		}
	})
}

/**
 * 增加文章like
 * @param {Number} Id 文章id
 * @returns
 */
function addArtLike(Id){
	let url = HOST_ROOT + '/?s=Article.addLike'
	return axios({
		method: 'post',
		url: url,
		data: {
			id: Id
		}
	})
}

/**
 * 增加文章Comment
 * @param {Number} Id 文章id
 * @returns
 */
function addArtComment(Id){
	let url = HOST_ROOT + '/?s=Article.addComment'
	return axios({
		method: 'post',
		url: url,
		data: {
			id: Id,
		}
	})
}

/* ------------------  文章end  -------------------- */

/* ------------------  评论begin  -------------------- */

/**
 * 添加一条评论
 * @param {Array} data 评论信息
 * @returns
 */
function addComment(data){
	let url = HOST_ROOT + '/?s=Comment.add'
	return axios({
		method: 'post',
		url: url,
		data: data
	})
}

/**
 * 获取文章所有评论
 * @param {Number} aid 文章id
 * @returns
 */
function getComments(aid){
	let url = HOST_ROOT + '/?s=Comment.getAllByArt'
	return axios({
		method: 'post',
		url: url,
		data:{
			aid: aid
		}
	})
}

/**
 * 获取文章默认显示的评论列表
 * @param {Number} aid 文章id
 * @returns
 */
function getDefaultComment(aid){
	let url = HOST_ROOT + '/?s=Comment.getDefaultByArt'
	return axios({
		method: 'post',
		url: url,
		data: {
			aid: aid
		}
	})
}

/* ------------------  评论end  -------------------- */
 
/* 暴露方法 */
export default {  
	Login,
	getFriends,
	aplayFriend,
	getConfigs,
	getConfigId,
	getUser,
	getUserByName,
	addUser,
	getCates,
	getCateById,
	countArticle,
	getArticles,
	addArtLike,
	addArtComment,
	getArtById,
	addComment,
	getComments,
	getDefaultComment,
}