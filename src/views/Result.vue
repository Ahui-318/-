// 搜索结果页
<template>
  <div class="result-container">
    <div class="title-wrap">
      <h2 class="title">{{ $route.query.q }}</h2>
      <!-- <h2 class="title">{{ keywords }}</h2> -->
      <span class="sub-title">找到{{ count }}个结果</span>
    </div>

    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲" name="songs">
        <table class="el-table">
          <thead>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr
              class="el-table__row"
              v-for="(item, index) in songs"
              :key="index"
              @click="playMusic(item.id)"
            >
              <td>{{ index + 1 }}</td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <!-- 名称 -->
                    <span>{{ item.name }}</span>
                    <!-- mv图标 -->
                    <span class="iconfont icon-mv"></span>
                  </div>
                  <!-- 二级标题 -->
                  <span v-if="item.alias.length !== 0">{{
                    item.alias[0]
                  }}</span>
                </div>
              </td>
              <td>{{ item.artists[0].name }}</td>
              <td>{{ item.album.name }}</td>
              <td>{{ item.duration | TimeFormat }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
<!-- 歌单 -->
      <el-tab-pane label="歌单" name="lists">
        <div class="items">
          <div class="item" v-for="(item, index) in playlists" :key="index" @click="toDetails(item.id)">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{ item.playCount | playCounts }}</span>
              </div>
              <img :src="item.coverImgUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </el-tab-pane>
<!-- mv -->
      <el-tab-pane label="MV" name="mv">
        <div class="items mv">
          <div class="item" v-for="(item, index) in mvs" :key="index" @click="toMvDetail(item.id)">
            <div class="img-wrap">
              <img :src="item.cover" alt="" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{ item.playCount | playCounts }}</div>
              </div>
              <span class="time">{{ item.duration | TimeFormat }}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 分页器 -->
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="pageNum"
      :page-size="pageSize"
    >
    </el-pagination>
  </div>
</template>

<script>
// import { getMusicUrl, search } from 'network/request'
import { getSearch } from "@/network/search.js";
// 播放音乐接口
import { getMusic } from "@/network/newmusic.js";
import { TimeForm } from "@/utils/TimeForm.js";
// import { config } from 'vue/types/umd';

export default {
  name: "result",
  data() {
    return {
      config: {
        keywords: this.$route.query.q,
        limit: 10,
        type: 1,
        offset:0,
      },
      // 总条数
      total: 0,
      // 页码
      pageNum: 1,
      pageSize: 10,
      keywords: "",
      // tab切换时改变的数据
      activeIndex: "songs",
      songs: [],
      count: 0,
      playlists: [],
      mvs: [],
      songId: 0,
      type: 1,
    };
  },
  watch: {
    activeIndex() {
      // let type = 1
      switch (this.activeIndex) {
        case "songs":
          this.config.type = 1;
          break;
        case "lists":
          this.config.type = 1000;
          break;
        case "mv":
          this.config.type = 1004;
          this.config.limit = 8;
          break;
        default:
          break;
      }
      this._getSearch(this.config);
    },
  },
  methods: {
    // 去MV的详情页
    toMvDetail(id){
      console.log(id);
      this.$router.push(`/playMvDetail?q=${id}`)
    },
    // 带点击去详情页
    toDetails(id){
      console.log(id);
      this.$router.push(`/playListDetail?q=${id}`)
    },
    // 点击播放音乐
    playMusic(id) {
      // console.log(id);
      getMusic(id)
        .then((value) => {
          console.log(value);
          this.$parent.musicUrl = value.data.data[0].url;
        })
        .catch((err) => {});
    },
    // 页码改变事件
    handleCurrentChange(val) {
      // 保存页码
      this.pageNum = val;
      this.config.offset = (this.pageNum - 1) * this.config.limit
      // 重新获取数据
      this._getSearch()
      // this.config值没有改变
      // console.log(this.config);
    },
    // 保存 搜索结果
    _getSearch() {
      getSearch(this.config)
        .then((result) => {
          // console.log(result.data);
          // 对三种type分别做判断
          if (this.config.type === 1) {
            this.count = result.data.result.songCount;
            this.songs = result.data.result.songs;
          } else if (this.config.type === 1000) {
            this.count = result.data.result.playlistCount;
            this.playlists = result.data.result.playlists;
            //  console.log(this.playlists);
          } else if (this.config.type === 1004) {
            this.mvs = result.data.result.mvs;
            this.count = result.data.result.mvCount;
            // console.log(this.mvs);
          }
          this.total = this.count;
          // console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this._getSearch();
  },
  // filters: {
  //   // 时间格式过滤
  //   TimeFormat: function (value) {
  //     //  this.songs.forEach((item) => {
  //     //    let mins = parseInt(item.duration / 1000 /60)
  //     //    let sections = parseInt( item.duration / 1000 %60)
  //     //    return value = mins+sections
  //     //  })
  //     let mins = parseInt(value / 1000 / 60);
  //     let seconds = parseInt((value / 1000) % 60);
  //     seconds = seconds > 10 ? seconds : "0" + seconds;
  //     mins = mins > 10 ? mins : "0" + mins;
  //     return `${mins}:${seconds}`;
  //   },
  //   // 播放量过滤
  //   playCounts: function (value) {
  //     return (value =
  //       parseInt(value / 10000) > 0 ? parseInt(value / 10000) + "万" : value);
  //   },
  // },
};
</script>

<style >
.el-pagination {
  white-space: nowrap;
  padding: 2px 5px;
  color: #303133;
  font-weight: 700;
  /* margin: 0 auto; */
  text-align: center;
}
.el-tabs__active-bar {
  background-color: #c3473a;
}

.el-tabs__item:hover,
.el-tabs__item.is-active {
  color: #c3473a;
}

.el-table th > .cell {
  font-weight: normal;
  color: black;
}

.el-pagination {
  margin-top: 50px;
  text-align: center;
}

.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #dd6d60;
}

.el-table {
  border-bottom: none;
  border-collapse: collapse;
}

.el-table.playlit-table th:nth-child(2) {
  width: 130px;
}

.el-table.playlit-table th:nth-child(3) {
  width: 300px;
}

.el-table.playlit-table th:nth-child(4) {
  width: 200px;
}

.el-table tbody {
  border-bottom: none;
}

.el-table td {
  border-bottom: none;
}

.el-table td:first-child {
  padding-left: 10px;
}

.el-table th {
  font-weight: normal;
}

.el-table th:first-child {
  width: 50px;
}

.el-table th:nth-child(2) {
  width: 300px;
}

.el-table th:nth-child(3) {
  width: 200px;
}

.el-table .song-wrap > span {
  margin-top: 20px;
  display: inline-block;
  color: #bebebe;
}

.el-table .song-wrap .icon-mv {
  padding-left: 5px;
  color: #dd6d60;
}

.el-table .img-wrap {
  position: relative;
  width: 70px;
  height: 70px;
}

.el-table .img-wrap img {
  width: 70px;
  height: 70px;
  border-radius: 5px;
}

.el-table .img-wrap .icon-play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 25px;
  height: 25px;
  color: #dd6d60;
  font-size: 12px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
}

.el-table .img-wrap .icon-play::before {
  transform: translateX(1px);
}

.el-table tr:nth-child(2n) {
  background-color: #fafafa;
}

.el-table tr:hover {
  background-color: #f5f7fa;
}
.result-container .title-wrap {
  display: flex;
  align-items: flex-end;
  margin-bottom: 30px;
}

.result-container .title-wrap .title {
  margin-right: 10px;
}

.result-container .title-wrap .sub-title {
  font-size: 15px;
  color: #bebebe;
}

.result-container .el-tabs__item {
  font-size: 18px;
}

.result-container .el-table td,
.result-container .el-table th.is-leaf {
  border-bottom: none;
}

.result-container .items {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.result-container .items .item {
  width: 200px;
  cursor: pointer;
  margin-right: 20px;
  margin-bottom: 20px;
}

.result-container .items .item .img-wrap {
  width: 100%;
  position: relative;
}

.result-container .items .item .img-wrap > .icon-play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  color: #dd6d60;
  font-size: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  opacity: 0;
}

.result-container .items .item .img-wrap > .icon-play::before {
  transform: translateX(3px);
}

.result-container .items .item .img-wrap:hover > .icon-play {
  opacity: 1;
}

.result-container .items .item .img-wrap img {
  width: 100%;
  border-radius: 5px;
}

.result-container .items .item .img-wrap .num-wrap {
  position: absolute;
  color: white;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  font-size: 15px;
  padding-right: 5px;
  padding-top: 2px;
}

.result-container .items .item .img-wrap .num-wrap .icon-play {
  font-size: 12px;
  display: flex;
  align-items: center;
  margin-right: 5px;
}

.result-container .items .item .img-wrap .time {
  position: absolute;
  bottom: 5px;
  right: 5px;
  color: white;
  font-size: 15px;
}

.result-container .items .item .name {
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.result-container .items .item .singer {
  font-size: 14px;
  color: #c5c5c5;
}

.result-container .items.mv .item {
  width: 250px;
}
</style>
