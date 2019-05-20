<template>
	<div class="Show">
		<h2>文章详情</h2>
		<br>
		<Form ref="article" :model="article" :label-width="80">
        <FormItem label="文章标题" prop="title">
            <Input v-model="article.title" disabled placeholder="输入文章标题"></Input>
        </FormItem>
        <FormItem label="作者" prop="author">
            <Input v-model="article.author" disabled placeholder="输入作者"></Input>
        </FormItem>
				<FormItem label="关键字" prop="keywords">
            <Input v-model="article.keywords" disabled placeholder="输入关键字"></Input>
        </FormItem>
				<FormItem label="描述" prop="desc">
            <Input v-model="article.desc" disabled placeholder="输入文章描述"></Input>
        </FormItem>
				<FormItem label="获赞数" prop="like">
            <Input v-model="article.like" disabled placeholder="文章获赞数"></Input>
        </FormItem>
				<FormItem label="评论数" prop="comments">
            <Input v-model="article.comments" disabled placeholder="文章获评论数"></Input>
        </FormItem>
				<FormItem label="文章状态" prop="state">
            <Input v-model="article.state" disabled placeholder="未发布"></Input>
        </FormItem>
        <FormItem label="文章分类" disabled prop="cate">
            <Select v-model="article.cate" disabled placeholder="选择你的文章分类">
                <Option value="1">PHP</Option>
                <Option value="2">Javascript</Option>
                <Option value="3">nodejs</Option>
            </Select>
        </FormItem>
        <FormItem label="是否置顶" prop="istop">
            <RadioGroup disabled v-model="article.istop">
                <Radio disabled label="0">不置顶</Radio>
                <Radio disabled label="1">置顶</Radio>
            </RadioGroup>
        </FormItem>
				<FormItem label="创建时间" prop="content">
						<Input v-model="article.ctime" disabled placeholder="创建时间"></Input>
        </FormItem>
				<FormItem label="最近修改" prop="content">
						<Input v-model="article.rtime" disabled placeholder="最新修改时间"></Input>
        </FormItem>
				<FormItem label="文章封面" prop="content">
						<div v-if="article.face == '#'">
  						<p style="color: red">暂无文章封面，上传封面后即可发布文章</p>
						</div>
						<div v-else>
  						<img :src="article.face" alt="">
						</div>
        </FormItem>
				<FormItem label="文章内容">
            <div style="margin-left: 0em; background-color: #FAFAFA"><markdown style="padding-left: 2em" :content="article.content">{{ article.content }}</markdown></div>
        </FormItem>
				<FormItem>
            
						<div v-if="article.face == '#'">
  						<Button type="primary" @click="toUpload()">添加封面</Button>
							<Button @click="toEdit()" style="margin-left: 8px">编辑</Button>
							<Button @click="toList()" style="margin-left: 8px">返回列表</Button>
						</div>
						<div v-else>
  						<Button type="primary" @click="publish()">发布文章</Button>
							<Button @click="toEdit()" style="margin-left: 8px">编辑</Button>
							<Button @click="toList()" style="margin-left: 8px">返回列表</Button>
						</div>
        </FormItem>
    	</Form>
	</div>
</template>

<script>
import markdownEditor from 'vue-simplemde/src/markdown-editor'
import markdown from '../Page/Markdown'
export default {
	name: "Show",
	components: {
		markdown,
		markdownEditor
	},
	data(){
		return {
			currId: 0,
			article: {
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
			},
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
					if(res.data.data.data.state == 0){
						this.article.state = "未发布"
					}else{
						this.article.state = "已发布"
					}
					that.$Message.success(res.data.data.msg)
				}
			})
		},
		toList(){
			this.$router.push("/Article/list")
		},
		toUpload(){
			this.$router.push("/Page/upload")
		},
		toEdit(){
			this.$router.push("/Article/edit/" + this.article.id)
		},
		publish(){
			let Id = this.article.id
			this.$api.publishArticle(Id).then( res => {
				console.log(res.data.data)
			})
		}
	},
}
</script>