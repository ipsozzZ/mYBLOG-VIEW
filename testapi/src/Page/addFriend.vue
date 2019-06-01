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
							<p slot="title">申请友链</p>
							<Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
        				<FormItem label="站点名称" prop="name">
            			<Input type="text" v-model="formCustom.name" placeholder="输入你的站点名称"></Input>
        				</FormItem>
        				<FormItem label="站点地址" prop="address">
        				    <Input type="text" v-model="formCustom.address" placeholder="输入你的站点地址须带有:http://"></Input>
        				</FormItem>
        				<FormItem label="备注" prop="remarks">
        				    <Input type="text" v-model="formCustom.remarks" placeholder="输入你的备注，让别人知道你"></Input>
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
        callback(new Error('站点名称不能为空'));
      } else {
      	callback();
    	}
		};
		const validateAddress = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('站点地址不能为空'));
      } else {
      	callback();
    	}
		};
		const validateRemarks = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('备注不能为空'));
      } else {
      	callback();
    	}
    };
  	return {
			formCustom: {
        name: '',
        address: '',
        remarks: ''
			},
			ruleCustom: {
        name: [
            { validator: validateName, trigger: 'blur' }
				],
				address: [
            { validator: validateAddress, trigger: 'blur' }
				],
				remarks: [
            { validator: validateRemarks, trigger: 'blur' }
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
					this.$api.aplayFriend(this.formCustom).then( res => {
						if(res.data.ret == 200 && res.data.data.code == 1){
							this.$Message.success('申请成功，请等待博主处理!');
						}
						else if(res.data.ret == 200 && res.data.data.code == 0){
							this.$Message.error(res.data.data.msg);
						}else{
							this.$Message.error('申请失败，请稍后重试!');
						}
					})
  	    } else {
  	      this.$Message.error('申请失败，请稍后重试!');
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
