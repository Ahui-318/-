<template>
  <div class="news">
    <h3 class="title">最新音乐</h3>
    <div class="items">
      <div
        class="item"
        v-for="(item, index) in newmusic"
        :key="index"
        @click="player(item.id)"
      >
        <div class="img-wrap">
          <img :src="item.picUrl" alt="" />
          <span class="iconfont icon-play"></span>
        </div>
        <div class="song-wrap">
          <div class="song-name">{{ item.name }}</div>
          <div class="singer">{{ item.song.artists[0].name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMusic } from "@/network/newmusic.js";

export default {
  name: "DisNew",
  data() {
    return {
      id: 0,
    };
  },
  props: {
    newmusic: {
      type: Array,
      default() {
        return [];
      },
    },
    // musicId: {
    //   type: Number,
    //   default() {
    //     return 0;
    //   },
    // },
  },
  methods: {
    player(id) {
      // this.id = id;
      // console.log(this.id);
      this.$emit('getMusicId',id)
      // console.log(id);
    },
  },
  mounted() {},
};
</script>

<style>
.discov.news {
  margin-bottom: 40px;
}

.news .items {
  height: 500px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding-left: 15px;
}

.news .items .item {
  height: 100px;
  width: 50%;
  display: flex;
  align-items: center;
}

.news .items .item:hover {
  background-color: #f5f5f5;
}

.news .items .item .index {
  margin-right: 15px;
  font-size: 15px;
}

.news .items .item .img-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.news .items .item .img-wrap img {
  width: 80px;
  height: 80px;
}

.news .items .item .img-wrap .iconfont {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  color: #dd6d60;
  text-align: center;
  line-height: 30px;
  border-radius: 50%;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.8);
  opacity: 0;
}

.news .items .item .img-wrap .iconfont::before {
  transform: translateX(3px);
}

.news .items .item .img-wrap:hover .iconfont {
  opacity: 1;
}

.news .items .item .song-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  padding: 10px;
  font-size: 16px;
}

.news .items .item .song-wrap .singer {
  font-size: 14px;
  color: gray;
}
</style>