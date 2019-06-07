<style scoped>
.Footer{
	/* margin-top: 200px; */
}

.Footer div{
	text-align: center;
	width: 100%;
	}
	.Footer a{
		text-decoration: none;
		color: #7A8B8B;
		font-size: 1.3em;
	}
	.admin h3{
		display: inline;
		color: #7A8B8B;
	}
	.Footer .Book{
		color: #7A8B8B;
		font-size: 1.3em;
	}
</style>

<template>
	<footer class="Footer">
    <div style="display:flex">
			<div class="admin"><h3>管理员：</h3><a href="http://www.ipso.live">ipso</a></div>
			<div>
				<p><a href="http://www.gaogege.live" target="_black" rel="noopener noreferrer"><i>ipso的个人站点</i></a></p>
				<p><a :href="config.address" target="_black" rel="noopener noreferrer"><i>ipso的独立博客</i></a></p>
				<p class="Book"><i>友情链接：</i></p>
				<div>
					<p v-for="items in friends" v-bind:key="items.id"><a :href="items.address" target="_black" rel="noopener noreferrer"><i>{{ items.name }}</i></a></p>
				</div>
				<p class="Book" style="margin:5px 0 2em 0"><i>{{ config.certificates }}</i></p>
			</div>
		</div>
	</footer>
</template>

<script>
export default {
	name: "CommonFooter",
	data(){
		return {
			friends:[],
			config:[],
			configId: 0
		}
	},
	created() {
		this.getConfigId()
		this.getShowFriends()
	},
	methods: {
	 	getConfigId(){
			this.$api.getId().then( res => {
				if(res.data.ret == 200 && res.data.data.code == 1){
					this.configId = parseInt(res.data.data.data)
					this.getConfig(this.configId)
				}
			})
		},
		getConfig(Id){
			this.$api.getConfig(Id).then( res => {
				if(res.data.ret == 200 && res.data.data.code == 1){
					this.config = res.data.data.data
				}else{
					this.config = []
				}
			})
		},
		getShowFriends(){
			this.$api.getMyFriends().then( res => {
				if(res.data.ret == 200 && res.data.data.code == 1){
					this.friends = res.data.data.data
				}else{
					this.friends = []
				}
			})
		}
	}
}
</script>