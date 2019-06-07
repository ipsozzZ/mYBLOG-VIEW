<style scoped>
Form{
	width: 400px;
}
</style>

<template>
	<div class="Add">
		<h2>编辑评论</h2><br>
		<Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="100">
        <FormItem label="编号" prop="id">
          <Input type="text" disabled v-model="formCustom.id"></Input>
        </FormItem>
				<FormItem label="用户编号" prop="uid">
          <Input type="text" disabled v-model="formCustom.uid"></Input>
        </FormItem>
				<FormItem label="文章编号" prop="aid">
          <Input type="text" disabled v-model="formCustom.aid"></Input>
        </FormItem>
				<FormItem label="父评论编号" prop="parentid">
          <Input type="text" disabled v-model="formCustom.parentid"></Input>
        </FormItem>
				<FormItem label="评论数" prop="comment">
          <Input type="text" disabled v-model="formCustom.comment"></Input>
        </FormItem>
				<FormItem label="点赞数" prop="like">
          <Input type="text" disabled v-model="formCustom.like"></Input>
        </FormItem>
				<FormItem label="内容" prop="content">
          <Input v-model="formCustom.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="说点什么吧……"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formCustom')">确认</Button>
          <Button @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
					<Button @click="toList()" style="margin-left: 8px">返回列表</Button>
        </FormItem>
    </Form>
	</div>
</template>

<script>
export default {
		name: "Add",
		created(){
			this.currId = this.$route.params.id
			this.getComment(this.currId)
		},
    data () {
      return {
				currId: 0,
        formCustom: {
					id: 0,
					uid: 0,
					aid: 0,
					parentid: 0,
					comment: 0,
					like: 0,
					content: '',
        },
      	ruleCustom: {
					content: [
            { required: true, message: '评论不能为空', trigger: 'blur' },
					],
    		}
      }
    },
    methods: {
      handleSubmit (value) {
        this.$refs[value].validate((valid) => {
          if (valid) {
						this.$api.editComment(this.formCustom).then(res => {
							if(res.data.ret == 200){
								if(res.data.data.code == 0){
									this.$Message.error(res.data.data.msg);
								}else{
									this.$Message.success(res.data.data.msg);
									this.$router.push('/Comment/list')
								}
							}else{
								this.$Message.error("更新失败!");
							}
						})
          } else {
            this.$Message.error("更新失败!");
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
			},
			toList(){
				this.$router.push('/Comment/list')
			},
			getComment(Id){
				this.$api.getComment(Id).then( res => {
					if(res.data.ret == 200){
						if(res.data.data.code == 0){
							this.$Message.error("暂无数据!");
							this.$router.push('/Comment/list')
						}
						this.formCustom = res.data.data.data
					}else{
						this.$Message.error("服务器异常，稍后重试！");
						this.$router.push('/Comment/list')
					}
				})
			}
  	}
}
</script>

