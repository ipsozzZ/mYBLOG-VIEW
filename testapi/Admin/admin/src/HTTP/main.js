/**
 * 前后台数据交互
 * 注意：添加function时取名请避免方法名出现耦合
 * @author ipso
 */

import axios from 'axios'
import common from './common'

/* 无需跨域时将此处注释代码取消注释 */
// let URL = 'http://www.host.com'
// let HOST_ROOT = URL


/* 需要跨域时将此处注释代码取消注释 */
let HOST_ROOT = '/api'

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

/**
 * 删除一条记录
 * @param { 文章id } Id
 * @returns
 */
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

/**
 * 发布一篇文章
 * @param { 文章id } Id
 * @returns
 */
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

/**
 * 获取所有文章的id和title字段
 * @returns
 */
function getAllArticle(){
	let url = HOST_ROOT + '/?s=Article.getAll'
	return axios({
		method: 'get',
		url: url,
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
function getUserCount(){
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


/* --------------  配置操作begin  ---------------- */

/**
 * 添加/更新站点配置信息
 * @param { 站点配置信息 } data
 * @returns
 */
function addConfig(Id, data){
	let url = HOST_ROOT + '/?s=Config.add'
	data.id = Id
	return axios({
		method: 'post',
		url: url,
		data: data
	})
}

/**
 * 获取配置信息Id(数据库只存一条配置信息)
 */
function getId(){
	let url = HOST_ROOT + '/?s=Config.getId'
	return axios({
		method: 'get',
		url: url,
	})
}

/**
 * 获取当前站点配置信息
 * @param { 配置信息id } Id
 * @returns
 */
function getConfig(Id){
	let url = HOST_ROOT + '/?s=Config.getCof'
	return axios({
		method: 'post',
		url: url,
		data: {
			id: Id
		}
	})
}

/* --------------  配置操作end  ---------------- */


/* --------------  友情链接操作begin  ---------------- */

/**
 * 获取友链列表
 * @returns 友链列表对象
 */
function getfriends(){
	let url = HOST_ROOT + '/?s=Friendlink.getList'
	return axios({
		method: 'get',
		url: url,
	})
}

/**
 * 添加一条友情链接
 * @param { 友链信息 } data
 * @returns
 */
function addFriend(data){
	let url = HOST_ROOT + '/?s=Friendlink.add'
	return axios({
		method: 'post',
		url: url,
		data: data,
	})
}

/**
 * 更新一条友情链接
 * @param { 友链信息 } data
 * @returns
 */
function editFriend(data) {
	let url = HOST_ROOT + '/?s=Friendlink.update'
	return axios({
		method: 'post',
		url: url,
		data: data,
	})
}

/**
 * 获取一条友情链接
 * @param { 友链id } Id
 * @returns
 */
function getFriend(Id) {
	let url = HOST_ROOT + '/?s=Friendlink.getById'
	return axios({
		method: 'post',
		url: url,
		data: {
			id: Id
		}
	})
}

/**
 * 删除一条友情链接
 * @param { 友链id } Id
 * @returns
 */
function deleteFriend(Id) {
	let url = HOST_ROOT + '/?s=Friendlink.delete'
	return axios({
		method: 'post',
		url: url,
		data: {
			id: Id
		}
	})
}

/* --------------  友情链接操作end  ---------------- */


/* --------------  评论操作begin  ---------------- */

/**
 * 获取所有评论数
 * @returns
 */
function getCommentCount(){
	let url = HOST_ROOT + '/?s=Comment.getCount'
	return axios({
		method: 'get',
		url: url
	})
}

/**
 * 通过文章id获取评论数
 * @param { 文章id } aid
 * @returns
 */
function getCountByArticle(aid){
	let url = HOST_ROOT + '/?s=Comment.getCountByArticle'
	return axios({
		method: 'post',
		url: url,
		data: {
			aid: aid
		}
	})
}

/**
 * 获取文章列表
 * @param { 当前页 } page
 * @param { 每页数量 } num
 * @returns
 */
function getCommentList(page, num){
	let url = HOST_ROOT + '/?s=Comment.getList'
	return axios({
		method: 'post',
		url: url,
		data: {
			page: page,
			num: num
		}
	})
}

/**
 * 通过文章id获取评论列表
 * @param { 文章id } aid
 * @param { 当前页 } page
 * @param { 每页数量 } num
 * @returns
 */
function getListByArticle(aid, page, num) {
	let url = HOST_ROOT + '/?s=Comment.getListByArticle'
	return axios({
		method: 'post',
		url: url,
		data: {
			aid: aid,
			page: page,
			num: num
		}
	})
}

/**
 * 删除一条评论
 * @param { 评论id } Id
 * @returns
 */
function deleteComment(Id){
	let url = HOST_ROOT + '/?s=Comment.delete'
	return axios({
		method: 'post',
		url: url,
		data: {
			id: Id,
		}
	})
}

/**
 * 更新一条评论
 * @param { 评论信息 } data
 * @returns
 */
function editComment(data){
	let url = HOST_ROOT + '/?s=Comment.update'
	return axios({
		method: 'post',
		url: url,
		data: data,
	})
}

/**
 * 通过id获取一条评论
 * @param { 评论id } Id
 * @returns
 */
function getComment(Id){
	let url = HOST_ROOT + '/?s=Comment.getById'
	return axios({
		method: 'post',
		url: url,
		data: {
			id: Id,
		}
	})
}

/* --------------  评论操作end  ---------------- */

/* --------------  文件上传操作begin  ---------------- */

/**
 * 图片上传
 * @param { 文件对象 } file
 * @returns
 */
function UploadImg(file){
	let url = HOST_ROOT + '/?s=Upload.uploadImg'
	return axios({
		method: 'post',
		url: url,
		transformRequest: [function (file) { return file }],
		data: file
	})
}

/**
 * 获取图片数量
 * @param { 图片分类(可选参数) } [type=null]
 * @returns
 */
function getPicCount(type){
	let url = HOST_ROOT + '/?s=Picture.getCount'
	if(type == null){
		return axios({
			method: 'post',
			url: url,
		})
	}
	return axios({
		method: 'post',
		url: url,
		data: {
			type: type
		}
	})
}

/**
 * 通过图片id获取一张图片信息
 * @param {*} Id
 * @returns
 */
function getPicById(Id){
	let url = HOST_ROOT + '/?s=Picture.getById'
	return axios({
		method: 'post',
		url: url,
		data: {
			id: Id
		}
	})
}

/**
 * 获取图片列表
 * @param { 图片分类 } page
 * @param { 每页数量 } num
 * @param { 当前页码 } [type=null]
 * @returns
 */
function getPicList(page, num, type) {
	let url = HOST_ROOT + '/?s=Picture.getList'
	if(type == null){
		return axios({
			method: 'post',
			url: url,
			data: {
				page: page,
				num: num
			}
		})
	}
	return axios({
		method: 'post',
		url: url,
		data: {
			type: type,
			page: page,
			num: num
		}
	})
}

/**
 * 根据id删除图片
 * @param { 图片id } Id
 * @returns
 */
function deletePic(Id){
	let url = HOST_ROOT + '/?s=Picture.delete'
	return axios({
		method: 'post',
		url: url,
		data: {
			id: Id
		}
	})
}

/**
 * 通过图片分类获取图片
 * @param { 图片分类 } type
 * @returns
 */
function getPicByType(type){
	let url = HOST_ROOT + '/?s=Picture.getByType'
	return axios({
		method: 'post',
		url: url,
		data: {
			type: type,
		}
	})
}

/* --------------  文件上传操作end  ---------------- */



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
	getAllArticle,
	getCates,
	addCate,
	deleteCate,
	getCate,
	editCate,
	getuserList,
	getUserCount,
	addUser,
	deleteuser,
	editUser,
	getUser,
	addConfig,
	getId,
	getConfig,
	getfriends,
	addFriend,
	editFriend,
	getFriend,
	deleteFriend,
	getCommentCount,
	getCountByArticle,
	getCommentList,
	getListByArticle,
	deleteComment,
	editComment,
	getComment,
	UploadImg,
	getPicCount,
	deletePic,
	getPicList,
	getPicById,
	getPicByType,
}