<template>
	<div class="Show">
		<h2>文章详情</h2>
		<br>
		<p>文章编号：{{ article.id }}</p>
		<p>文章标题：{{ article.title }}</p>
		<p>文章作者：{{ article.author }}</p>
		<p>文章分类：{{ article.cate }}</p>
		<p>文章是否置顶：{{ article.istop }}</p>
		<p>文章描述：{{ article.desc }}</p>
		<p>文章关键字：{{ article.keywords }}</p>
		<p>文章获赞数：{{ article.like }}</p>
		<p>文章获评论数：{{ article.comments }}</p>
		<p>文章封面：{{ article.face }}</p>
		<p>文章状态：{{ article.state }}</p>
		<p>文章最近修改时间：{{ article.rtime }}</p>
		<p>文章创建时间：{{ article.ctime }}</p>
		<p>文章内容：<br><vue-markdown v-model="article.content">{{ article.content }}</vue-markdown></p>
	</div>
</template>

<script>
import markdownEditor from 'vue-simplemde/src/markdown-editor'
import VueMarkdown from 'vue-markdown'
export default {
	name: "Show",
	components: {
		VueMarkdown,
		markdownEditor
	},
	data(){
		return {
			currId: 0,
			article: [{
				id : 1,
				title: '',
				author: '',
				cate: '',
				istop: 0,
				desc: '',
				keywords: '',
				like: '',
				comments: '',
				face: '',
				state: '',
				content: '',
				rtime: 0,
				ctime: 0,
			},]
		}
	},
	created(){
		this.currId = this.$route.params.id
		this.getArticle()
	},
	methods: {
		getArticle(){
			let that = this
			that.$api.getArticleById(this.$route.params.id).then( res => {
				if(res.data.ret != 200){
					that.$Message.console.error("获取失败！")
					that.$router,push("/Article/list")
				}else{
					if(res.data.data.code == 0){
						that.$Message.error(res.data.data.msg)
						that.$router,push("/Article/list")
					}
					this.article = res.data.data.data
					that.$Message.success(res.data.data.msg)
				}
			})
		}
	},
}
</script>