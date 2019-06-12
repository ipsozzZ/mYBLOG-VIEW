<style scoped>
.layout-logo{
    width: 350px;
    height: 40px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    /* position: relative;
    top: 15px;
    left: 20px; */
		margin-top: 15px;
		margin-left: -30px;
		display: flex;
		justify-items: center;
		align-items: center;
}
.layout-logo a{
	width: 40px;
  height: 40px;
	margin-left: 1em;
}

.layout-logo a img{
	width: 40px;
  height: 40px;
	border: 1px solid;
	border-radius: 100%;
	margin-left: 1em;
}

.layout-logo span{
	position: relative;
	margin-left: 1em;
	color: #7EC0EE;
  
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
</style>

<template>
<div>
	<Header>
    <Menu mode="horizontal" theme="dark" active-name="1">
        <div class="layout-logo">
					<router-link to="/index"><img src="../assets/person.jpg" width="30px"></router-link>
					<span style="font-size:2em;font-weight: 900;">ipso后台管理系统</span>
				</div>
        <div class="layout-nav">
          <MenuItem name="2">
						<Icon type="ios-home" />
            <!-- Item 2 -->
						<a href="http://www.ipso.live" target="_black" style="color: #F7F7F7">ipso</a>
          </MenuItem>
        </div>
				<Submenu name="1">
					<template slot="title">
      			<Icon type="md-person"></Icon>
      			{{ admin }}
      		</template>
					<MenuItem name="1-1"><Button @click="getMyInfo()">我的资料</Button></MenuItem>
      		<MenuItem name="1-2"><Button @click="logout()">退出登录</Button></MenuItem>
      </Submenu>
    </Menu>
</Header>
</div>
</template>

<script>
export default {
	name: "HomeHeader",
	data(){
		return {
			admin: "",
			logo: []
		}
	},
	created(){
		this.admin = this.$commonjs.getCache('m_user') // localStorage.getItem('m_user')
		// this.admin = this.$api.getCache
	},
	methods: {
		getAdmin(){
			this.admin = this.$commonjs.getCache('m_user') // localStorage.getItem('m_user')
		},
		logout(){
			this.$api.AdminLogout()
			this.$router.push('/login')
		},
		getMyInfo(){
			let that = this
			that.$router.push('/Manage/info')

		},
	},
}
</script>