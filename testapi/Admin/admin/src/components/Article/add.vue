<template>
    <div class="Add">
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="文章标题" prop="title">
            <Input v-model="formValidate.title" placeholder="输入文章标题"></Input>
        </FormItem>
        <FormItem label="作者" prop="author">
            <Input v-model="formValidate.author" placeholder="输入作者"></Input>
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
        <FormItem label="文章分类" prop="cate">
            <Select v-model="formValidate.cate" placeholder="选择你的文章分类">
                <Option value="PHP">PHP</Option>
                <Option value="Javascript">Javascript</Option>
                <Option value="nodejs">nodejs</Option>
            </Select>
        </FormItem>
        <FormItem label="封面">
            <Upload multiple v-model="formValidate.face" action="//jsonplaceholder.typicode.com/posts/">
        			<Button icon="ios-cloud-upload-outline">Upload files</Button>
    				</Upload>
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
            <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
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
        data () {
            return {
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
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
