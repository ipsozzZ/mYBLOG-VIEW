<style scoped>
html{
	height: 100%;
}

body{
	/* display: flex;
	flex-direction: column; */
	height: auto;
}

.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout a{
	color: black;
}
.layout a:hover{
	color: #1C86EE;
}
</style>

<template>
    <div class="layout">
        <Layout>
            <v-header></v-header>
            <Layout>
								<!-- 侧栏 -->
							<Sider hide-trigger :style="{background: '#fff'}">
      					<Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
      						  <Submenu name="1">
      						      <template slot="title">
														<Icon type="md-person"></Icon>
      						          站点管理员
      						      </template>
      						      <MenuItem name="1-1"> <router-link to="/Message/list">管理员列表</router-link> </MenuItem>
      						      <MenuItem name="1-2"> <router-link to="/Message/add">添加管理员</router-link></MenuItem>
      						  </Submenu>
      						  <Submenu name="2">
      						      <template slot="title">
      						          <Icon type="ios-keypad"></Icon>
      						          用户管理
      						      </template>
      						      <MenuItem name="2-1"> <router-link to="/src/components/User/list">用户列表</router-link> </MenuItem>
      						      <MenuItem name="2-2"> <router-link to="/src/components/User/add">添加用户</router-link> </MenuItem>
      						  </Submenu>
      						  <Submenu name="3">
      						      <template slot="title">
      						          <Icon type="ios-cafe" />
      						          文章管理
      						      </template>
      						      <MenuItem name="3-1"><router-link to="/src/components/Article/list">文章列表</router-link></MenuItem>
      						      <MenuItem name="3-2"><router-link to="/src/components/Article/add">添加文章</router-link></MenuItem>
      						  </Submenu>

										<Submenu name="4">
      						      <template slot="title">
      						          <Icon type="ios-cafe" />
      						          互动管理
      						      </template>
      						      <MenuItem name="4-1"><router-link to="/src/components/Comment/list">互动列表</router-link></MenuItem>
      						      <MenuItem name="4-2"><router-link to="/src/components/Comment/add">回复互动</router-link></MenuItem>
      						  </Submenu>
										<Submenu name="5">
      						      <template slot="title">
      						          <Icon type="ios-cafe" />
      						          栏目管理
      						      </template>
      						      <MenuItem name="5-1"><router-link to="/src/components/Category/list">栏目列表</router-link></MenuItem>
      						      <MenuItem name="5-2"><router-link to="/src/components/Category/add">添加栏目</router-link></MenuItem>
      						  </Submenu>
										<MenuItem>
      						      <Icon type="ios-folder" />
      						        文件管理
      						  </MenuItem>
										<MenuItem>
      						      <Icon type="md-build" />
      						        站点设置
      						  </MenuItem>
    						</Menu>
  						</Sider>
							<!-- end -->

              <Layout :style="{padding: '0 24px 24px'}">

								<!-- 当前位置 -->
        				<Breadcrumb :style="{margin: '24px 0'}">
            			<BreadcrumbItem>{{ Home }}</BreadcrumbItem>
        				</Breadcrumb>
								<!-- end -->

								<!-- content -->
        				<Content :style="{padding: '24px', minHeight: '480px', background: '#fff'}">
            			<transition name="move" mode="out-in"><router-view></router-view></transition>
        				</Content>
								<!-- end -->

    					</Layout>
							
            </Layout>

						<v-footer></v-footer>

        </Layout>
				
    </div>
</template>
<script>
		import vFooter from "../components/footer.vue"
		import vHeader from "../components/Header.vue"
    export default {
			name: "Index",
			data(){
				return {
					currTemplate: "CommonFooter",
					Home: '',
				}
			},
			components:{
				vFooter,
				vHeader,
			},
			// methods(){
			// 	GetHome(){}
			// },
    }
</script>
