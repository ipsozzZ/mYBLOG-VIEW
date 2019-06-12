<template>
	<div class="Show">
		<h2>图片显示</h2>
		<br>
		<img :src="pic.src" style="width:500px; height:350px" alt=""><br>
		<p>图片地址：{{ pic.pic }}</p>
		<Button @click="toList()" style="margin-top:2em">返回列表</Button>
	</div>
</template>

<script>
export default {
	name: 'Show',
	data(){
		return {
			Id: 0,
			pic:[]
		}
	},
	created(){
		this.id = this.$route.params.id
		this.getPic(this.id)
	},
	methods: {
		toList(){
			this.$router.push('/Picture/list')
		},
		getPic(Id){
			this.$api.getPicById(Id).then( res => {
				if(res.data.ret == 200){
					if(res.data.data.code == 0){
						this.$Message.error("暂无数据!");
						this.$router.push('/Picture/list')
					}
					this.pic = res.data.data.data
				}else{
					this.$Message.error("服务器异常，稍后重试！");
					this.$router.push('/Picture/list')
				}
			})
		}
	}
}
</script>

<style scoped>

</style>
