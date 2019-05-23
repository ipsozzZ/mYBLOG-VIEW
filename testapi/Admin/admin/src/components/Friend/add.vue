<style scoped>
Form{
	width: 400px;
}
</style>

<template>
	<div class="Add">
		<h2>添加用户</h2><br>
		<Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="100">
        <FormItem label="昵称" prop="name">
          <Input type="text" v-model="formCustom.name"></Input>
        </FormItem>
				<FormItem label="地址" prop="address">
          <Input type="text" v-model="formCustom.address"></Input>
        </FormItem>
				<FormItem label="备注" prop="remarks">
          <Input type="text" v-model="formCustom.remarks"></Input>
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
        	callback(new Error('请输入你的昵称！'));
        } else {
          callback();
        }
      };
        
      return {
        formCustom: {
					name: '',
					address: '',
					state: 0,
					isshow: 0,
					remarks: '',
        },
      	ruleCustom: {
					name: [
          	{ validator: validateName, trigger: 'blur' }
        	],
					address: [
            { required: true, message: '地址不能为空', trigger: 'blur' },
					],
    		}
      }
    },
    methods: {
      handleSubmit (value) {
        this.$refs[value].validate((valid) => {
          if (valid) {
						this.$api.addFriend(this.formCustom).then(res => {
							if(res.data.ret == 200){
								if(res.data.data.code == 0){
									this.$Message.error(res.data.data.msg);
								}else{
									this.$Message.success(res.data.data.msg);
									this.$router.push('/Friend/list')
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
				this.$router.push('/Friend/list')
			}
  	}
}
</script>

