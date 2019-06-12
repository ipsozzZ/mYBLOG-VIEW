<style>
@import 'github-markdown-css';
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
	padding: 20px;
	line-height: 2;
}

.markdown-body img{
	width: 80%;
	margin: auto;
}

</style>
<template>
	<div class="my-markdown markdown-body">
		<vue-markdown :source="content"></vue-markdown>
	</div>
</template>

<script>
import vueMarkdown from 'vue-markdown'

export default {
	data () {
		return{}
	},
	components: {
		vueMarkdown
	},
	props: ['content']
}
</script>
