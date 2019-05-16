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
			<i-table border :content="self" :columns="columns7" :data="managers"></i-table>
    	<Page class="Page" :total="pageCount" :page-size="num" show-total :current="currpage" @on-change="handlePage"></Page>
		</div>

</template>

<script>

export default {
	inject:["reload"],
	name: "List",
	created() {
		this.getCount()
		this.getArticle(this.currpage, this.num)
		// this.num = this.$commonjs.getPageNum()
	},
  data () {
    return {
			pageCount: "",
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
          title: '文章分类',
          key: 'cate',
            
				},
				{
          title: '文章是否置顶',
          key: 'istop',
            
				},
				{
          title: '文章状态',
          key: 'state',
            
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
										this.$router.push("/Article/show/"+params.row.id)
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
                    this.changeLimit(params.row.id)
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
    show (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `account: ${this.managers[index].account}<br>id: ${this.managers[index].id}<br>limit: ${this.managers[index].limit}`
      })
		},
    remove (index) {
			console.log(index)
			// this.managers.splice(index, 1);
			let that = this
			that.$api.deleteArticle(index).then(res => {
				console.log(res)
				if(res.data.data == null){
					that.$Message.error("删除失败！")
				}
				if(res.data.data.code == 0){
					that.$Message.error(res.data.data.msg)
				}else{
					that.$Message.success("删除成功！")
					that.managers.splice(index, 1);
					that.$router.push('/Article/List')
				}
				
			})
		},
		getArticle(currpage,num){
			let that = this
			that.$api.listArticle(currpage, num).then( res => {
				if(res.data.ret != 200){
					that.$Message.success("获取数据失败！")
					that.managers = null
				}else{
					if(res.data.data.code == 0){
						that.$Message.success(res.data.data.msg)
						that.managers = null
					}
					else{
						that.managers = res.data.data.data
					}
				}
  		})
		},
		getCount(){
			let that = this
			that.$api.countArticle().then( res => {
				if(res.data.ret != 200){
					that.pageCount = 0
				}
				else{
					that.pageCount = parseInt(res.data.data.data)
				}
			})
		},
		handlePage(value) {
			let that = this
			that.currpage = value
      that.getArticle(that.currpage, that.num)
    },
	},
}
</script>