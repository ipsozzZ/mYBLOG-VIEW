<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
	name: 'App',
	data(){
		return {
			msg: '\n\n============ ipso ============\n作者：ipso（启明） \n地址：http://www.ipso.live \n来源：ipso的个人博客 \n转载请注明出处，谢谢合作\n============ ipso ============\n'
		}
	},
	mounted() {
		this.makeAdditionMessage()
	},
	methods: {
		makeAdditionMessage() {
			var targetDom = document.getElementById('app')
			var additionMsg = this.msg
			var body = document.getElementsByTagName('body')[0]
			//使用textarea可以在添加内容的时候产生换行的效果,也可以使用块元素标签，只要能产生换行效果就可行
			var hideTextarea = document.createElement('textarea')
			body.appendChild(hideTextarea)
			hideTextarea.style.position = 'absolute'
			hideTextarea.style.left = '-9999px'
			hideTextarea.style.top = '-9999px'

			// 第一个参数是事件名，string类型，能带on前缀（如onclick、oncopy）不能带
			targetDom.addEventListener('copy', function (e) {
				// 禁止默认的copy事件
				e.preventDefault()
				var selectionObject = window.getSelection() // 获取用户的选择内容或者是光标范围
				var selectString = selectionObject.toString() // 将window.getSelection()的对象转换为字符串

				// 注意，这里制作的range光标选中框需要放在 生成新选区之前进行制作
				var range = document.createRange()
				range.setStart(selectionObject.anchorNode, selectionObject.anchorOffset)
				range.setEnd(selectionObject.focusNode, selectionObject.focusOffset)

				// 添加新增的内容，并将它们放入剪切板
				hideTextarea.value = selectString
				hideTextarea.value += additionMsg
				hideTextarea.focus()
				hideTextarea.setSelectionRange(0, hideTextarea.value.length)
				document.execCommand('copy')

				// 将此前选中的文本再进行选中
				selectionObject.removeAllRanges()
				selectionObject.addRange(range)
			})
		},
	},
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
