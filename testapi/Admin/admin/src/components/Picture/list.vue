<style scoped>
.Page{
	margin-top: 2em;
	text-align: center;
}

.Type{
	display: flex;
	margin-bottom: 1em;
	width: 50%
}
</style>

<template>
    <div id="List">
			<Button><router-link to="/Page/Upload">上传图片</router-link></Button><br><br>
			<p>图片分类：</p>
			<div class="Type">
				<Select v-model="type">
        	<Option value="1">管理员头像</Option>
        	<Option value="2">文章封面</Option>
        	<Option value="3">文章内容图片</Option>
					<Option value="4">系统logo</Option>
					<Option value="5">用户头像</Option>
					<Option value="6">其它</Option>
      	</Select>
				<Button @click="getType" style="margin-left:1em">选择分类</Button><br><br>
			</div>
			<i-table border :columns="columns7" :data="picture"></i-table>
			<Page v-if="jage() === true" class="Page" :total="pageCount" :page-size="num" show-total :current="currpage" @on-change="handlePage"></Page>
		</div>
</template>

<script>

export default {
	name: "List",
	created() {
		this.getCount()
		this.getPics(this.currpage, this.num)
	},
  data () {
    return {
			type: null,
			pageCount: 0,
			num: 10,
			currpage: 1,
      columns7: [
        {
          title: 'ID',
          key: 'id',
        },
        {
          title: '缩略图',
					key: 'src',
					render: (h, params) => {
            return h('div', [
                h('img', {
                  attrs: {
										src: params.row.src
									},
									style: {
                    width: '40px',
                    height: '30px'
                	}
                })
            ]);
        	}
				},
				{
          title: '分类',
					key: 'type',
				},
        {
          title: '操作',
          key: 'action',
          width: 150,
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
                    this.show(params.row.id)
                  }
                }
							}, '查看'),
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
      picture: []
    }
  },
  methods: {
    show (index) {
			console.log(index)
			this.$router.push('/Picture/show/' + index)
		},
		jage(){
			if(this.type === null || this.type == 2 || this.type == 3) return true
			return false;
		},
		getType(){
			this.getCount()
			this.getPics(this.currpage, this.num)
		},
    remove (index) {
			let that = this
			that.$api.deletePic(index).then(res => {
				if(res.data.data == null){
					that.$Message.error("删除失败！")
				}
				if(res.data.data.code == 0){
					that.$Message.error(res.data.data.msg)
				}else{
					that.$Message.success("删除成功！")
					that.getCount()
					that.getPics(that.currpage, that.num)
				}
				
			})
		},
		getPics(currpage, num){
			this.$api.getPicList(currpage, num, this.type).then( res => {
				if(res.data.ret != 200){
					this.$Message.error("暂无数据")
					this.picture = []
				}else{
					if(res.data.data.code == 0){
						this.$Message.error(res.data.data.msg)
						this.picture = []
					}
					else{
						this.picture = res.data.data.data
					}
				}
  		})
		},
		handlePage(value) {
			this.currpage = value
      this.getPics(this.currpage, this.num)
		},
		getCount(){
			this.$api.getPicCount(this.type).then( res => {
				if(res.data.ret == 200 && res.data.data.code == 1){
					this.pageCount = parseInt(res.data.data.data)
				}
			})
		}
	},
	
}
</script>