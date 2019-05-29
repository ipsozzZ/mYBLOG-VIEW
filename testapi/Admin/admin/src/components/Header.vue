<style scoped>
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
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
        <div class="layout-logo"><img src="../assets/logo.png" width="30px"></div>
        <div class="layout-nav">
          <MenuItem name="2">
            <Icon type="ios-keypad"></Icon>
            <!-- Item 2 -->
						<a href="/front/index" style="color: #F7F7F7">ipso</a>
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