/**
 * 前后台数据交互
 * @author ipso
 */

import axios from 'axios'

/* 无需跨域时将此处注释代码取消注释 */
// let URL = 'http://www.host.com'
// let HOST_ROOT = URL

// 使用代理跨域
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

/**
 * 用户登录
 * @param {*} user 用户名
 * @param {*} pass 用户密码
 */
function Login(user,pass){
	let url = HOST_ROOT + '/?s=User.Login';
	return axios.get(url, {
		params:{
			username: user,
			password: pass,
		}
	})
} 

/**
 * 用户注册
 * @param {*} data 用户注册信息
 */
function Register(data){ 
	let url = HOST_ROOT + '/?s=User.Register'
	return axios.post(url, data) 
}
 
/* 暴露方法 */
export default {  
	Login,
	Register,
}