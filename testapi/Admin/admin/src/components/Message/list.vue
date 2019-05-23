<style scoped>
.Page{
	margin-top: 2em;
	text-align: center;
}
</style>

<template>
    <div id="List">
			<Button><router-link to="/Message/add">添加管理员</router-link></Button><br><br>
			<!-- <Button type="primary">Primary</Button> -->
			<i-table border :columns="columns7" :data="managers"></i-table>
		</div>

</template>

<script>

export default {
	name: "List",
  data () {
    return {
      columns7: [
        {
          title: 'ID',
          key: 'id',
            
        },
        {
          title: '账号',
					key: 'account',
				},
				{
          title: '超级管理员',
          key: 'limit',
            
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
					account: 'ipso',
					limit: 1,
        },
        {
					id : 2,
					account: 'test2',
					limit: 1,
        },
        {
					id : 3,
					account: 'test3',
					limit: 1,
        },
        {
					id : 4,
					account: 'test4',
					limit: 1,
        }
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
		changeLimit(index) {
			let that = this
			that.$api.changeLimit(index).then(res => {
				if(res.data.data == null){
					that.$Message.error("失败！")
				}
				if(res.data.data.data.code == 0){
					that.$Message.error(res.data.data.data.mag)
				}
				that.$Message.success("授权成功！")
				this.$router.push('/Message/List')
			})

		},
    remove (index) {
			let that = this
			that.$api.deleteAdmin(index).then(res => {
				if(res.data.data == null){
					that.$Message.error("删除失败！")
				}
				if(res.data.data.code == 0){
					that.$Message.error(res.data.data.msg)
				}else{
					that.$Message.success("删除成功！")
					this.getAdmin()
				}
				
			})
		},
		getAdmin(){
			let that = this
			this.$api.GetAdmins().then( res => {
				this.managers = res.data.data.data
  		})
		},
	},
	created() {
		this.getAdmin()
	},
}
</script>