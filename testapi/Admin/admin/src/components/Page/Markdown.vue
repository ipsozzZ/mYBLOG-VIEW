<template>
	<div class="my-markdown">
		<vue-markdown :source="content"></vue-markdown>
	</div>
</template>

<script>
import vueMarkdown from 'vue-markdown'

export default {
	data () {
		console.log(this.content)
	},
	components: {
		vueMarkdown
	},
	props: ['content']
}
</script>

<style>

</style>
