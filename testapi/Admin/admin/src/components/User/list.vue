<style scoped>
.Page{
	margin-top: 2em;
	text-align: center;
}
</style>

<template>
    <div id="List">
			<Button><router-link to="/User/add">添加用户</router-link></Button><br><br>
			<i-table border :columns="columns7" :data="user"></i-table>
			<Page class="Page" :total="pageCount" :page-size="num" show-total :current="currpage" @on-change="handlePage"></Page>
		</div>
</template>

<script>

export default {
	name: "List",
	created() {
		this.getCount()
		this.getusers(this.currpage, this.num)
	},
  data () {
    return {
			pageCount: 0,
			num: 10,
			currpage: 1,
      columns7: [
        {
          title: 'ID',
          key: 'id',
        },
        {
          title: '用户名',
					key: 'name',
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
                    this.$router.push('/User/edit/' + params.row.id)
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
      user: [
        // {
				// 	id : 1,
				// 	name: 'ipso',
				// 	pass: "",
				// 	like: "",
				// 	about: "",
        // },
      ]
    }
  },
  methods: {
    show (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `ID: ${this.user[index].id}<br>name: ${this.user[index].name}<br>about: ${this.user[index].about}`
      })
		},
    remove (index) {
			let that = this
			that.$api.deleteuser(index).then(res => {
				if(res.data.data == null){
					that.$Message.error("删除失败！")
				}
				if(res.data.data.code == 0){
					that.$Message.error(res.data.data.msg)
				}else{
					that.$Message.success("删除成功！")
					this.$router.push('/User/list')
				}
				
			})
		},
		getusers(currpage, num){
			this.$api.getuserList(currpage, num).then( res => {
				if(res.data.ret != 200){
					this.$Message.error("获取数据失败！")
				}else{
					if(res.data.data.code == 0){
						this.$Message.success(res.data.data.msg)
					}
					else{
						this.user = res.data.data.data
					}
				}
  		})
		},
		handlePage(value) {
			// let that = this
			this.currpage = value
      this.getUsers(this.currpage, this.num)
		},
		getCount(){
			this.$api.getCount().then( res => {
				if(res.data.ret == 200){
					this.pageCount = parseInt(res.data.data.data)
				}
			})
		}
	},
	
}
</script>