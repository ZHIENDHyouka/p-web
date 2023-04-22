<template>
  <div id="MoviePreview">
    <el-container>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-image :src="imgUrl"></el-image>
              <el-link>电影1</el-link>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-image :src="imgUrl"></el-image>
              <el-link>电影1</el-link>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-image :src="imgUrl"></el-image>
              <el-link>电影1</el-link>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-image :src="imgUrl"></el-image>
              <el-link>电影1</el-link>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-image :src="imgUrl"></el-image>
              <el-link>电影1</el-link>
            </div>
          </el-col>
        </el-row>
      </el-main>
      <!--信息栏-->
      <el-aside>
        <el-table
            :data="messageBarData"
            style="width: 100%"
            highlight-current-row
            :header-cell-style="{'text-align':'center','color':'#de1111','font-family': 'Lucida Handwriting,cursive'}"
            :cell-style="columnStyle">
          <el-table-column
              type="index"
              width="20">
          </el-table-column>
          <el-table-column
              prop="message"
              label="热门电影"
              width="100px"
          >
          </el-table-column>
          <el-table-column
              prop="flowHeat"
              label=""
          >
          </el-table-column>
        </el-table>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "MoviePreview",
  data() {
    return {
      imgUrl:'https://ts2.cn.mm.bing.net/th?id=OSK.eefc56e5881277260db678a5219ddc4a&w=180&h=270&c=4&rs=1&qlt=80&o=6&dpr=1.3&pid=SANGAM',
      messageBarData: [{
        message: '1',
        flowHeat: 10000,
      }, {
        message: '1',
        flowHeat: 10000,
      }, {
        message: '1',
        flowHeat: 10000,
      }, {
        message: '1',
        flowHeat: 10000,
      },]
    }
  },
  methods: {
    columnStyle(tableItem) {
      if (tableItem.rowIndex == 0 && tableItem.columnIndex == 0) return "font-family:Copperplate,fantasy;color:#f00707";
      if (tableItem.rowIndex == 1 && tableItem.columnIndex == 0) return "font-family:Copperplate,fantasy;color:#ED4C09FF";
      if (tableItem.rowIndex == 2 && tableItem.columnIndex == 0) return "font-family:Copperplate,fantasy;color:#F2A20AFF";
      if (tableItem.columnIndex === 2) return "font-family:Brush Script MT,cursive;text-align:right;color:#c60606";
    }
  }
}
</script>

<style scoped>
.el-aside {
  width: 200px;
  margin-right: 50px;
}

.el-row {
  margin-bottom: 20px;

&  :last-child {
  margin-bottom: 0;
}

}
.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #F9FAFCFF;
}

.bg-purple {
  background: #F9FAFCFF;
}

.bg-purple-light {
  background: #F9FAFCFF;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.el-link{
  margin-left: 50px;
  margin-bottom: 100px;
}
</style>