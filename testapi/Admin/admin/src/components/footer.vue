<style scoped>
.Footer{
	/* margin-top: 200px; */
}

.Footer div{
	text-align: center;
	width: 100%;
	}
	.Footer a{
		text-decoration: none;
		color: black;
		font-size: 1.3em;
	}
	.admin h3{
		display: inline
	}
</style>

<template>
	<footer class="Footer">
    <div style="display:flex">
			<div class="admin"><h3>管理员：</h3><a href="http://www.ipso.live">ipso</a></div>
			<div>
				<h3>友情链接：</h3>
				<div v-for="items in Friends">
					<p><a href="http://" target="_blank" rel="noopener noreferrer">{{ items.name }}</a></p>
				</div>
			</div>
		</div>
	</footer>
</template>

<script>
export default {
	name: "CommonFooter",
	data(){
		return {
			Friends:[
				{
					name: "iimt",
					address: "http://www.iimt.me"
				},
				{
					name: "博主个人网站",
					address: "http://www.gaogege.live"
				}
			]
		}
	}
}
</script>