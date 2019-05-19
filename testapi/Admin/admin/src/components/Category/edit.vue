<style scoped>
Form{
	width: 400px;
}
</style>

<template>
	<div class="Add">
		<h2>编辑栏目</h2><br>
		<Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
        <FormItem label="栏目名称" prop="name">
            <Input type="text" v-model="formCustom.name"></Input>
        </FormItem>
        <FormItem label="栏目概要" prop="desc">
            <Input type="text" v-model="formCustom.desc"></Input>
        </FormItem>
        <FormItem label="是否显示" prop="isshow">
            <RadioGroup v-model="formCustom.isshow">
                <Radio label="0">不显示</Radio>
                <Radio label="1">显示</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formCustom')">修改</Button>
            <Button @click="toList()" style="margin-left: 8px">返回列表</Button>
        </FormItem>
    </Form>
	</div>
</template>

<script>
  export default {
		name: "Add",
		created() {
			this.currId = this.$route.params.id
			this.getCate()
		},
    data () {
			const validateName = (rule, value, callback) => {
      	if (value === '') {
          callback(new Error('请输入你的账号！'));
      	} else {
          callback();
      	}
      };
      const validatEdesc = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('一句话介绍栏目！'));
        } else {
          callback();
        }
      };
        
    return {
			currId: '',
      formCustom: {
				id: 0,
				name: '',
				desc: '',
        isshow: '',
      },
      ruleCustom: {
				name: [
          { validator: validateName, trigger: 'blur' }
        ],
        desc: [
          { validator: validatEdesc, trigger: 'blur' }
        ],
      }
    }
    },
    methods: {
      handleSubmit (value) {
        this.$refs[value].validate((valid) => {
          if (valid) {
						this.$api.editCate(this.formCustom).then(res => {
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
			getCate(){
				let Id = this.currId
				this.$api.getCate(Id).then( res => {
					if(res.data.ret == 200){
						if(res.data.data.code == 0){
							this.$Message.error(res.data.data.msg)
							this.$router,push("/Category/list")
						}
						this.formCustom = res.data.data.data
					}else{
						this.$Message.error("获取失败")
						this.$router,push("/Category/list")
					}
				})
			},
			toList(){
				this.$router.push('/Category/list')
			}
    }
  }
</script>

