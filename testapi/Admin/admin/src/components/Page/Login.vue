<style scoped>
.Login{
	width: 500px;
	height: 400px;
	margin: 0 auto;
	margin-top: 10%;
	background-color: blanchedalmond;
	padding: 50px;
}
</style>

<template>
    <div class="Login">
			<Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="100">
        <FormItem label="用户名" prop="username">
            <Input type="text" v-model="formCustom.username"></Input>
        </FormItem>
        <FormItem label="密码" prop="pass">
            <Input type="password" v-model="formCustom.pass"></Input>
        </FormItem>
				<FormItem label="再次输入密码" prop="repass">
            <Input type="password" v-model="formCustom.repass"></Input>
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
										repass: '',
                    code: ''
                },
                ruleCustom: {
                    username: [
                        { validator: validateUsername, trigger: 'blur' }
                    ],
                    pass: [
                        { validator: validatePassCheck, trigger: 'blur' }
										],
										repass: [
                        { validator: validateRepassCheck, trigger: 'blur' }
                    ],
                    code: [
                        { validator: validateCode, trigger: 'blur' }
                    ]
                }
            }
				},
				created: function(){
					this.getCode();
					console.log(this.serverCode)
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
											that.$message.error("登录失败, 用户名或密码错误")
										}
									})		
                } else {
										that.$message.error("登录失败")
										return false
                }
              })
						},
            login (user, pass, cb) {
							let admin = user // this.formCustom.username
							let pwd  = pass // this.formCustom.pass
							this.$api.AdminLogin(admin, pwd).then( res => {
								console.log(res.data.data.data.id)
								let CurrId = res.data.data.data.id
								let CurrUsername = res.data.data.data.account
								 if(res.data.ret == 200){
									//  localStorage.setItem("m_user", this.formCustom.username)
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
									 console.log(res.data.data.data.code)
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
