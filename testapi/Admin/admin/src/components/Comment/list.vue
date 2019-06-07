<style scoped>
.Page{
	margin-top: 2em;
	text-align: center;
}
</style>

<template>
    <div id="List">
			<Select v-model="currArticle"  placeholder="选择文章">
  			<Option v-for="item in article" v-bind:key="item.id" :value="item.id">{{ item.title }}</Option>
      </Select>
			<Button @click="getByArt">确认选择</Button><br><br>
			<i-table border :columns="columns7" :data="comment"></i-table>
			<Page class="Page" :total="pageCount" :page-size="num" show-total :current="currpage" @on-change="handlePage"></Page>
		</div>
</template>

<script>

export default {
	name: "List",
	created() {
		this.currArticle = 0
		this.getCount()
		this.getcomments(this.currpage, this.num)
		this.getArt()
	},
  data () {
    return {
			pageCount: 0,
			num: 10,
			currpage: 1,
			currArticle: '',
			article:[],
      columns7: [
        {
          title: 'ID',
          key: 'id',
        },
        {
          title: '文章编号',
					key: 'aid',
				},
				{
          title: '用户编号',
					key: 'uid',
				},
				{
          title: '父评论编号',
					key: 'parentid',
				},
				{
          title: '评论数',
					key: 'comment',
				},
				{
          title: '点赞',
					key: 'like',
				},
        {
          title: '操作',
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
							}, '查看'),
							h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$router.push('/Comment/edit/' + params.row.id)
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.row.id)
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      comment: []
    }
  },
  methods: {
    show (index) {
      this.$Modal.info({
        title: 'comment Info',
				content: `ID: ${this.comment[index].id}<br>aid: ${this.comment[index].aid}
				<br>uid: ${this.comment[index].uid}<br>parentid: ${this.comment[index].parentid}
				<br>comment: ${this.comment[index].comment}<br>like: ${this.comment[index].like}<br>content: ${this.comment[index].content}`
      })
		},
    remove (index) {
			let that = this
			that.$api.deleteComment(index).then(res => {
				if(res.data.data == null){
					that.$Message.error("删除失败！")
				}
				if(res.data.data.code == 0){
					that.$Message.error(res.data.data.msg)
				}else{
					that.$Message.success("删除成功！")
					that.getCount()
					that.getcomments(that.currpage, that.num)
				}
				
			})
		},
		getcomments(currpage, num){
			if(parseInt(this.currArticle) == 0){
				this.$api.getCommentList(currpage, num).then( res => {
					if(res.data.ret != 200){
						this.$Message.error("获取数据失败！")
					}else{
						if(res.data.data.code == 0){
							this.$Message.success(res.data.data.msg)
							this.comment = []
						}
						else{
							this.comment = res.data.data.data
						}
					}
  			})
			}else{
				this.$api.getListByArticle(parseInt(this.currArticle), currpage, num).then( res => {
					if(res.data.ret != 200){
						this.$Message.error("获取数据失败！")
						this.comment = []
					}else{
						if(res.data.data.code == 0){
							this.$Message.success(res.data.data.msg)
							this.comment = []
						}
						else{
							this.comment = res.data.data.data
						}
					}
  			})
			}
		},
		handlePage(value) {
			// let that = this
			this.currpage = value
      this.getcomments(this.currpage, this.num)
		},
		getCount(){
			if(parseInt(this.currArticle) == 0){
				this.$api.getCommentCount().then( res => {
					if(res.data.ret == 200 && res.data.data.code == 1){
						this.pageCount = parseInt(res.data.data.data)
					}else{
						this.pageCount = 0
					}
				})
			}else{
				this.$api.getCountByArticle(parseInt(this.currArticle)).then( res => {
					if(res.data.ret == 200 && res.data.data.code == 1){
						this.pageCount = parseInt(res.data.data.data)
					}else{
						this.pageCount = 0
					}
				})
			}
		},
		getByArt(){
			this.getCount()
			this.getcomments(this.currpage, this.num)
		},
		getArt(){
			this.$api.getAllArticle().then( res => {
				if(res.data.ret == 200 && res.data.data.code == 1){
					this.article = res.data.data.data
				}
			})
		}
	},
}
</script>