<style scoped>
.Page{
	margin-top: 2em;
	text-align: center;
}
</style>

<template>
    <div id="List">
			<Button><router-link to="/friend/add">添加友链</router-link></Button><br><br>
			<i-table border :columns="columns7" :data="friend"></i-table>
		</div>
</template>

<script>

export default {
	name: "List",
	created() {
		this.getfriends()
	},
  data () {
    return {
      columns7: [
        {
          title: 'ID',
          key: 'id',
        },
        {
          title: '昵称',
					key: 'name',
				},
				{
          title: '地址',
					key: 'address',
				},
				{
          title: '备注',
					key: 'remarks',
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
                    this.$router.push('/Friend/edit/' + params.row.id)
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
      friend: []
    }
  },
  methods: {
    show (index) {
      this.$Modal.info({
        title: 'friend Info',
				content: `ID: ${this.friend[index].id}<br>name: ${this.friend[index].name}<br>address: ${this.friend[index].address}
				<br>state: ${this.friend[index].state}<br>isshow: ${this.friend[index].isshow}<br>remarks: ${this.friend[index].remarks}`
      })
		},
    remove (index) {
			let that = this
			that.$api.deleteFriend(index).then(res => {
				if(res.data.data == null){
					that.$Message.error("删除失败！")
				}
				if(res.data.data.code == 0){
					that.$Message.error(res.data.data.msg)
				}else{
					that.$Message.success("删除成功！")
					that.getfriends()
				}
				
			})
		},
		getfriends(){
			this.$api.getfriends().then( res => {
				// console.log(res)
				if(res.data.ret != 200){
					this.$Message.error("获取数据失败！")
				}else{
					if(res.data.data.code == 0){
						this.$Message.success(res.data.data.msg)
					}
					else{
						this.friend = res.data.data.data
					}
				}
  		})
		},
		handlePage(value) {
			// let that = this
			this.currpage = value
      this.getfriends()
		},
	},
	
}
</script>