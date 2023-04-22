<template>
  <div id="Home">
    <el-container>
      <el-header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
                 router active-text-color="rgb(110,0,0)">
          <el-menu-item v-for="(item,index) in this.$router.options.routes[1].children"
                        :key="index" v-if="!item.hidden" :index="item.path">{{ item.name }}
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-container>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      activeIndex: '1',
    };
  },
  methods: {}
}
</script>

<style scoped>
.el-menu-item {
  /*margin-left: 200px;*/
  color: black;
  /*color: rgb(237, 119, 9);*/
  width: 200px;
  margin: 0 auto;
  text-align: center;
  display: inline-block;

}
</style>