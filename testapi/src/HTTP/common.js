/**
 * 系统后台管理系统全局前端数据逻辑处理
 * @author ipso
 */


/* ---------------  根据系统需求封装缓存操作begin  ---------------- */

let myType = 'sessionStorage'  // 系统选择的本地缓存类型
// let myType = 'localStorage'
/**
 * 使用本地缓存
 */
function setCache(key, value, type = myType) {
	if (type == 'localStorage') {
		return cacheByLocal(key, value)
	}
	return cacheBySession(key, value)
}

/**
 * 使用localStorage 作为浏览器本地缓存
 * @param { 缓存key值，索引值 } key 
 * @param { 缓存值 } value 
 */
function cacheByLocal(key = '', value = '') {
	if (typeof (value) == 'Object') { // 如果value为json格式，将其转化为字符串再存数据
		var newStr = JSON.stringify(value)
		localStorage.setItem(key, newStr)
		return true
	}
	localStorage.setItem(key, value)
	return true
}

/**
 * 使用sessionStorage 作为浏览器本地缓存
 * @param { 缓存key值，索引值 } key 
 * @param { 缓存值 } value 
 */
function cacheBySession(key = '', value = '') {
	// if (typeof (value) != 'String'){
	// 	return false
	// }
	return sessionStorage.setItem(key, value)
}

/**
 * 获取缓存数据
 * @param { 缓存类型，local/session } type 
 * @param { 缓存key值 } key 
 */
function getCache(key, type = myType) {
	if (type == 'localStorage') {
		return localStorage.getItem(key)
	}
	return sessionStorage.getItem(key)
}

/**
 * 清除缓存
 * @param { 缓存类型，localStorage/sessionStorage } type
 * @param { 缓存key值 } key 
 */
function removeCache(key, type = myType) {
	if (type == 'localStorage') {
		return localStorage.removeItem(key)
	}
	return sessionStorage.removeItem(key)
}

/* ---------------  根据系统需求封装缓存操作end  ---------------- */

/**
 * 定义分页配置
 * @returns
 */
function getPageNum() {
	let num = 10
	return num
}



/* ------------   暴露方法   -------------- */
export default {
	setCache,
	getCache,
	removeCache,
	getPageNum,
}