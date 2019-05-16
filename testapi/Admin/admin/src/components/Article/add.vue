<template>
    <div class="Add">
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="文章标题" prop="title">
            <Input v-model="formValidate.title" placeholder="输入文章标题"></Input>
        </FormItem>
        <FormItem label="作者" prop="author">
            <Input v-model="formValidate.author" disabled placeholder="输入作者"></Input>
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
				<FormItem label="文章状态" prop="comments">
            <Input v-model="formValidate.state" disabled placeholder="未发布"></Input>
        </FormItem>
        <FormItem label="文章分类" prop="cate">
            <Select v-model="formValidate.cate" placeholder="选择你的文章分类">
                <Option value="1">PHP</Option>
                <Option value="2">Javascript</Option>
                <Option value="3">nodejs</Option>
            </Select>
        </FormItem>
        <FormItem label="是否置顶" prop="istop">
            <RadioGroup v-model="formValidate.istop">
                <Radio label="0">不置顶</Radio>
                <Radio label="1">置顶</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="文章内容" prop="content">
            <!-- <Input v-model="formValidate.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="写点什么..."></Input> -->
						<markdown-editor v-model="formValidate.content" ref="markdownEditor"></markdown-editor>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">添加</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>

				<FormItem label="是否置顶" prop="istop">
            <vue-markdown v-model="formValidate.content">{{ formValidate.content }}</vue-markdown>
        </FormItem>
    </Form>
		</div>
</template>
<script>
		import markdownEditor from 'vue-simplemde/src/markdown-editor'
		import VueMarkdown from 'vue-markdown'
    export default {
				name: 'add',
				components: {
					markdownEditor,
					VueMarkdown
				},
				created() {
					this.formValidate.author = this.$commonjs.getCache('m_user')
				},
        data () {
            return {
								cate: [],
								loadingStatus: false,
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
											console.log(this.formValidate)
											let that = this
											that.$api.addArticle(that.formValidate).then( res => {
												console.log(res)
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
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
						},
        }
    }
</script>
