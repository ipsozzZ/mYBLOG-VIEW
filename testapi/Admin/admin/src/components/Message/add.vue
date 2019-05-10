<style scoped>
Form{
	width: 400px;
}


</style>

<template>
	<div class="Add">
		<Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
        <FormItem label="账号" prop="account">
            <Input type="text" v-model="formCustom.Account"></Input>
        </FormItem>
        <FormItem label="密码" prop="pass">
            <Input type="password" v-model="formCustom.Pass"></Input>
        </FormItem>
        <FormItem label="确认密码" prop="passCheck">
            <Input type="password" v-model="formCustom.PassCheck"></Input>
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
                } else {
                    callback();
                }
            };
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入你的密码！'));
                } else {
                    if (this.formCustom.PassCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formCustom.validateField('PassCheck');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入你的密码!'));
                } else if (value !== this.formCustom.pass) {
                    callback(new Error('输入的两次密码不一致!'));
                } else {
                    callback();
                }
            };
            const validateAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('年龄不空!'));
                }
                // 模拟异步验证效果
                setTimeout(() => {
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入一个数字!'));
                    } else {
                        if (value < 18) {
                            callback(new Error('年龄必须超过18岁!'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };
            
            return {
                formCustom: {
										Account: '',
										Pass: '',
                    PassCheck: '',
                },
                ruleCustom: {
										Account: [
                        { validator: validateAccount, trigger: 'blur' }
                    ],
                    Pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    PassCheck: [
                        { validator: validatePassCheck, trigger: 'blur' }
                    ],
                    age: [
                        { validator: validateAge, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
											this.$api.addAdmin(this.formCustom).then(res => {
												console.log(res)
												if(res.data.data.code == 0){
													this.$Message.error(res.data.data.msg);
												}else{
													this.$Message.success(res.data.data.msg);
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

