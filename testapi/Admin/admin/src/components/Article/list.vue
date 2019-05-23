<style scoped>
.Page{
	margin-top: 2em;
	text-align: center;
}
</style>

<template>
    <div id="List">
			<Button><router-link to="/Article/add">添加文章</router-link></Button><br><br>
			<!-- <Button type="primary">Primary</Button> -->
			<i-table border :columns="columns7" :data="managers"></i-table>
    	<Page class="Page" :total="pageCount" :page-size="num" show-total :current="currpage" @on-change="handlePage"></Page>
		</div>

</template>

<script>

export default {
	name: "List",
	created() {
		this.getCount()
		this.getArticle(this.currpage, this.num)
	},
  data () {
    return {
			pageCount: 0,
			num: 10,
			currpage: 1,
      columns7: [
        {
          title: '文章编号',
          key: 'id',
          
        },
        {
          title: '文章标题',
					key: 'title',
				},
				{
          title: '文章作者',
          key: 'author',
          
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
										// this.show(params.index)
										this.$router.push("/Article/show/" + params.row.id)
                  }
                }
							}, '详情'),
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
										// this.changeLimit(params.row.id)
										this.$router.push("/Article/edit/" + params.row.id)
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
      managers: [
        {
					id : 1,
					title: '',
					author: '',
					cate: '',
					istop: 0,
					desc: '',
					keywords: '',
					like: '',
					comments: '',
					face: '',
					state: '',
					content: '',
					rtime: 0,
					ctime: 0,
        },
      ]
    }
  },
  methods: {
    remove (index) {
			this.$api.deleteArticle(index).then(res => {
				if(res.data.data == null){
					this.$Message.error("删除失败！")
				}
				if(res.data.data.code == 0){
					this.$Message.error(res.data.data.msg)
				}else{
					this.$Message.success("删除成功！")
					this.getCount()
					this.getArticle(this.currpage, this.num)
				}
			})
		},
		getArticle(currpage,num){
			// let that = this
			this.$api.listArticle(currpage, num).then( res => {
				if(res.data.ret != 200){
					this.$Message.success("获取数据失败！")
				}else{
					if(res.data.data.code == 0){
						this.$Message.success(res.data.data.msg)
					}
					else{
						this.managers = res.data.data.data
					}
				}
  		})
		},
		getCount(){
			// let that = this
			this.$api.countArticle().then( res => {
				if(res.data.ret != 200){
					this.pageCount = 0
				}
				else{
					this.pageCount = parseInt(res.data.data.data)
				}
			})
		},
		handlePage(value) {
			// let that = this
			this.currpage = value
      this.getArticle(this.currpage, this.num)
		},
	},
}
</script>