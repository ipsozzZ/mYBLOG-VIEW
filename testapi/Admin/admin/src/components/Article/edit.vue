<template>
    <div class="Add">
			<h2>编辑文章：</h2><br>
			<div style="margin-left:1em">
        <Button @click="value4 = true" type="primary">预览图片</Button>
        <Drawer :closable="false" width="640" v-model="value4">
            <p :style="pStyle">文章封面图：</p>
            <div class="demo-drawer-profile">
                <Row v-for="face in faces" v-bind:key="face.id">
                    <Col span="12">
                      <img :src="face.src" width="100" :alt="face.pic">
                    </Col>
                    <Col span="12" style="font-size:0.7em">
                      图片地址： {{ face.pic }}
                    </Col>
                </Row>
            </div>
						<hr style="margin:1.5em">
						<p :style="pStyle">文章内容图</p>
						<div class="demo-drawer-profile">
                <Row v-for="picture in pictures" v-bind:key="picture.id">
                    <Col span="12">
                      <img :src="picture.src" width="100" :alt="picture.pic">
                    </Col>
                    <Col span="12">
                      图片地址：{{ picture.pic }}
                    </Col>
                </Row>
            </div>
        </Drawer>
    	</div>
			<br>
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="文章标题" prop="title">
            <Input v-model="formValidate.title" placeholder="输入文章标题"></Input>
        </FormItem>
        <FormItem label="作者" prop="author">
            <Input v-model="formValidate.author" disabled placeholder="输入作者"></Input>
        </FormItem>
				<FormItem label="封面" prop="face">
            <Input v-model="formValidate.face" placeholder="输入文章封面"></Input>
        </FormItem>
				<FormItem label="关键字" prop="keywords">
            <Input v-model="formValidate.keywords" placeholder="输入关键字"></Input>
        </FormItem>
				<FormItem label="描述" prop="desc">
            <Input v-model="formValidate.desc" placeholder="输入文章描述"></Input>
        </FormItem>
				<FormItem label="获赞数" prop="like">
            <Input v-model="formValidate.like" disabled placeholder="文章获赞数"></Input>
        </FormItem>
				<FormItem label="评论数" prop="comments">
            <Input v-model="formValidate.comments" disabled placeholder="文章获评论数"></Input>
        </FormItem>
				<FormItem label="文章状态" prop="state">
            <Input v-model="formValidate.state" disabled placeholder="未发布"></Input>
        </FormItem>
        <FormItem label="文章分类" prop="cate">
            <Select v-model="formValidate.cate" placeholder="选择你的文章分类">
                <Option v-for="item in cate" v-bind:key="item.id" :value="item.id">{{ item.name }}</Option>
            </Select>
        </FormItem>
        <FormItem label="是否置顶" prop="istop">
            <RadioGroup v-model="formValidate.istop">
                <Radio label="0">不置顶</Radio>
                <Radio label="1">置顶</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="文章内容" prop="content">
					<div id="content">
						<div class="left" style="">
							<markdown-editor v-model="formValidate.content" ref="markdownEditor"></markdown-editor>
						</div>
						<div class="right">
							<p style="margin-left:1em;margin-top: 1em">文章展示</p><hr style="margin-top: 0.5em; margin-bottom:2em;">
							<div style="margin-left: 0em; background-color: #FAFAFA"><markdown style="padding-left: 2em" :content="formValidate.content">{{ formValidate.content }}</markdown></div>
						</div>
					</div>
						
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">修改</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
						<Button @click="toList()" style="margin-left: 8px">返回列表</Button>
        </FormItem>
    	</Form>
		</div>
</template>
<script>
		import markdownEditor from 'vue-simplemde/src/markdown-editor'
		import Markdown from '../Page/Markdown.vue'
    export default {
				name: 'Add',
				components: {
					markdownEditor,
					Markdown
				},
				created() {
					this.currId = this.$route.params.id
					this.getArticle()
					this.getCates()
					this.getPic()
					this.getFace()
				},
        data () {
            return {
								value4: false,
                pStyle: {
                    fontSize: '16px',
                    color: 'rgba(0,0,0,0.85)',
                    lineHeight: '24px',
                    display: 'block',
                    marginBottom: '16px'
                },
								pictures: [],
								faces: [],
								cate: [],
                formValidate: {
                  title: '',
									author: '',
									keywords: '',
									desc: '',
                  cate: '',
                  istop: '',
									like: 0,
									comments: 0,
									face: '',
									state: 0,
                  content: ''
                },
                ruleValidate: {
                    title: [
                        { required: true, message: '文章标题不能为空', trigger: 'blur' }
                    ],
                    author: [
                        { required: true, message: '文章作者不能为空', trigger: 'blur' },
                    ],
                    keywords: [
                        { required: true, message: '文章关键字不能为空', trigger: 'change' }
                    ],
                    
                }
            }
				},
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
											let that = this
											that.$api.updateArticle(that.formValidate).then( res => {
												if(res.data.ret != 200){
													that.$Message.error('添加失败！');
												}else{
													if(res.data.data.code != 1){
														that.$Message.error(res.data.data.msg);
													}
													that.$Message.success(res.data.data.msg);
													that.$router.push('/Article/list')
												}
											})
                    } else {
                        this.$Message.error('添加失败!');
                    }
                })
						},
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
									this.formValidate = res.data.data.data
									if(res.data.data.data.state == 0){
										this.formValidate.state = "未发布"
									}else{
										this.formValidate.state = "已发布"
									}
									that.$Message.success(res.data.data.msg)
								}
							})
						},
            handleReset (name) {
                this.$refs[name].resetFields();
						},
						toList(){
							this.$router.push("/Article/list")
						},
						getCates(){
							this.$api.getCates().then( res => {
								if(res.data.ret == 200){
									this.cate = res.data.data.data
								}
							})
						},
						getPic(){
						this.$api.getPicByType(3).then( res => {
							if(res.data.ret == 200 && res.data.data.code == 1){
								this.pictures = res.data.data.data
							}
							else{
								this.pictures = []
							}
						})
					},
					getFace(){
						this.$api.getPicByType(2).then( res => {
							if(res.data.ret == 200 && res.data.data.code == 1){
								this.faces = res.data.data.data
							}
							else{
								this.faces = []
							}
						})
					},
        }
    }
</script>

<style scoped>
#content{
	display: flex;
	width: 100%;
}
#content .left{
	margin-right: 0em;
	width: 50%;
}

#content .right{
	width: 50%;
	margin-bottom: 4em;
	background-color: #FAFAFA;
	border: 1px solid;
	border-color: #D4D4D4;
	border-radius: 5px;
}

.demo-drawer-profile{
	font-size: 14px;
}
.demo-drawer-profile .ivu-col{
  margin-bottom: 12px;
}
</style>
