// 最新mv
<template>
  <div class="mvs-container">
    <div class="filter-wrap">
      <div class="seciton-wrap">
        <span class="section-type">地区:</span>
        <ul class="tabs-wrap">
          <li
            class="tab"
            v-for="(item, index) in areas"
            :key="index"
            @click="itemClick(index, item)"
            :class="{ active: index === currentAreaIndex }"
          >
            <span class="title">{{ item }}</span>
          </li>
        </ul>
      </div>
      <div class="type-wrap">
        <span class="type-type">类型:</span>
        <ul class="tabs-wrap">
          <li
            class="tab"
            v-for="(item, index) in types"
            :key="index"
            @click="itemType(index, item)"
            :class="{ active: index === currentTypeIndex }"
          >
            <span class="title">{{ item }}</span>
          </li>
        </ul>
      </div>
      <div class="order-wrap">
        <span class="order-type">排序:</span>
        <ul class="tabs-wrap">
          <li
            class="tab"
            v-for="(item, index) in sorts"
            :key="index"
            @click="itemSort(index, item)"
            :class="{ active: index === currentSortIndex }"
          >
            <span class="title">{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- mv容器 -->
    <div class="mvs">
      <div class="items">
        <div class="item" v-for="(item, index) in mvs" :key="index">
          <div class="img-wrap">
            <img :src="item.cover" alt="图片" />
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">播放量：{{ item.playCount | playCount }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.artistName }}</div>
          </div>
        </div>
      </div>
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
  </div>
</template>

<script>
import { getNewMvs } from "@/network/newMvs.js";
// import { config } from "vue/types/umd";
export default {
  name: "NewMv",
  data() {
    return {
      areas: ["全部", "内地", "港台", "欧美", "日本", "韩国"],
      types: ["全部", "官方版", "原声", "现场版", "网易出品"],
      sorts: ["上升最快", "最热", "最新"],
      mvs: [],
      config: {
        limit: 8,
        area: "全部",
        type: "全部",
        order: "上升最快",
        offset:0
      },
      currentAreaIndex: 0,
      currentTypeIndex: 0,
      currentSortIndex: 0,
      // 总条数
      total: 20,
      // 页码
      pageNum: 1,
      pageSize: 8,
    };
  },
  methods: {
    // 页码改变事件
    handleCurrentChange(val) {
      // 保存页码
      this.pageNum = val;
      this.config.offset = (this.pageNum - 1) * this.config.limit
      this._getNewMvs();
    },
    // 保存 mv数据
    _getNewMvs() {
      getNewMvs(this.config)
        .then((result) => {
          this.mvs = result.data.data;
          // console.log(this.mvs);
        })
        .catch((err) => {});
    },
    // 点击高亮显示
    itemClick(index, item) {
      this.currentAreaIndex = index;
      this.config.area = item;
      // console.log(item);
      this._getNewMvs(this.config);
    },
    itemType(index, item) {
      this.currentTypeIndex = index;
      this.config.type = item;
      this._getNewMvs(this.config);
    },
    itemSort(index, item) {
      this.currentSortIndex = index;
      this.config.order = item;
      this._getNewMvs(this.config);
    },
  },
  mounted() {
    this._getNewMvs();
  },
  filters: {
    playCount(value) {
      // let count = parseInt(value / 10000);
      // if (count > 0) {
      //   return count + "万";
      // } else {
      //   return value;
      // }

      return (value =
        parseInt(value / 10000) > 0 ? parseInt(value / 10000) + "万" : value);
    },
  },
};
</script>

<style>
.mvs-container {
  padding-top: 20px;
}

.mvs-container .filter-wrap > div {
  margin-bottom: 30px;
  vertical-align: baseline;
  display: flex;
  align-items: center;
}

.mvs-container .filter-wrap > div span {
  font-size: 14px;
  height: 100%;
}

.mvs-container .filter-wrap > div span.title {
  margin: 20px;
  color: gray;
  cursor: pointer;
  padding: 5px 20px;
}

.mvs-container .filter-wrap .tabs-wrap .active {
  color: #f54a37;
  background-color: #3adae6;
  border-radius: 20px;
}

.mvs-container .filter-wrap > div span.title::before {
  content: "", pos;
}

.mvs-container .filter-wrap > div ul {
  display: flex;
}

.mvs-container .filter-wrap > div ul li:not(:last-child) {
  border-right: 1px solid #f2f2f1;
}

.mvs-container .mvs .items {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.mvs-container .mvs .items .item {
  width: 250px;
  cursor: pointer;
  margin-right: 25px;
  margin-bottom: 30px;
}

.mvs-container .mvs .items .item .img-wrap {
  width: 100%;
  position: relative;
}

.mvs-container .mvs .items .item .img-wrap img {
  width: 100%;
  border-radius: 5px;
}

.mvs-container .mvs .items .item .img-wrap .num-wrap {
  position: absolute;
  color: white;
  top: 0;
  right: 0;
  display: flex;
  align-content: center;
  font-size: 15px;
  padding-right: 5px;
  padding-top: 2px;
}

.mvs-container .mvs .items .item .img-wrap .num-wrap .icon-play {
  font-size: 12px;
  display: flex;
  align-items: center;
  margin-right: 5px;
}

.mvs-container .mvs .items .item .info-wrap .name {
  font-size: 15px;
}

.mvs-container .mvs .items .item .info-wrap .singer {
  font-size: 14px;
  color: #c5c5c5;
}
</style>