<template>
    <div class="Add">
			<h2>站点配置：</h2><br>
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="站点名称" prop="title">
            <Input v-model="formValidate.title" placeholder="站点名称"></Input>
        </FormItem>
        <FormItem label="站长" prop="host">
            <Input v-model="formValidate.host" placeholder="输入站长"></Input>
        </FormItem>
				<FormItem label="站点描述" prop="desc">
            <Input v-model="formValidate.desc" placeholder="输入站点描述"></Input>
        </FormItem>
				<FormItem label="站长介绍" prop="about">
            <Input v-model="formValidate.about" placeholder="输入站长介绍"></Input>
        </FormItem>
				<FormItem label="邮箱" prop="email">
            <Input v-model="formValidate.email" placeholder="输入邮箱"></Input>
        </FormItem>
				<FormItem label="QQ" prop="qq">
            <Input v-model="formValidate.qq" placeholder="输入QQ"></Input>
        </FormItem>
				<FormItem label="职业" prop="work">
            <Input v-model="formValidate.work" placeholder="输入职业"></Input>
        </FormItem>
				<FormItem label="爱好" prop="hobby">
            <Input v-model="formValidate.hobby" placeholder="输入爱好"></Input>
        </FormItem>
				<FormItem label="电话" prop="phone">
            <Input v-model="formValidate.phone" placeholder="输入电话"></Input>
        </FormItem>
				<FormItem label="证件" prop="certificates">
            <Input v-model="formValidate.certificates" placeholder="输入证件"></Input>
        </FormItem>
				<FormItem label="站点地址" prop="address">
            <Input v-model="formValidate.address" placeholder="输入站点地址"></Input>
        </FormItem>
				<FormItem label="站点状态" prop="state">
            <i-switch v-model="formValidate.state" size="large">
                <span slot="open">On</span>
                <span slot="close">Off</span>
            </i-switch>
        </FormItem>
        <FormItem label="关站信息" prop="info">
					<Input v-model="formValidate.info" placeholder="输入关站信息"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">确认</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
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
					this.getId()
					// this.getConfig()
				},
        data () {
            return {
								loadingStatus: false,
								currId: 0,
                formValidate: {
									id: 0,
                  title: '',
									host: '',
									desc: '',
									qq: '',
									phone: '',
									certificates: '',
                  email: '',
                  address: '',
									state: false,
									info: '',
									about: '',
									work: '',
									hobby: '',
                },
                ruleValidate: {
                    title: [
                        { required: true, message: '站点标题不能为空', trigger: 'blur' }
                    ],
                    host: [
                        { required: true, message: '站长不能为空', trigger: 'blur' },
                    ],
                    email: [
                        { required: true, message: '站长邮件不能为空', trigger: 'change' }
                    ],
                    address: [
                        { required: true, message: '站点地址不能为空', trigger: 'change' }
                    ],
                }
            }
				},
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
											let that = this
											that.$api.addConfig(that.currId, that.formValidate).then( res => {
												if(res.data.ret != 200){
													that.$Message.error('添加/更改失败！');
												}else{
													if(res.data.data.code != 1){
														that.$Message.error(res.data.data.msg);
													}
													that.$Message.success(res.data.data.msg);
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
						getId(){
							this.$api.getId().then(res => {
								if(res.data.ret == 200 && res.data.data.code == 1){
									this.currId = parseInt(res.data.data.data)
									this.getConfig(this.currId)
								}else{
									this.currId = 1;
								}
							})
						},
						getConfig(Id){
							if(Id != 0){
								this.$api.getConfig(this.currId).then( res => {
									if(res.data.ret == 200 && res.data.data.code == 1){
										this.formValidate = res.data.data.data
									}
								})
							}
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
</style>



