<template>
    <div class="Upload">
			<input type="file" @change="uploads">
			<Select v-model="type">
				<Option value="0">系统logo</Option>
        <Option value="1">管理员头像</Option>
        <Option value="2">文章封面</Option>
        <Option selected="selected" value="3">文章内容图片</Option>
				<Option value="4">其它</Option>
      </Select>
    	<p></p>
    	<img :src="imgUrl">
			<div id="showpic"></div>
			<Button type="primary" @click="uploadImg">Primary</Button>
    </div>
</template>
<script>
export default {
	name: '',
  data () {
    return {
			type:'',
			file:'',
    }
  },
  methods: {
    uploads (e) {
			const dir = e.target.files[0];//获取到当前文件对象
			this.file = dir
			var reader = new FileReader(); 
    	//将文件以Data URL形式读入页面 
    	reader.readAsDataURL(	this.file); 
    	reader.onload = function(ete){ 
        var result = document.getElementById("showpic"); 
        //显示文件 
        result.innerHTML='<img src="' + this.result +'" alt="" style="width:400px; height=300px" />'; 
    	} 
		},
		uploadImg(){
			let file = this.file
			var formData = new FormData();
			formData.append('file', file);
			formData.append('type', this.type);
			this.$api.UploadImg(formData).then( res => {
				if(res.data.ret == 200 && res.data.data.code == 1){
					setTimeout()
				}
			})
		}
  }
}
</script>
