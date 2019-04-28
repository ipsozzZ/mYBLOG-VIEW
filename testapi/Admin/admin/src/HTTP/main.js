/**
 * 前后台数据交互
 * @author ipso
 */

import axios from 'axios'

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


/* --------------  管理员操作  ---------------- */

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
}