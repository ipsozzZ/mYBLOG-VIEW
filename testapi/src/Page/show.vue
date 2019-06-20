<style>
@import "../assets/css/bootstrap.css";
@import "../assets/css/font-awesome.css";
@import "../assets/css/style.css";
@import 'github-markdown-css';

.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
	padding: 45px;
	line-height: 2;
}

.markdown-body img{
	width: 80%;
	margin: auto;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}

.hand:hover{
	cursor:pointer
}
.Article img{
  display: block;
  max-width: 350px;
  height: auto;
}
.content{
	padding:10px 5px;
  border-bottom:2px solid #065883;
	margin-bottom:1em;
}

.heading-blog {
  color:#065883;
  font-weight:800;
}

.blogInfo{
	display: block;
  padding:10px 5px; 
	font-size:1.4em;
}
.comment{
	width: 100%;
	padding: 1em 2em;
}
.comment div{
	margin: 0.5em 0;
}
</style>

<template>
  <div id="show" v-title data-title="ipso-文章详情">
		<section>
      <div class="container">
        <div class="row">
          <div class="" style="width:85%; margin:auto">
            <div class="content" style="width:100%;padding: ; padding-left:20px">
							<img :src="article.face" width="700" style="margin:auto" class="img-responsive img-rounded" />
              <div class="blogInfo">
                <span class="label label-primary">{{ article.ctime }}</span>
                <span class="label label-success">In {{ cate }}</span>
                <span class="label label-danger">By {{ article.author }}</span>
                <span class="label label-info">
                  <Icon type="ios-heart-outline" size="20"/> {{ article.like }}
									<Icon type="ios-chatboxes-outline" size="19" style="border-left: 2px solid; margin-left: 0.5em; padding-left: 0.7em" />
									{{ article.comments }}
                </span>
              </div>
							<!-- 文章内容 -->
              <h2 width="500" style="text-align:center;margin-top:2em">{{ article.title }}</h2>
              <div style="text-align:left;" class="markdown-body">
								<vue-markdown :source="article.content"></vue-markdown>
							</div>
							<div width="500" style="text-align:center;margin:3em">
								<Button>
									<Icon v-if="isArtLike === false" type="ios-heart-outline" @click="addArtLike(article.id)" size="50" color="red"/>
									<Icon v-else type="ios-heart" @click="addArtLike(article.id)" size="50" color="red" />
								</Button>
							</div>
						</div>
            <!--BLOG MAIN SECTION END-->
                 
            <h3 ><strong>互动列表 :</strong></h3>
            <hr />
						<div class="comment">
							<div v-for="item in comments" :key="item.id" style="text-align: left;margin: 1em">
								<p style="font-weight:900;">{{ item.user }}:</p>
								<p style="margin-left:2em">{{ item.content }}</p>
								<hr />
							</div>
							<Button v-if="isAll === false" @click="getCommentAll(article.id)">查看更多</Button>
						</div>
						<Input v-model="newComment.content" type="textarea" :autosize="{minRows: 4}" placeholder="Enter something..."></Input>
            <Button @click="addComment('art')">发布评论</Button>
						<Button v-if="isLogin === false" @click="toList()">返回列表登录</Button>
						<!--COMMENTS SECTION END-->
          </div>
        	<!-- <div class="col-md-3">
        		<mySidebar></mySidebar>
        	</div> -->

        </div>
    	</div>
    </section>
  </div>
</template>

<script>
import mySidebar from '../Page/sidebar'
import vueMarkdown from 'vue-markdown'
export default {
	name: 'show',
	components: {
		mySidebar,
		vueMarkdown
	},
  data(){
  	return {
			currId: 1,
			isArtLike: false,
			cate: '',
			article: '',
			isAll: false,
			isLogin: false,
			comments: [],
			newComment: {
				uid: 0,
				parentid: 0,
				aid: 0,
				like: 0,
				content: '',
			},
  	}
	},
	created() {
		this.currId = this.$route.params.id
		this.getArticle(this.currId)
		let flag = this.$commonjs.getCache('a_like'+this.currId)
		if(flag === 'true'){
			this.isArtLike = true
		}
		if(this.$commonjs.getCache('u_name') && this.$commonjs.getCache('u_id')){
			this.isLogin = true
		}else{
			this.isLogin = false
		}
	},
	methods: {
		getArticle(Id){
			this.$api.getArtById(Id).then( res => {
				if(res.data.ret == 200 && res.data.data.code == 1){
					this.article = res.data.data.data
					this.getCate(this.article.cate)
					this.getDefault(this.article.id)
				}else{
					this.article = []
				}
			})
		},
		getCate(Id){
			this.$api.getCateById(Id).then( res => {
				if(res.data.ret == 200 && res.data.data.code == 1){
					this.cate = res.data.data.data.name
				}
			})
		},
		addArtLike(index){
			if(this.$commonjs.getCache('a_like'+this.currId) === 'true'){
				this.$Message.success('你已经给文章点过赞了呢，感谢支持!')
				this.isArtLike = true
			}else{
				this.$api.addArtLike(index).then( res =>{
					if(res.data.ret == 200 && res.data.data.code ==1){
						this.$commonjs.setCache('a_like'+this.currId, true)
						this.isArtLike = true
						this.getArticle(this.currId)
					}else{
						this.$commonjs.setCache('a_like'+this.currId, false)
						this.isArtLike = false
					}
				})
			}
		},
		getDefault(aid){
			this.$api.getDefaultComment(aid).then( res => {
				if(res.data.ret == 200 && res.data.data.code == 1){
					this.comments = res.data.data.data
				}else{
					this.comments = []
				}
			})
		},
		getCommentAll(index){
			this.$api.getComments(index).then( res => {
				if(res.data.ret == 200 && res.data.data.code == 1){
					this.comments = res.data.data.data
					this.isAll = true
				}else{
					this.comments = []
				}
			})
		},
		addComment(index){
			let user = this.$commonjs.getCache('u_name')
			if(!user){
				this.$Message.info({
          content: '只有进入客厅才可以给博主留言噢，右转进入客厅',
          duration: 5
        });
			}else{
				this.newComment.uid = this.$commonjs.getCache('u_id')
				if(index === 'art'){
					this.newComment.parentid = 0
					this.newComment.aid = parseInt(this.currId)
				}else{
					this.newComment.aid = 0
					this.newComment.parentid = parseInt(index)
				}
				this.$api.addComment(this.newComment).then( res => {
					if(res.data.ret == 200 && res.data.data.code == 1){
						this.$Message.success('评论成功!')
						this.getArticle(this.currId)
						this.newComment.content = ''
					}else{
						this.$Message.error('评论失败，稍后重试!')
						this.newComment.content = ''
					}
				})
			}
		},
		toList(){
			this.$router.push('/Article/list')
		}
	}
}
</script>
