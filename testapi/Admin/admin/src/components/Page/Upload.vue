<template>
	<div class="Upload">
		<img class="pre-img" :src="src" alt="">
		<vue-core-image-upload :class="['pure-button', 'pure-button-primary', 'js-btn-crop']" 
		:crop="true" 
		text="上传图片" 
		url="/api/?s=Upload.UploadImg"
    extensions="png,gif,jpeg,jpg"
    @:imageuploaded="imageuploaded"
    @:errorhandle="handleError" ></vue-core-image-upload>
	</div>
</template>

<script>
import VueCoreImageUpload from 'vue-core-image-upload'
export default {
	name: "Upload",
	components: {
    VueCoreImageUpload
  },
	data() {
		return {
			src: './static/img/img.jpg',
      fileList: []
		}
	},
	methods:{
    imageuploaded(res) {
      console.log('11111')
    },
    handleError(){
      this.$notify.error({
        title: '上传失败',
        message: '图片上传接口上传失败'
      });
    }
  }
}
</script>

<style scoped>

</style>
