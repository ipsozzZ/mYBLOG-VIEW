<style scoped>
.Login{
	width: 500px;
	height: 400px;
	margin: 0 auto;
	margin-top: 10%;
	background-color: blanchedalmond;
	padding: 40px;
}
.Login h1{
	width: 100%;
	text-align: center;
	margin: 0 0 1em 0;
}
</style>

<template>
    <div class="Login">
			<h1>ipso个人博客后台管理系统</h1>
			<Form ref="formCustom" :model="formCustom" :rules="ruleCustom" style="padding-right: 60px;" :label-width="100">
        <FormItem label="用户名" prop="username">
            <Input type="text" v-model="formCustom.username"></Input>
        </FormItem>
        <FormItem label="密码" prop="pass">
            <Input type="password" v-model="formCustom.pass"></Input>
        </FormItem>
        <FormItem label="验证码" inline = true prop="code">
            <Input type="text" v-model="formCustom.code"></Input>
						<img :src="pic" @click="getCode()" class="avatar">						
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formCustom')">登录</Button>
            <Button @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
		</div>
</template>

<script>
    export default {
				name: "Login",
        data () {
            const validateUsername = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入正确的用户名'));
                } else {
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('密码不能为空！'));
                } else {
                    callback();
                }
						};
						const validateRepassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码！'));
                } else if (value != this.formCustom.pass) {
                    callback(new Error('两次密码不一致！'));
                } else {
                    callback();
                }
            };
            const validateCode = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('验证码不能为空!'));
								}
								if (value != this.serverCode) {
                    callback(new Error('验证码输入不正确!'));
                } else {
                    callback();
                }
            };
            
            return {
								pic: '',
								serverCode: '',
                formCustom: {
                    username: '',
										pass: '',
                    code: ''
                },
                ruleCustom: {
                    username: [
                        { validator: validateUsername, trigger: 'blur' }
                    ],
                    pass: [
                        { validator: validatePassCheck, trigger: 'blur' }
										],
                    code: [
                        { validator: validateCode, trigger: 'blur' }
                    ]
                }
            }
				},
				created: function(){
					this.getCode();
				},
        methods: {
					  handleSubmit(name){
							const that = this
							that.getCode()
							this.$refs[name].validate((valid) => {
                if (valid) {
									that.login(that.formCustom.username, that.formCustom.pass, function(res) {
										if(res){
											that.$Message.success("登陆成功！")
                      that.$router.push('/index')
										}else{
											that.$Message.error("登录失败, 用户名或密码错误")
										}
									})		
                } else {
										that.$Message.error("登录失败")
										return false
                }
              })
						},
            login (user, pass, cb) {
							let admin = user
							let pwd  = pass
							this.$api.AdminLogin(admin, pwd).then( res => {
								if(res.data.ret == 200 && res.data.data.code == 1){
									let CurrId = res.data.data.data.id
									let CurrUsername = res.data.data.data.account
									this.$commonjs.setCache("m_user", CurrUsername)
									this.$commonjs.setCache("m_id", CurrId)
									cb(true)
								}else{
									 cb(false)
								}
							})
						},
						getCode(){
							const that = this
							that.$api.getCode().then(res => {
								 if(res.data.ret == 200){
									 that.pic = res.data.data.data.pic
									 that.serverCode = res.data.data.data.code
								 }else{
									 that.$message.error("获取失败")
								 }
							})
						},
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
