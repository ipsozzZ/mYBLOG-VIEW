<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
   
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
			msg: 'Welcome to Your Vue.js App',
			user: ''
    }
	},
	created() {  // 生命周期函数，组件被创建的时候执行
		var url = this.HOST + '/?s=User.Login';
		console.log(url);
		this.$axios.get(url,{
		params:{
				username: 'ipso',
				password: '123456789',
			}
		})
		.then(res => {
			console.log(res.data)
			this.msg = res.data.data.msg
		})
		.catch(error => {
			console.log(error)
		})
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
