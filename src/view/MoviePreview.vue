<template>
  <div id="MoviePreview">
    <el-container>
      <el-main>
        <el-row :gutter="20">
          <h1 class="movieScreenTitileNow">热映</h1>
          <el-col :span="6" v-for="(item,key) in this.nowMovieList.slice((this.currentPageNow-1)*this.pageSizeNow,Math.min(this.currentPageNow*this.pageSizeNow,this.nowMovieList.length))" :key="key">
            <div class="grid-content bg-purple">
              <el-image :src="item.picUrl" style="height: 375px; width:240px ">
                <div slot="error" class="image-slot">
                  <el-empty
                      image="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"></el-empty>
                </div>
              </el-image>
            </div>
            <div>
              <el-link style="text-align: center" @click="showMovieInfo(item.movieId)">{{ item.movieName }}
              </el-link>
              <div style="text-align: center"><span style="color: coral">上映时间:{{ item.movieLiveDate }}</span></div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <div class="block" style="text-align: center">
            <el-pagination
                background
                @size-change="handleSizeChangeNow"
                @current-change="handleCurrentChangeNow"
                :current-page="currentPageNow"
                :page-sizes="[8, 16, 32]"
                :page-size="8"
                layout="total, sizes, prev, pager, next, jumper"
                :total="this.nowMovieList.length">
            </el-pagination>
          </div>
        </el-row>
        <el-row :gutter="20">
          <h1 class="movieScreenTitileFuture">即将上映</h1>
          <el-col :span="6" v-for="(item,key) in this.futureMovieList.slice((this.currentPageFuture-1)*this.pageSizeFuture,this.currentPageFuture*this.pageSizeFuture)" :key="key">
            <div class="grid-content bg-purple">
              <el-image :src="item.picUrl" style="height: 375px; width:240px ">
                <div slot="error" class="image-slot">
                  <el-empty
                      image="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"></el-empty>
                </div>
              </el-image>
            </div>
            <div>
              <el-link style="text-align: center" @click="showMovieInfo(item.movieId)">{{ item.movieName }}
              </el-link>
              <div style="text-align: center"><span style="color: coral">上映时间:{{ item.movieLiveDate }}</span></div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <div class="block" style="text-align: center">
            <el-pagination
                background
                @size-change="handleSizeChangeFuture"
                @current-change="handleCurrentChangeFuture"
                :current-page="currentPageFuture"
                :page-sizes="[8, 16, 32]"
                :page-size="8"
                layout="total, sizes, prev, pager, next, jumper"
                :total="this.futureMovieList.length">
            </el-pagination>
          </div>
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
    <!--电影信息对话框-->
    <el-dialog
        :visible.sync="movieInfoDialog"
        width="50%"
        :before-close="handleClose">
      <div style="float: left;width: 40%">
        <el-image :src="this.movieInfoData.picUrl" class="dialogImg">
          <div slot="error" class="image-slot">
            <!--            <el-empty :image="imgUrl" image-size="50px"></el-empty>-->
            <img :src="imgUrl"/>
          </div>
        </el-image>
      </div>
      <div style="float: left; width: 60%">
        <div class="block">
          <span class="demonstration">评分:</span>
          <el-rate v-model="userMovieScore"
                   :max=10 show-score allow-half
                   :colors="['#99A9BF', '#dcb30e', '#e09109','#dc420e']"
                   @change="movieScoreChange">
          </el-rate>
          <div style="margin-top: 50px">
            <el-button type="primary" round v-show="showConcernButton" @click="changeConcern">关注</el-button>
            <el-button style="background-color: rgba(142,135,135,0.56)" round v-show="!showConcernButton"
                       @click="changeConcern">已关注
            </el-button>
          </div>
        </div>
      </div>
      <el-descriptions>
        <el-descriptions-item label="电影名">{{ movieInfoData.movieName }}</el-descriptions-item>
        <el-descriptions-item label="首映时间">{{ movieInfoData.movieLiveDate }}</el-descriptions-item>
        <el-descriptions-item label="历史评分">{{ movieInfoData.movieScore }}</el-descriptions-item>
        <el-descriptions-item label="语言">
          <el-tag size="small">{{ movieInfoData.movieLanguage }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="类型">{{ movieInfoData.movieType }}</el-descriptions-item>
        <el-descriptions-item label="票价">{{ movieInfoData.moviePrice }}元</el-descriptions-item>
        <el-descriptions-item label="演员列表">{{ movieInfoData.actorName }}</el-descriptions-item>
        <el-descriptions-item label="描述" small>{{ movieInfoData.movieDesc }}</el-descriptions-item>
      </el-descriptions>
      <!--      <el-button @click="movieInfoDialog=false">取 消</el-button>-->
    </el-dialog>

  </div>
</template>

<script>
import {
  getMovieInfoById, getScreenMovieBaseInfo,
  getUserMovieScore,
  queryConcernMovie,
  updateUserMovieConcern,
  userMovieScore
} from "@/utils/api";

export default {
  name: "MoviePreview",
  created() {
    //获取电影基本信息
    getScreenMovieBaseInfo().then((res) => {
      console.log(res.data);
      if (res.data.futureMovieList.length === 0 && res.data.nowMovieList.length === 0) {
        this.$message.warning("暂无数据");
      } else {
        // this.allMovieData = res.data;\
        this.futureMovieList = res.data.futureMovieList;
        this.nowMovieList = res.data.nowMovieList;
      }
    });
  },
  data() {
    return {
      imgUrl: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      // allMovieData: [],
      futureMovieList: [],
      nowMovieList: [],
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
      },],
      movieInfoDialog: false,
      movieInfoData: {},
      userMovieScore: 0,
      showConcernButton: false,
      currentPageNow: 1,
      pageSizeNow:8,
      currentPageFuture:1,
      pageSizeFuture:8,
    }
  },
  methods: {
    showMovieInfo(id) {
      this.movieInfoDialog = true;
      this.getMovieInfo(id);
      this.getUserMovieScore(id);
      this.queryConcernMovie(id);
    },
    //获取电影信息
    getMovieInfo(id) {
      getMovieInfoById(id).then((res) => {
        if (res.data) {
          this.movieInfoData = res.data;
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    handleClose() {
      this.movieInfoDialog = false
      this.userMovieScore = 0;
    },
    getUserMovieScore(movieId) {
      const data = {
        userId: Number(window.localStorage.getItem("userId")),
        movieId: movieId
      }
      getUserMovieScore(data).then((res) => {
        const code = res.code;
        if (code !== 1) this.userMovieScore = res.data;
        // else this.$message.error('获取用户评分失败!');
      });
    },
    //电影评分
    movieScoreChange() {
      const data = {
        userId: Number(window.localStorage.getItem("userId")),
        movieId: this.movieInfoData.movieId,
        movieScore: this.userMovieScore,
      }
      userMovieScore(data).then((res) => {
        const code = res.code;
        if (code === 0) {
          this.getMovieInfo(this.movieInfoData.movieId);
          this.$message.success('评分成功!');
        } else {
          this.$message.error('评分失败!');
        }
      });
    },
    //电影关注
    queryConcernMovie(movieId) {
      const data = {
        userId: Number(window.localStorage.getItem("userId")),
        movieId: movieId,
      }
      queryConcernMovie(data).then((res) => {
        const code = res.code;
        if (code !== 1) {
          this.showConcernButton = false;
        } else {
          this.showConcernButton = true;
        }
      });
    },
    //关注按钮
    changeConcern() {
      updateUserMovieConcern({
        movieId: this.movieInfoData.movieId,
        userId: Number(window.localStorage.getItem("userId")),
        isConcern: !this.showConcernButton
      }).then((res) => {
        console.log(res);
        const code = res.code;
        if (code != 1) {
          this.showConcernButton = !this.showConcernButton;
        } else {
          this.$message.error("操作失败!");
        }
      });
    },
    //样式
    columnStyle(tableItem) {
      if (tableItem.rowIndex == 0 && tableItem.columnIndex == 0) return "font-family:Copperplate,fantasy;color:#f00707";
      if (tableItem.rowIndex == 1 && tableItem.columnIndex == 0) return "font-family:Copperplate,fantasy;color:#ED4C09FF";
      if (tableItem.rowIndex == 2 && tableItem.columnIndex == 0) return "font-family:Copperplate,fantasy;color:#F2A20AFF";
      if (tableItem.columnIndex === 2) return "font-family:Brush Script MT,cursive;text-align:right;color:#c60606";
    },
    //分页
    handleSizeChangeNow(val) {
      this.pageSizeNow=val;
    },
    handleCurrentChangeNow(val) {
      this.currentPageNow=val;
    },
    handleSizeChangeFuture(val) {
      this.pageSizeFuture=val;
    },
    handleCurrentChangeFuture(val) {
      this.currentPageFuture=val;
    }
  }
}
</script>

<style scoped>
.el-aside {
  width: 10%;
  margin-right: 50px;
}

.el-row {
  margin-bottom: 20px;

&
:last-child {
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
  background: #ffffff;
}

.bg-purple-light {
  background: #F9FAFCFF;
}

.grid-content {
  border-radius: 4px;
  height: 375px;
  /*max-height: 375px;*/
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.el-link {
  margin-left: 85px;
  /*margin-bottom: -20px;*/
}

.dialogImg {
  height: 200px;
}

.el-dialog__header {
  margin-top: -20px;
}

/*.el-dialog__body{*/
/*  height: 78vh;*/
/*  overflow: auto;*/
/*}*/


/deep/ .el-rate__icon {
  font-size: 30px;
}

.movieScreenTitileNow {
  color: #d5061e;
  font-family: 'Copperplate', fantasy;
  font-size: 40px;
  padding: 0px;
  margin: 10px;
  margin-left: 40px;
}

.movieScreenTitileFuture {
  color: rgba(22, 142, 231, 0.95);
  font-family: 'Copperplate', fantasy;
  font-size: 40px;
  padding: 0px;
  margin: 10px;
  margin-left: 40px;
}

.el-card__body, .el-main {
  padding: 0px;
}

.el-main {
  width: 80%;
  margin: 0px;
  padding: 10px;
}

</style>