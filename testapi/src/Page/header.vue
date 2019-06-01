<style scoped>
@import "../assets/css/bootstrap.css";
@import "../assets/css/font-awesome.css";
@import "../assets/css/style.css";
</style>
<template>
	<nav>
		<section class="header-section">
        <div class="container">
            <div class="row">
                <div class="col-md-2">
                    <img src="../assets/img/person.jpg" class="img-circle img-responsive" />
                </div>
                <div class="col-md-5 text-center">
                    <h1><strong>{{ config.host }} </strong></h1>
                    <h4>大学生 & 爱折腾</h4>
                </div>
                <div class="col-md-5">
                    <h3>My World :</h3>
                    {{ config.desc }}
                </div>
            </div>
        </div>
    </section>
		<section>
      <div class="container">
        <div class="row Space">
          <div class="col-md-2 spon-txt">
            <span>My Space: </span>
          </div>
          <div class="col-md-8">
						<router-link to="/index"><Icon type="md-home" style="color: #636363" size="38" /></router-link>
          	<a target="_blank" href="https://github.com/ipsozzZ"><img src="../../src/assets/images/github.png"></a>
						<a target="_blank" href="https://weibo.com/6144279237/profile?topnav=1&wvr=6&is_all=1"><img src="../../src/assets/images/weibo.png"></a>
						<a target="_blank" href="https://www.zhihu.com/people/pso318-25/activities"><img src="../../src/assets/images/zhihu.png"></a>
						<a target="_blank" href="https://space.bilibili.com/261231853/"><img src="../../src/assets/images/bili.png"></a>
						<router-link to="/About" style="color: #636363"><Icon type="ios-person" size="38" /></router-link>
          </div>
        </div>
      </div>
    </section>
		<hr>
    <!--SPONSORS SECTION END-->
	</nav>
</template>

<script>
	export default{
		name: 'Header',
		data(){
		return {
			configId: 1,
			config: [],
			friends: [],
		}
	},
	created() {
		this.getConfigId()
	},
	methods: {
		getConfig(Id){
			this.$api.getConfigs(Id).then( res => {
				if(res.data.ret == 200 && res.data.data.code == 1){
					this.config = res.data.data.data
				}
			})
		},
		getConfigId(){
			this.$api.getConfigId().then( res => {
				if(res.data.ret == 200 && res.data.data.code == 1){
					this.configId = parseInt(res.data.data.data)
					this.getConfig(this.configId)
				}
			})
		}
	}
	}
</script>

