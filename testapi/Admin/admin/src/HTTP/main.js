/**
 * 前后台数据交互
 * @author ipso
 */

import axios from 'axios'
import common from './common'

/* 无需跨域时将此处注释代码取消注释 */
// let URL = 'http://www.host.com'
// let HOST_ROOT = URL


/* 需要跨域时将此处注释代码取消注释 */
let HOST_ROOT = '/api'

/* 设置axios为form-data */
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = [function (data) {
	let ret = ''
	for (let it in data) {
		ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
	}
	return ret
}]


/* --------------  用户操作  ---------------- */

/**
 * 用户登录
 * @param {*} user 用户名
 * @param {*} pass 用户密码
 */
function Login(user, pass) {
	let url = HOST_ROOT + '/?s=User.Login';
	return axios.get(url, {
		params: {
			username: user,
			password: pass,
		}
	})
}

/**
 * 用户注册
 * @param {*} data 用户注册信息
 */
function Register(data) {
	let url = HOST_ROOT + '/?s=User.Register'
	return axios.post(url, data)
}


/* --------------  管理员操作begin  ---------------- */

/**
 * 获取当前管理员信息
 * @returns
 */
function GetMessage() {
	let url = HOST_ROOT + '/?=Admin.GetMessage'
	return axios.post(url)
}

/**
 * 获取管理员列表
 * @returns 管理员列表
 */
function GetAdmins(){
	let url = HOST_ROOT + '/?s=Admin.GetAdmins'
	return axios.get(url)
}

/**
 * 管理员登录
 * @param { 管理员账号 } user 
 * @param { 管理员密码 } pass 
 */
function AdminLogin(user, pass){
	let url = HOST_ROOT + '/?s=Admin.Login'
	return axios(
		{
			method: "post",
			url: url,
			data: {
				Manager: user,
				Pass: pass
			}
		}
	)
}

/**
 * 管理员退出登录
 */
function AdminLogout(){
	common.removeCache('m_user');
	common.removeCache('m_id');
	return true;
}

/**
 * 删除管理员
 */
function deleteAdmin(Id){
	let url = HOST_ROOT + '/?s=Admin.delete'
	let CurrId = common.getCache('m_id')
	return axios(
		{
			method: 'post',
			url: url,
			data: {
				Id: Id,
				CurrId: CurrId,
			}
		}
	)
}

/**
 * 改变管理员权限
 */
function changeLimit(Id){
	let url = HOST_ROOT + '/?s=Admin.giveLimit'
	return axios(
		{
			method: 'post',
			url: url,
			data:{
				Id: Id,
				CurrId: common.getCache('m_id'),
			}
		}
	)
}

/**
 * 添加管理员
 */
function addAdmin(data){
	let url = HOST_ROOT + '/?s=Admin.add'
	data.CurrId = common.getCache('m_id');
	return axios({
		method: 'post',
		url: url,
		data: data,
	})
}

/**
 * 修改管理员账号
 */
function editAdmin(data){
	let url = HOST_ROOT + '/?s=Admin.update'
	data.CurrId = common.getCache('m_id');
	return axios({
		method: 'post',
		url: url,
		data: data,
	})
}

/* --------------  管理员操作end  ---------------- */


/* --------------  文章操作begin  ---------------- */

/**
 * 添加文章
 * @param { 文章对象 } data
 * @returns
 */
function addArticle(data){
	let url = HOST_ROOT + '/?s=Article.add'
	return axios({
		method: 'post',
		url: url,
		data: data,
	})
}

/**
 * 分页获取文章列表
 * @param { 当前页 }   page
 * @param { 每页数量 } num
 * @returns
 */
function listArticle(page, num){
	let url = HOST_ROOT + '/?s=Article.getList'
	return axios({
		method: 'post',
		url: url,
		data: {
			page: page,
			num: num,
		}
	})
}

/**
 * 获取文章数量
 * @returns
 */
function countArticle(){
	let url = HOST_ROOT + '/?s=Article.getCount'

	return axios({
		method: 'get',
		url: url,
	})
}

/**
 * 通过id获取文章内容
 * @param { 文章id } id
 * @returns
 */
function getArticleById(id){
	let url = HOST_ROOT + '/?s=Article.getById'
	return axios({
		method: 'post',
		url: url,
		data: {
			id: id
		},
	})
}

/**
 * 更新文章内容
 * @param { 文章对象 } data
 * @returns
 */
function updateArticle(data){
	let url = HOST_ROOT + '/?s=Article.update'
	return axios({
		method: 'post',
		url: url,
		data: data,
	})
}

function deleteArticle(Id){
	let url = HOST_ROOT + '/?s=Article.delete'
	let currId = common.getCache('m_id')
	return axios({
		method: 'post',
		url: url,
		data: {
			id: Id,
			currId: currId,
		}
	})
}

function publishArticle(Id){
	let url = HOST_ROOT + '/?s=Article.publish'
	return axios({
		method: 'post',
		url: url,
		data: {
			id: Id
		}
	})
}

/* --------------  文章操作end  ---------------- */

/* --------------  栏目操作begin  ---------------- */

/**
 * 获取栏目列表
 * @returns
 */
function getCates(){
	let url = HOST_ROOT + '/?s=Category.getList'
	return axios({
		method: 'get',
		url: url,
	})
}

function addCate(data){
	let url = HOST_ROOT + '/?s=Category.add'
	return axios({
		method: 'post',
		url: url,
		data: data
	})
}

function deleteCate(Id){
	let url = HOST_ROOT + '/?s=Category.delete'
	return axios({
		method: 'post',
		url: url,
		data: {
			id: Id
		}
	})
}

/**
 * 获取栏目详情
 * @param { 栏目Id } Id
 * @returns
 */
function getCate(Id){
	let url = HOST_ROOT + '/?s=Category.getById'
	return axios({
		method: 'post',
		url: url,
		data: {
			id: Id
		}
	})
}

/**
 * 栏目编辑
 * @param { 栏目信息 } data
 * @returns
 */
function editCate(data){
	let url = HOST_ROOT + '/?s=Category.update'
	return axios({
		method: 'post',
		url: url,
		data: data,
	})
}

/* --------------  栏目操作end  ---------------- */

/* --------------  用户操作begin  ---------------- */

/**
 * 获取用户列表
 * @param { 当前页码 } page
 * @param { 每页数量 } num
 * @returns
 */
function getuserList(page, num){
	let url = HOST_ROOT + '/?s=User.getList'
	return axios({
		method: 'post',
		url: url,
		data: {
			page: page,
			num: num,
		}
	})
}

/**
 * 获取用户数量
 * @returns
 */
function getCount(){
	let url = HOST_ROOT + '/?s=User.getCount'
	return axios({
		method: 'get',
		url: url
	})
}

/**
 * 添加用户
 * @param { 用户信息 } data
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

/**
 * 删除一条用户信息
 * @param { 用户id } Id
 * @returns
 */
function deleteuser(Id){
	let url = HOST_ROOT + '/?s=User.delete'
	return axios({
		method: 'post',
		url: url,
		data: {
			id: Id
		}
	})
}

/**
 * 编辑用户信息
 * @param { 更新后的用户信息 } data
 * @returns
 */
function editUser(data){
	let url = HOST_ROOT + '/?s=User.update'
	return axios({
		method: 'post',
		url: url,
		data: data
	})
}

/**
 * 通过id获取用户信息
 * @param {*} Id
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

/* --------------  用户操作end  ---------------- */

/**
 * 获取验证码
 * @returns
 */
function getCode(){
	let url = HOST_ROOT + '/?s=Admin.GetCode'
	return axios.get(url)
}

/* 暴露方法 */
export default {
	Login,
	Register,
	GetMessage,
	GetAdmins,
	AdminLogin,
	getCode,
	deleteAdmin,
	changeLimit,
	addAdmin,
	AdminLogout,
	editAdmin,
	addArticle,
	listArticle,
	countArticle,
	getArticleById,
	updateArticle,
	deleteArticle,
	publishArticle,
	getCates,
	addCate,
	deleteCate,
	getCate,
	editCate,
	getuserList,
	getCount,
	addUser,
	deleteuser,
	editUser,
	getUser,
}