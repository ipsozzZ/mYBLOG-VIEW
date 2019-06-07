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
  <div id="ArticleList">
		<section>
      <div class="container">
        <div class="row">
          <div class="col-md-9 Article">

            <div class="blog-main" v-for="article in articles" v-bind:key="article.id">
							<div class="col-md-6">
								<a href="javascript:;" @click="show(article.id)">
              		<img :src="article.face" class="img-responsive" />
              	</a>
							</div>
              <div class="blog-txt">
								<div class="heading-blog">
                 {{ article.title }}
                </div>
                  {{ article.desc }}
								<div class="blog-info">
                	<span class="label label-primary">{{ article.ctime }}</span>
                	<span class="label label-success">By {{ article.author }}</span>
                	<span class="label label-primary" style="background-color: #515151;">
										{{ article.like }}
										<Icon  type="ios-heart-outline" size="20" />
										<!-- <Icon v-else type="ios-heart" class="hand" @click="addLike(article.id)" size="20"  /> -->
									</span>
                	<span class="label label-info">
              			{{ article.comments }}
										<Icon type="ios-chatboxes-outline" size="20" />
                	</span>
              	</div>
              </div>
            </div>
            <!--BLOG ONE END -->

            <nav>
              <Page :total="pageCount" show-total :page-size="num" :current="currpage" @on-change="handlePage" />
            </nav>
             <!--PAGING  END -->
        	</div>
        	<div class="col-md-3">
						<ul class="list-group">
        			<li class="list-group-item">
   							<strong>Main Categories</strong>
  						</li>

							<li @click="getCount()" class="list-group-item">
  					  	<span class="badge">{{ this.All }}</span>
  					  	<a href="javascript:;"  >ALL</a> 
  						</li>

  						<li v-for="cate in cates" v-bind:key="cate.id" @click="getCount(cate)" class="list-group-item">
  					  	<span class="badge">{{ cate.count }}</span>
  					  	<a href="javascript:;"  >{{ cate.name }}</a> 
  						</li>
						</ul>

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
	name: 'ArticleList',
	components: {
		mySidebar
	},
  data(){
  	return {
			All: 0,
			isLike: 'like',
			currCate: 0,
			pageCount: 0,
			num: 10,
			currpage: 1,
  		blogs:{
				title: 'ipso',
				id: 0,
				content: 'content'
			},
			cates: [],
			articles: [],
  	}
	},
	created() {
		this.getCate()
		this.getCount()
		// this.getArticle(this.currpage, this.num)
	},
	methods: {
		getCate(){
			this.$api.getCates().then( res => {
				if(res.data.ret == 200 && res.data.data.code == 1){
					this.cates = res.data.data.data
					console.log(res.data.data.data)
				}else{
					this.cates = []
				}
			})
		},
		getCount(index = null){
			if(index == null){
				this.currCate = 0
			}else{
				this.currCate = index.id
			}
			if(this.currCate === 0){
				this.$api.countArticle().then( res => {
					if(res.data.ret != 200){
						this.pageCount = 0
					}
					else{
						this.pageCount = parseInt(res.data.data.data)
						this.All = parseInt(res.data.data.data)
						this.getArticle(this.currpage, this.num)
					}
				})
			}else{
				this.pageCount = parseInt(index.count)
				this.getArticle(this.currpage, this.num, this.currCate)
			}
		},
		getArticle(page, num, cate = 0){
			this.$api.getArticles(page, num, cate).then( res => {
				if(res.data.ret == 200 && res.data.data.code == 1){
					this.articles = res.data.data.data
				}else{
					this.articles = []
				}
			})
		},
		handlePage(value) {
			this.currpage = value
			this.getArticle(this.currpage, this.num, this.currCate)
		},
		addLike(index){
			if(!this.$commonjs.getCache(this.isLike + index)){
				this.like = false
			}else{
				this.addLike(index).then( res => {
					if(res.data.ret == 200 && res.data.data.code == 1){
						this.like = true
						this.$commonjs.setCache(this.isLike + index, index)
						this.$Message.success(res.data.data.msg)
						this.getArticle(this.currpage, this.num, this.currCate)
					}else{
						this.like = false
						this.$Message.success('error!')
					}
				})
			}
		},
		show(index){
			this.$router.push('/Article/show/' + index)
		}
	}
}
</script>
