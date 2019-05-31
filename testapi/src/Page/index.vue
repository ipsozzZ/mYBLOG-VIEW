<style scoped>
@import "../assets/css/bootstrap.css";
@import "../assets/css/font-awesome.css";
@import "../assets/css/style.css";
</style>
<template>
    <div class="Index">
			<myHeader></myHeader>
			<Article></Article>
			<hr />
    	<div class="container">
        <div class="row">
          <div class="col-md-6 text-center set-foot">
            <h5 class="col-md-6">友情链接：</h5>
						<div>
							<div v-for="friend in friends" v-bind:key="friend.id" class="col-md-12">
								<span>{{ friend.remarks }}: </span>
								<a :href="friend.address">{{ friend.name }}</a>
							</div>
							<div class="col-md-12">
								<Button><router-link to="#">申请友链</router-link></Button>
							</div>
						</div>
          </div>
        </div>
				<p class="col-md-6" style="padding: 0.5em 0;"><i>备案号：</i> <i>{{ config.certificates }}</i></p>
    	</div>
		</div>
</template>
<script>
import Article from '../Page/articleList'
import myHeader from '../Page/header'
export default {
	name: 'Index',
	components: {
		Article,
		myHeader
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




