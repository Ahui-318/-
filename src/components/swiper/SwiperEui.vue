<template>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="(item, index) in banner" :key="index">
      <!-- <h3 class="medium"> -->
        <img :src="item.imageUrl" alt="">
      <!-- </h3> -->
    </el-carousel-item>
  </el-carousel>
</template>
<script>
export default {
  name:'SwiperEui',
  props:{
    banner:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>
<style>
  .el-carousel__item img {
    width: 100%;
  }
  
  /* .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  } */
</style>