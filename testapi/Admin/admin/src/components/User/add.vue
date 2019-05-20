<style scoped>
Form{
	width: 400px;
}
</style>

<template>
	<div class="Add">
		<h2>添加栏目</h2><br>
		<Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
        <FormItem label="栏目名称" prop="name">
          <Input type="text" v-model="formCustom.name"></Input>
        </FormItem>
        <FormItem label="密码" prop="pass">
          <Input type="password" v-model="formCustom.pass"></Input>
        </FormItem>
				<FormItem label="再次输入密码" prop="repass">
          <Input type="password" v-model="formCustom.repass"></Input>
        </FormItem>
				<FormItem label="关于我" prop="about">
          <Input type="text" v-model="formCustom.about"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formCustom')">添加</Button>
          <Button @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
					<Button @click="toList()" style="margin-left: 8px">返回列表</Button>
        </FormItem>
    </Form>
	</div>
</template>

<script>
export default {
		name: "Add",
    data () {
			const validateName = (rule, value, callback) => {
        if (value === '') {
        	callback(new Error('请输入你的账号！'));
        } else {
          callback();
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('一句话介绍栏目！'));
        } else if(value.length < 4){
					callback(new Error('密码长度必须大于等于4位！'));
				} else {
					if (this.formCustom.PassCheck !== '') {
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
          	{ validator: validatPass, trigger: 'blur' }
					],
					pass: [
          	{ validator: validatePassCheck, trigger: 'blur' }
        	],
    		}
      }
    },
    methods: {
      handleSubmit (value) {
        this.$refs[value].validate((valid) => {
          if (valid) {
						this.$api.addCate(this.formCustom).then(res => {
							if(res.data.ret == 200){
								if(res.data.data.code == 0){
									this.$Message.error(res.data.data.msg);
								}else{
									this.$Message.success(res.data.data.msg);
									this.$router.push('/Category/List')
								}
							}else{
								this.$Message.error("添加失败!");
							}
						})
          } else {
            this.$Message.error("添加失败!");
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
			},
			toList(){
				this.$router.push('/Category/list')
			}
  	}
}
</script>

