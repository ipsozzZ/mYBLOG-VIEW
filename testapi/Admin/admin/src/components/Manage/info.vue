<style scoped>
    
</style>
<template>
    <div class="info">
			<Row>
        <Col span="8" ><h3>管理员账号： {{ admin.username }}</h3></Col>
    	</Row>
			<Row>
				<Col span="8" ><h3>管理员编号： {{ admin.Id }}</h3> </Col>
    	</Row>
			<Row>
				<Col span="8" ><h3>管理员权限：{{ admin.limit }}</h3> </Col>
    	</Row>
			<Row>
				<Col span="8" ><h3>发表的文章数量: {{ articles }}</h3> </Col>
    	</Row>
			<Row>
				<Col span="8" ><Button ><h3><router-link to="/Message/edit">编辑我的资料</router-link></h3></Button> </Col>
    	</Row>
		</div>
</template>
<script>
    export default {
				name: "info",
				data() {
					return {
						articles: 0,
						admin: {
							username: 'ipso',
							Id: 1,
							limit: '超级管理员'
						}
					}
				}
    }
</script>
