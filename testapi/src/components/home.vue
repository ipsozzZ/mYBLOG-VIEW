<template>
	<div id="Home">
		<header id="saying">
			<div class="title">MY WORLD</div>
			<div class="say">一起交流✳一起进步✳一起哈皮</div>
		</header>
		<div id="logo">
			<div><router-link to="/index"><img src="../../src/assets/logo.jpg"></router-link></div>
			<div><router-link to="/src/components/Activity"><img src="../../src/assets/images/activity.png"></router-link></div>
			<div><a target="_blank" href="https://github.com/ipsozzZ"><img src="../../src/assets/images/github.png"></a></div>
			<div><a target="_blank" href="https://weibo.com/6144279237/profile?topnav=1&wvr=6&is_all=1"><img src="../../src/assets/images/weibo.png"></a></div>
			<div><a target="_blank" href="https://www.zhihu.com/people/pso318-25/activities"><img src="../../src/assets/images/zhihu.png"></a></div>
			<div><a target="_blank" href="https://space.bilibili.com/261231853/"><img src="../../src/assets/images/bili.png"></a></div>
			<div><router-link to="/src/components/About"><img src="../../src/assets/images/about.png"></router-link></div>
		</div>
		<footer id="footer">
			<div>博主：<a href="http://wwww.ipso.live">ipso</a></div>
			<div>友情链接：<a href="http://www.iimt.me">iimt</a></div>
			<div>备案号：<span>浙ICP备18046964号</span></div>
		</footer>
	</div>
</template>

<script>
export default {
	name: 'Home'
}
</script>

<style scoped>

#saying {
	font-size: 40px;
	color: white;
	margin: 0 20 20px;
	padding-top: 40px;
}

#saying .say{
	font-size: 0.4em;
	margin-top: 1.5em;
}

#Home {
	background: url("../../src/assets/bg1.jpg") no-repeat;
	background-size:100% 100%;
	/* background-attachment:fixed; */
	width: 1500px;
	height: 728px;
}
#logo {
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	width: 100%;
	margin-top: 25%;
}

#logo a{
	width: 100px;
	height: 100px;
	border: 1.5px solid;
	margin: 6px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 100%;
	background-color: white;
	opacity:0.6;
	border-color: black;
}
#logo a:hover{
	width: 100px;
	height: 100px;
	border: 1.5px solid;
	margin: 6px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 100%;
	background-color: #FFFFF0;
	opacity:0.8;
	border-color: blue;
}

#logo img{
	width: 35px;
	height: 35px;
	/* border-radius: 100% */
}

#footer{
	color: white;
	font-size: 1em;
	margin-top: 2%;
}

#footer a{
	color: white;
	text-decoration: none;
}
</style>