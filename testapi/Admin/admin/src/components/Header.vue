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
                Item 2
            </MenuItem>
            <MenuItem name="4">
							<Icon type="md-contact"></Icon>
                Item 4
            </MenuItem>
        </div>
				<Submenu name="1">
								<template slot="title">
      						  <Icon type="ios-navigate"></Icon>
      						  {{ admin }}
      					</template>
								<MenuItem name="1-1">我的资料</MenuItem>
      					<MenuItem name="1-2">退出登录</MenuItem>
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
		}
	},
	created(){
		this.admin = "ipso"
	},
	methods: {
		getAdmin(){
			this.admin = "ipso"
		}
	},
}
</script>