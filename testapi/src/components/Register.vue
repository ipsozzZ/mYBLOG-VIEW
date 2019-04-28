<template>
	<div>
		<input v-model="user" placeholder="用户名">
		<p>用户名是: {{ user }}</p>
		<input type="password" v-model="pass" placeholder="密码">
		<p>密码是: {{ pass }}</p>
		<button v-on:click="LoginByMain(user,pass)">登录</button>
		<p>{{msg}}</p>
	</div>
</template>
<script>
	export default{
		name: 'Register',
		data(){
			return {
				msg: '用户注册',
				user: 'ipso',
				pass: '123456789'
			}
		},
		methods:{
			Register(){
				var url = this.HOST + '/?s=User.Register';
				console.log(url)
				this.$axios.get(url,{
					params:{
						username: 'ipsozz',
						password: '12345678',
						age     : 1000,
						sex     : 'female',	
					}
				}).then(res => {
					console.log(res)
					this.msg = res.data.data.msg;
				}).catch(error => {
					console.log(error)
				});
			},
			LoginByMain(user,pass){
				this.$api.Login(user,pass).then(res => {
					console.log(res)
					this.msg = res.data.data.msg;
				}).catch(error => {
					console.log(error)
				})
			}
		}
	}
</script>
<style scoped>

</style>
