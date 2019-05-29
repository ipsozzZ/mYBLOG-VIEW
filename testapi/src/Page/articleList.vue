<style>
@import "../assets/css/bootstrap.css";
@import "../assets/css/font-awesome.css";
@import "../assets/css/style.css";
.Article img{
  display: block;
  max-width: 350px;
  height: auto;
}
</style>

<template>
  <div id="ArticleList">
		<section>
      <div class="container">
        <div class="row">
          <div class="col-md-9 Article">
            <div class="blog-main">
							<div class="col-md-6">
								<a href="singlepost.html">
              		<img src="../assets/img/1.jpg" class="img-responsive" />
              	</a>
							</div>
              
              <div class="blog-txt">
								<div class="heading-blog">
                 The security is main concern while concern whileconcern while
                </div>
                  Lorem
								<div class="blog-info">
                	<span class="label label-primary">Posted on 26th November 2014</span>
                	<span class="label label-success">In Technology</span>
                	<span class="label label-danger">By Jhon</span>
                	<span class="label label-info">
                  	<i class="fa fa-thumbs-up"></i>+ 10
              			<i class="fa fa-thumbs-down"></i>-3
                	</span>
              	</div>
              </div>
            </div>
            <!--BLOG ONE END -->
            <div class="blog-main">
							<div class="col-md-6">
								<a href="singlepost.html">
              		<img src="../assets/img/2.jpg" class="img-responsive" />
              	</a>
							</div>
              <div class="blog-txt">
								<div class="heading-blog">
                	phalpai的使用总结
              	</div>
                  LoremLoremLoremLoremLoremLorem LoremLoremLorem L
								<div class="blog-info">
                	<span class="label label-primary">Posted on 26th November 2014</span>
                	<span class="label label-success">In Technology</span>
                	<span class="label label-danger">By Jhon</span>
                	<span class="label label-info">
                  	<i class="fa fa-thumbs-up"></i>+ 10
              			<i class="fa fa-thumbs-down"></i>-3
                	</span>
              	</div>
              </div>
            </div>
             <!--BLOG TWO END -->
						 <div class="blog-main">
							<div class="col-md-6">
								<a href="singlepost.html">
              		<img src="../assets/img/2.jpg" class="img-responsive" />
              	</a>
							</div>
              <div class="blog-txt">
								<div class="heading-blog">
                	phalpai的使用总结
              	</div>
                  LoremLoremLoremLoremLoremLorem LoremLoremLorem L
								<div class="blog-info">
                	<span class="label label-primary">Posted on 26th November 2014</span>
                	<span class="label label-success">In Technology</span>
                	<span class="label label-danger">By Jhon</span>
                	<span class="label label-info">
                  	<i class="fa fa-thumbs-up"></i>+ 10
              			<i class="fa fa-thumbs-down"></i>-3
                	</span>
              	</div>
              </div>
            </div>
            <nav>
              <Page :total="20" show-total />
            </nav>
             <!--PAGING  END -->
        </div>
        <div class="col-md-3">
					<ul class="list-group">
        		<li class="list-group-item">
   						<strong>Main Categories</strong>
  					</li>
  					<li class="list-group-item">
  					  <span class="badge">104</span>
  					  <a href="#">Technology</a> 
  					</li>
        		<li class="list-group-item">
    					<span class="badge">34</span>
							<a href="#">Blogging</a> 
  					</li>
        		<li class="list-group-item">
    					<span class="badge">10</span>
							<a href="#">Information</a>
  					</li>
         		<li class="list-group-item">
    					<span class="badge">50</span>
							<a href="#">Security</a>
  					</li>
					</ul>

        	<ul class="list-group">
          	<li class="list-group-item">Advrtisements
            </li>
            <li class="list-group-item">
              <a href="#">
                <img src="../assets/img/ad1.jpg" class="img-responsive" />
              </a>
              <br />
            	<a href="#">
                <img src="../assets/img/ad2.jpg" class="img-responsive" />
              </a>
            </li>
          </ul>

          <br />
          <div>
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title">Subscribe For Updates</h3>
              </div>
              <div class="panel-body">
                <input type="text" class="form-control" placeholder="Your Email" />
                  <hr />
                  <a href="#" class="btn btn-info btn-sm btn-block">subscribe</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ArticleList',
  data(){
  	return {
  		blogs:{
				title: 'ipso',
				id: 0,
				content: 'content'
			},
  		search:""
  	}
  },
}
</script>
