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
  <div id="About" v-title data-title="ipso-About">
		<section>
      <div class="container">
        <div class="row">
          <div class="col-md-9">
            	<Card>
                <p slot="title">基本资料</p>
                <div class="row">
									<div class="col-md-1">博主:</div>
									<div class="col-md-3">{{ config.host }}</div>
								</div>
								<div class="row">
									<div class="col-md-1">QQ:</div>
									<div class="col-md-3">{{ config.qq }}</div>
								</div>
								<div class="row">
									<div class="col-md-1">电话:</div>
									<div class="col-md-3">{{ config.phone }}</div>
								</div>
								<div class="row">
									<div class="col-md-1">职业:</div>
									<div class="col-md-3">{{ config.work }}</div>
								</div>
								<div class="row">
									<div class="col-md-1">爱好:</div>
									<div class="col-md-3">{{ config.hobby }}</div>
								</div>
            	</Card>

						<div style="background:#eee;padding: 20px">
        			<Card :bordered="false">
            		<p slot="title">博主自述:</p>
            		<p>{{ config.about }}</p>
        			</Card>
    				</div>
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
	name: 'About',
	components: {
		mySidebar
	},
  data(){
  	return {
			configId: 1,
			config: [],
  	}
	},
	created() {
		this.getConfigId()
	},
	methods: {
	getConfig(Id){
			this.$api.getConfigs(Id).then( res => {
				if(res.data.ret == 200 && res.data.data.code == 1){
					this.config = res.data.data.data
				}
			})
		},
		getConfigId(){
			this.$api.getConfigId().then( res => {
				if(res.data.ret == 200 && res.data.data.code == 1){
					this.configId = parseInt(res.data.data.data)
					this.getConfig(this.configId)
				}
			})
		}
	}
}
</script>
