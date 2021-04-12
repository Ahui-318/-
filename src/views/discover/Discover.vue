<template>
  <div>
    <!-- 轮播图 -->
    <swiper-eui :banner="banner"></swiper-eui>
    <!-- 推荐歌单 -->
    <recomment :recomment="recommend"></recomment>
    <!-- 最新音乐 -->
    <dis-new :newmusic="newmusic" @getMusicId="musicId"></dis-new>
    <!-- 最新MV -->
    <dis-mv :mvs='mvs'></dis-mv>
  </div>
</template>

<script>
import swiperEui from "@/components/swiper/SwiperEui";
import { getSwiper } from "@/network/swiper.js";
import { getRecommend } from "@/network/recommend.js";
import { getNew, getMusic } from "@/network/newmusic.js";
import { getMvs } from "@/network/mv.js";
// import DisRecom from "./child/Recomment.vue";
import DisNew from "./child/DisNew.vue";
import DisMv from './child/DisMv.vue';
import Recomment from '../../components/Recomment.vue';

export default {
  data() {
    return {
      banner: [],
      recommend: [],
      newmusic: [],
      musicUrl:'',
      mvs:[],
    };
  },
  components: {
    swiperEui,
    DisNew,
    DisMv,
    Recomment,
  },
  mounted() {
    // this.banner= getSwiper()
    // console.log(this.banner);

    // 获取banner图片
    getSwiper()
      .then((value) => {
        this.banner = value.data.banners;
        // console.log(banner);
      })
      .catch((err) => {
        console.warn(err);
      });

    // 保存推荐歌单数据
    getRecommend()
      .then((value) => {
        // console.log(value);
        this.recommend = value.data.result;
        // console.log(this.recommend);
      })
      .catch((err) => {
        console.warn(err);
      });

    // 保存最新歌单数据
    getNew()
      .then((value) => {
        this.newmusic = value.data.result;
        // console.log(this.newmusic);
      })
      .catch((err) => {
        console.warn(err);
      });
    // 保存推荐MV
    getMvs()
    .then((value) => {
      // console.log(value);
      this.mvs = value.data.result;
      // console.log(this.mvs);
    }).catch((err) => {
      console.warn(err);
    });
  },
  methods: {
    musicId(id) {
      const musicId = id;
      console.log(musicId);
      getMusic(musicId)
        .then((value) => {
          // 将 音乐播放接口给父级组件
          this.$parent.musicUrl = value.data.data[0].url
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
</style>