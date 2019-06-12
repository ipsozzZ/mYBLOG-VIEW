<style scoped>
@import "../assets/css/bootstrap.css";
@import "../assets/css/font-awesome.css";
@import "../assets/css/style.css";
</style>
<template>
    <div class="Index" v-title data-title="ipso-首页">
			<myHeader></myHeader>
			<router-view></router-view>
			<hr />
    	<div class="container" style="font-weight:700;">
        <div class="text-center set-foot">
					<div style="line-height: 0.8em;font-weight:700;">
						<p><i>ipso的个人站点: <a href="http://www.gaogege.live" target="_black">ipso Site</a></i></p>
						<p><i>ipso的独立博客: <a :href="config.address" target="_black">ipso Blog</a></i></p>
						<span><i>友情链接：</i></span>
						<a v-for="friend in friends" v-bind:key="friend.id" :href="friend.address" target="_black" style="margin:0.2em">{{ friend.name }}</a>
					</div>
					<Button size="small" style="margin: 0.5em;"><router-link to="/AddFriend">申请友链</router-link></Button>
					<p><i>{{ config.certificates }}</i></p>
    		</div>
    	</div>
  	</div>
</template>
<script>
import Article from '../Page/articleList'
import myHeader from '../Page/header'
import mySidebar from '../Page/sidebar'
export default {
	name: 'Index',
	components: {
		Article,
		myHeader,
		mySidebar
	},
	data(){
		return {
			configId: 1,
			config: [],
			friends: [],
		}
	},
	created() {
		this.getConfigId()
		this.getFriend()
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
		},
		getFriend(){
			this.$api.getFriends().then( res => {
				if(res.data.ret == 200 && res.data.data.code == 1){
					this.friends = res.data.data.data
				}
			})
		}
	}
}
</script>




