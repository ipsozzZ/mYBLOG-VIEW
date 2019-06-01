<style>
@import "../assets/css/bootstrap.css";
@import "../assets/css/font-awesome.css";
@import "../assets/css/style.css";
.Article img{
  display: block;
  max-width: 350px;
  height: auto;
}
.hand:hover{
	cursor:pointer
}
</style>

<template>
  <div id="ArticleList">
		<div>
    	<div class="panel panel-default">
      	<div class="panel-heading">
        	<h3 class="panel-title">客厅</h3>
      	</div>
      	<div class="panel-body">
        	<div v-if="isLogin == false">
						<input type="text" class="form-control" v-model="user" placeholder="你的账号" style="margin-bottom:1em" />
						<input type="password" class="form-control" v-model="pass" placeholder="你的密码" />
          	<hr />
        		<a href="javascript:;" @click="Login" class="btn btn-info btn-sm btn-block">进入</a>
						<a href="javascript:;" @click="toAdd" class="btn btn-info btn-sm btn-block">新客移步</a>
					</div>
					<div v-else>
						<Icon type="ios-person" size="25" />
						{{ user }}
          	<hr />
        		<a href="javascript:;" @click="toUserInfo(user)" class="btn btn-info btn-sm btn-block">into center</a>
						<a href="javascript:;" @click="Logout" class="btn btn-info btn-sm btn-block">退出客厅</a>
					</div>
      	</div>
    	</div>
    </div>
		<br />
    <ul class="list-group">
    	<li class="list-group-item">Advrtisements
    	</li>
    	<li class="list-group-item">
      	<a href="javascript:;">
        	<img src="../assets/img/ad1.jpg" class="img-responsive" />
      	</a>
      	<br />
    		<a href="javascript:;">
        	<img src="../assets/img/ad2.jpg" class="img-responsive" />
      	</a>
    	</li>
    </ul>
  </div>
</template>

<script>
export default {
	name: 'ArticleList',
  data(){
  	return {
			user: '',
			pass: '',
			isLogin: false,
  	}
	},
	created() {
		if(!this.$commonjs.getCache('u_id') || !this.$commonjs.getCache('u_name')){
			this.isLogin = false
		}else{
			this.isLogin = true
			this.user = this.$commonjs.getCache('u_name')
		}
	},
	methods: {
		toAdd(){
			this.$router.push('/User/aplay')
		},
		Login(){
			this.$api.Login(this.user, this.pass).then( res => {
				console.log(res)
				if(res.data.ret == 200 && res.data.data.code == 1){
					this.$commonjs.setCache('u_id', res.data.data.data.id)
					this.$commonjs.setCache('u_name', res.data.data.data.name)
					this.user = res.data.data.data.name
					this.isLogin = true
					this.$Message.success('成功!');
				}else if(res.data.ret == 200 && res.data.data.code == 0){
					this.isLogin = false
					this.$Message.error(res.data.data.msg);
				}else{
					this.isLogin = false
					this.$Message.error('异常了，稍后重试');
				}
			})
		},
		Logout(){
			this.$commonjs.removeCache('u_id')
			this.$commonjs.removeCache('U_name')
			this.isLogin = false
			this.$Message.success('成功，欢迎下次光临!');
			this.$router.push('/index')
		},
		toUserInfo(user){
			console.log(user)
		}
	}
}
</script>
