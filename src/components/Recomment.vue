// 公共组件 推荐歌单
<template>
     <div class="recommend">
      <h3 class="title">
        推荐歌单
      </h3>
      <div class="items" >
        <div class="item" v-for="(item, index) in recomment" :key="index">
          <div class="img-wrap">
            <div class="desc-wrap">
              <span class="desc">{{ item.copywriter || '播放量'+item.playCount }}</span>
            </div>
            <img :src="item.picUrl || item.coverImgUrl" alt="封面" />
            <span class="iconfont icon-play" ></span>
          </div>
          <p class="name">{{ item.name }}</p>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "DisRecom",
  props:{
    recomment:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods: {
    
  },
};
</script>

<style>
.recommend {
  margin-bottom: 40px;
}

.recommend .items {
  display: flex;
  flex-wrap: wrap;
}

.recommend .items .item {
  width: 200px;
  margin: 10px;
  position: relative;
  overflow: hidden;
}

.recommend .items .item img {
  /* width: 200px; */

  height: 200px;
  border-radius: 5px;
}
.recommend .items .item .desc-wrap {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  font-size: 16px;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  max-height: 50px;
  padding: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  top: -50px;
}

.recommend .items .item .desc-wrap span {
  font-size: 14px;
}

.recommend .items .item:hover .desc-wrap {
  top: 0;
}

.recommend .items .item .img-wrap {
  position: relative;
}

.recommend .items .item .img-wrap .icon-play {
  position: absolute;
  right: 10px;
  bottom: 13px;
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

.recommend .items .item .img-wrap .icon-play::before {
  transform: translateX(3px);
}

.recommend .items .item .img-wrap:hover .icon-play {
  opacity: 1;
}

.recommend .items .item .name {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  font-size: 14px;
}
</style>