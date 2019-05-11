<style scoped>
Form{
	width: 400px;
}


</style>

<template>
	<div class="Add">
		<h2>修改昵称</h2><br>
		<Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
        <FormItem label="账号" prop="account">
            <Input type="text" v-model="formCustom.Account"></Input>
        </FormItem>
				<FormItem label="密码" prop="pass">
            <Input type="password" v-model="formCustom.Pass" placeholder="输入密码"></Input>
        </FormItem>
				<FormItem>
            <Button type="primary" @click="handleSubmit('formCustom')">添加</Button>
            <Button @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
	</div>
</template>

<script>
    export default {
			name: "Add",
        data () {
					const validateAccount = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入你的账号！'));
                } else if(value === formCustom.Account){
									callback(new Error('账号没有发生改变！'))
								}else {
                    callback();
                }
						};
						
						const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入你的密码！'));
                } else {
                    if (value.length < 4) {
                        // 对第二个密码框单独验证
                        callback(new Error('密码长度必须大于等于4位！'));
                    }
                    callback();
                }
            };
            
            return {
                formCustom: {
										Account: '',
										Pass: '',
                },
                ruleCustom: {
										Account: [
                        { validator: validateAccount, trigger: 'blur' }
                    ],
                    Pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ]
                }
            }
				},
				created() {
					this.formCustom.Account = this.$commonjs.getCache('m_user')
				},
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
											this.$api.editAdmin(this.formCustom).then(res => {
												console.log(res)
												if(res.data.data.code == 0){
													this.$Message.error(res.data.data.msg);
												}else{
													this.$commonjs.setCache('m_user', this.formCustom.Account);
													this.$Message.success(res.data.data.msg);
													this.$router.push('/index')
												}
											})
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

