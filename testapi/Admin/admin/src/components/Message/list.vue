<style scoped>
.Page{
	margin-top: 2em;
	text-align: center;
}
</style>

<template>
    <div id="List">
			<i-table border :content="self" :columns="columns7" :data="managers">

			</i-table>
    	<Page class="Page" :total="100"></Page>
		</div>

</template>

<script>
    export default {
			name: "List",
      data () {
        return {
          self: this,
          columns7: [
              {
                title: '账号',
                key: 'id',
              },
              {
                title: '账号',
                key: 'account'
              },
              {
                title: '操作',
                // key: 'action',
                width: 150,
                align: 'center',
                render (row, column, index) {
                  return `<i-button type="primary" size="small" @click="show(${index})">查看</i-button> <i-button type="error" size="small" @click="remove(${index})">删除</i-button>`;
                }
              }
          ],
          managers: []
        }
      },
      methods: {
        show (index) {
            this.$Modal.info({
                title: '用户信息',
                content: `姓名：${this.managers[index].account}<br>年龄：${this.managers[index].account}`
            })
        },
        remove (index) {
            this.data6.splice(index, 1);
				},
				getAdmin(){
					let that = this
					this.$api.GetAdmins().then( res => {
						this.managers = res.data.data.data
						console.log(res.data.data.data)
    			})
				}
			},
			created() {
    		this.getAdmin()
			},
			// mounted() {
    	// 	this.getAdmin()
			// }
    }
</script>