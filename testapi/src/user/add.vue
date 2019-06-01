<style>
@import "../assets/css/bootstrap.css";
@import "../assets/css/font-awesome.css";
@import "../assets/css/style.css";
.Article img{
  display: block;
  max-width: 350px;
  height: auto;
}
.hand:hover{
	cursor:pointer
}
</style>

<template>
  <div id="AddFriend">
		<section>
      <div class="container">
        <div class="row">
          <div class="col-md-9 Article">
						<Card>
							<p slot="title">新客驾到</p>
							<Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
        				<FormItem label="站点名称" prop="name">
            			<Input type="text" v-model="formCustom.name" placeholder="输入你的昵称"></Input>
        				</FormItem>
        				<FormItem label="密码" prop="pass">
        				    <Input type="password" v-model="formCustom.pass" placeholder="输入你的密码"></Input>
        				</FormItem>
								<FormItem label="密码" prop="repass">
        				    <Input type="password" v-model="formCustom.repass" placeholder="再次输入你的密码"></Input>
        				</FormItem>
        				<FormItem label="介绍自己" prop="about">
        				    <Input type="text" v-model="formCustom.about" placeholder="让别人知道你"></Input>
        				</FormItem>
        				<FormItem>
        				    <Button type="primary" @click="handleSubmit('formCustom')">提交</Button>
        				    <Button @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
										<Button @click="toIndex" style="margin-left: 8px">返回主页</Button>
        				</FormItem>
    					</Form>
						</Card>
        	</div>
        	<div class="col-md-3">

        	<mySidebar></mySidebar>

        	</div>
      	</div>
    	</div>
    </section>
  </div>
</template>

<script>
import mySidebar from '../Page/sidebar'
export default {
	name: 'AddFriend',
	components: {
		mySidebar
	},
  data(){
		const validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('名称不能为空'));
      } else {
      	callback();
    	}
		};
		const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'));
      } else {
      	callback();
    	}
		};
		const validateRepass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else {
				if(value !== this.formCustom.pass){
					callback(new Error('两次密码不一致'));
				}
      	callback();
    	}
		};
  	return {
			formCustom: {
        name: '',
				pass: '',
				repass: '',
        about: '',
			},
			ruleCustom: {
        name: [
            { validator: validateName, trigger: 'blur' }
				],
				pass: [
            { validator: validatePass, trigger: 'blur' }
				],
				repass: [
            { validator: validateRepass, trigger: 'blur' }
        ],
      },
  	}
	},
	created() {
	},
	methods: {
		handleSubmit (name) {
  	  this.$refs[name].validate((valid) => {
				if (valid) {
					this.$api.addUser(this.formCustom).then( res => {
						if(res.data.ret == 200 && res.data.data.code == 1){
							this.$Message.success('注册成功，快去打开客厅的大门吧!');
							this.$router.push('/index')
						}
						else if(res.data.ret == 200 && res.data.data.code == 0){
							this.$Message.error(res.data.data.msg);
						}else{
							this.$Message.error('注册失败，请稍后重试!');
						}
					})
  	    } else {
  	      this.$Message.error('注册失败，请稍后重试!');
  	    }
  	  })
  	},
  	handleReset (name) {
  	  this.$refs[name].resetFields();
		},
		toIndex(){
			this.$router.push('/index')
		}
	}
}
</script>
