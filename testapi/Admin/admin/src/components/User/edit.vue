<style scoped>
Form{
	width: 400px;
}
</style>

<template>
	<div class="Add">
		<h2>编辑用户</h2><br>
		<Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="100">
        <FormItem label="用户名" prop="name">
          <Input type="text" v-model="formCustom.name"></Input>
        </FormItem>
				<FormItem label="关于我" prop="about">
          <Input type="text" v-model="formCustom.about"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formCustom')">修改</Button>
          <Button @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
					<Button @click="toList()" style="margin-left: 8px">返回列表</Button>
        </FormItem>
    </Form>
	</div>
</template>

<script>
export default {
		name: "Add",
		created() {
			this.uid = this.$route.params.id
			this.getUser(this.uid)
		},
    data () {
			const validateName = (rule, value, callback) => {
        if (value === '') {
        	callback(new Error('请输入你的账号！'));
        } else {
          callback();
        }
      };
        
      return {
				uid: 0,
        formCustom: {
					id: 0,
					name: '',
					about: '',
        },
      	ruleCustom: {
					name: [
          	{ validator: validateName, trigger: 'blur' }
        	],
    		}
      }
    },
    methods: {
      handleSubmit (value) {
        this.$refs[value].validate((valid) => {
          if (valid) {
						this.$api.editUser(this.formCustom).then(res => {
							if(res.data.ret == 200){
								if(res.data.data.code == 0){
									this.$Message.error(res.data.data.msg);
								}else{
									this.$Message.success(res.data.data.msg);
									this.$router.push('/User/list')
								}
							}else{
								this.$Message.error("修改失败!");
							}
						})
          } else {
            this.$Message.error("修改失败!");
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
			},
			toList(){
				this.$router.push('/User/list')
			},
			getUser(Id){
				this.$api.getUser(Id).then( res => {
					if(res.data.ret == 200){
						if(res.data.data.code == 0){
							this.$Message.error("暂无数据!");
							this.$router.push('/User/list')
						}
						this.formCustom = res.data.data.data
					}else{
						this.$Message.error("服务器异常，稍后重试！");
						this.$router.push('/User/list')
					}
				})
			}
  	}
}
</script>

