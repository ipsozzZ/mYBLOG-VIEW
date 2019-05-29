<style scoped>
@import "../assets/css/bootstrap.css";
@import "../assets/css/font-awesome.css";
@import "../assets/css/style.css";
</style>
<template>
    <div class="Index">
			<myHeader></myHeader>
			<Article></Article>
			<hr />
    	<div class="container">
        <div class="row">
          <div class="col-md-6 text-center set-foot">
            <h5 class="col-md-6">友情链接：</h5>
						<div>
							<div class="col-md-12">
								<span>ipso: </span>
								<a href="#">ipso</a>
							</div>
							<div class="col-md-12">
								<span>iimt: </span>
								<a href="#">iimt</a>
							</div>
							<div class="col-md-12">
								<span>iiasdsadsadmt: </span>
								<a href="#">iimt</a>
							</div>
							<div class="col-md-12">
								<Button><router-link to="#">申请友链</router-link></Button>
							</div>
						</div>
          </div>
        </div>
				<p class="col-md-6" style="padding: 0.5em 0;"><i>备案号：</i> <i>浙ICP备18046964号</i></p>
    	</div>
		</div>
</template>
<script>
import Article from '../Page/articleList'
import myHeader from '../Page/header'
export default {
	name: 'Index',
	components: {
		Article,
		myHeader
	},
	data(){
		return {}
	}
}
</script>




