<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
	name: 'App',
	methods: {
		isLogin(){
			if(!localStorage.getItem('m_user') || !localStorage.getItem('m_id')){
				this.$router.push('/login')
			}
		}
	},
	created(){
		this.isLogin();
	},
}
</script>

<style scoped>

/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
} */ 

</style>
