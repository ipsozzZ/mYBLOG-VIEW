<style scoped>
.Page{
	margin-top: 2em;
	text-align: center;
}
</style>

<template>
    <div id="List">
			<Button><router-link to="/Category/add">添加栏目</router-link></Button><br><br>
			<i-table border :columns="columns7" :data="cate"></i-table>
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
          title: '栏目名称',
					key: 'name',
				},
				{
          title: '是否显示',
					key: 'isshow',
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
                    this.$router.push('/Category/edit/' + params.row.id)
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
      cate: [
        {
					id : 1,
					name: 'ipso',
					desc: "",
					isshow: 0,
        },
      ]
    }
  },
  methods: {
    show (index) {
      this.$Modal.info({
        title: 'User Info',
        content: `ID: ${this.cate[index].id}<br>name: ${this.cate[index].name}<br>isshow: ${this.cate[index].isshow}<br>desc: ${this.cate[index].desc}`
      })
		},
    remove (index) {
			let that = this
			that.$api.deleteCate(index).then(res => {
				if(res.data.data == null){
					that.$Message.error("删除失败！")
				}
				if(res.data.data.code == 0){
					that.$Message.error(res.data.data.msg)
				}else{
					that.$Message.success("删除成功！")
					this.$router.push('/Category/List')
				}
				
			})
		},
		getCate(){
			let that = this
			this.$api.getCates().then( res => {
				this.cate = res.data.data.data
  		})
		},
	},
	created() {
		this.getCate()
	},
}
</script>