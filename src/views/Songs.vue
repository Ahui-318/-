<template>
  <div class="songs-container">
    <div class="tab-bar">
      <span class="item">全部</span>
      <span class="item">华语</span>
      <span class="item">欧美</span>
      <span class="item">日本</span>
      <span class="item">韩国</span>
    </div>
    <!-- 底部的table -->
    <table class="el-table playlit-table">
      <thead>
        <th></th>
        <th></th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </thead>
      <tbody>
        <tr class="el-table__row" v-for="(item, index) in songs" :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <div class="img-wrap" @click="playMusic(item.id)">
              <img :src="item.album.picUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap">
                <span>{{ item.name }}</span>
                <span class="iconfont icon-mv"></span>
              </div>
            </div>
          </td>
          <td>{{ item.album.artists[0].name }}</td>
          <td>{{ item.album.name }}</td>
          <td>{{ item.duration | songTime }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getSongs } from "@/network/songs.js";
import { getMusic } from "@/network/newmusic.js";
import { throttle } from "@/utils/throttle.js";
export default {
  name: "Songs",
  data() {
    return {
      songs: [],
      config: {
        type: 0,
      },
    };
  },
  mounted() {
    // console.log(getSongs());
    this.songsHandle();
    // throttle(this.songsHandle,1000)
  },
  methods: {
    // 保存最新歌曲数据
    songsHandle() {
      getSongs(this.config)
        .then((value) => {
          this.songs = value.data.data.slice(0, 30);
          // console.log(this.songs);
        })
        .catch((err) => {});
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
  },
  filters: {
    songTime: function (value) {
      let seconds = parseInt(value / 60000);
      let mins = parseInt((value / 1000) % 60);
      seconds = seconds > 10 ? seconds : "0" + seconds;
      mins = mins > 10 ? mins : mins + "0";
      return `${seconds}:${mins}`;
    },
  },
};
</script>

<style>
.songs-container .tab-bar {
  display: flex;
  justify-content: flex-end;
}

.songs-container .tab-bar .item {
  font-size: 15px;
  color: gray;
  margin-right: 20px;
  cursor: pointer;
}

.songs-container .tab-bar .item.active {
  color: #dd6d60;
}

.songs-container .song-wrap > span {
  margin-top: 20px;
  display: inline-block;
  color: #bebebe;
}

.songs-container .song-wrap .icon-mv {
  padding-left: 5px;
  color: #dd6d60;
}

.songs-container .img-wrap {
  position: relative;
  width: 70px;
  height: 70px;
}

.songs-container .img-wrap img {
  width: 70px;
  height: 70px;
  border-radius: 5px;
}

.songs-container .img-wrap .icon-play {
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

.songs-container .img-wrap .icon-play::before {
  transform: translateX(1px);
}
</style>