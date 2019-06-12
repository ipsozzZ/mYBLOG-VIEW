<template>
    <div class="Upload">
			<input type="file" @change="uploads" accept="image/jpg,image/png,image/jpeg,image/bmp,image/gif">
			<Select style="margin-top:2em" v-model="type">
        <Option value="1">管理员头像</Option>
        <Option value="2">文章封面</Option>
        <Option value="3">文章内容图片</Option>
				<Option value="4">系统logo</Option>
				<Option value="5">用户头像</Option>
				<Option value="6">其它</Option>
      </Select>
    	<p></p>
			<div id="showpic" style="margin-top:1em"></div>
			<Button style="margin-top: 2em" type="primary" @click="uploadImg">上传</Button>
			<Button @click="toList()" style="margin-top:2em">返回列表</Button>
    </div>
</template>
<script>
export default {
	name: 'Upload',
  data () {
    return {
			type: '',
			file: null,
    }
  },
  methods: {
    uploads (e) {
			const dir = e.target.files[0];//获取到当前文件对象
			this.file = dir
			var reader = new FileReader()
    	//将文件以Data URL形式读入页面 
    	reader.readAsDataURL(	this.file); 
    	reader.onload = function(ete){ 
        var result = document.getElementById("showpic"); 
        //显示文件 
        result.innerHTML='<img id="Pic" src="' + this.result +'" alt="" style="width:400px; height=300px" />'; 
    	}
		},
		uploadImg(){
			let file = this.file
			var formData = new FormData();
			formData.append('file', file);
			formData.append('type', this.type);
			this.$api.UploadImg(formData).then( res => {
				if(res.data.ret == 200 && res.data.data.code == 1){
					this.$Message.success(res.data.data.msg)
					setTimeout(() => {
						this.file = null
						this.type = null
						var result = document.getElementById("Pic");
						result.src = "#"
					},2000)
				}
			})
		},
		toList(){
			this.$router.push('/Picture/list')
		},
  }
}
</script>
