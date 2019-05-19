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
            const validatDesc = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('一句话介绍栏目！'));
                } else {
                    callback();
                }
            };
            
            return {
                formCustom: {
										name: '',
										desc: '',
                    isshow: '',
                },
                ruleCustom: {
										name: [
                      { validator: validateName, trigger: 'blur' }
                    ],
                    desc: [
                      { validator: validatDesc, trigger: 'blur' }
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

