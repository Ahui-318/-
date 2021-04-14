<template>
  <div>
    <!-- 头部 -->
    <div class="top-card">
      <!-- 封面 -->
      <div class="icon-wrap">
        <img :src="topcard.coverImgUrl" alt="" />
      </div>
      <div class="content-wrap">
        <div class="tag">精品歌单</div>
        <!-- 标题 -->
        <div class="title">{{ topcard.name }}</div>
        <!-- 介绍 -->
        <div class="info">{{ topcard.description }}</div>
      </div>
      <!-- 背景 -->
      <img :src="topcard.coverImgUrl" alt="" class="bg" />
      <div class="bg-mask"></div>
    </div>
    <div class="tab-container">
      <!-- tab栏 顶部 -->
      <div class="tab-bar">
        <span
          class="item"
          v-for="(item, index) in tag"
          :key="index"
          @click="itemClick(index)"
          :class="{ active: index === currentIndex }"
          >{{ item }}
        </span>
      </div>
      <!-- tab内容 -->
      <recomment :recomment="lists"></recomment>
    </div>
    <!-- 分页器 -->
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="pageNum"
      :page-size="10"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getPlayLists, getTagLists } from "@/network/playlists.js";
import Recomment from "../components/Recomment.vue";
import { TimeForm } from "@/utils/TimeForm.js";

export default {
  components: { Recomment },
  name: "PlayLists",
  data() {
    return {
      optinos: {
        num: 10,
        set: 0,
        cat: "全部",
      },
      // 头部数据
      topcard: [],
      // tag
      tag: [
        "全部",
        "欧美",
        "华语",
        "流行",
        "说唱",
        "摇滚",
        "民谣",
        "电子",
        "轻音乐",
        "影视原声",
        "ACG",
        "怀旧",
        "治愈",
        "旅行",
      ],
      // 点击时当前的tab值
      currentIndex: 0,
      // 推荐歌单列表
      lists: [],

      // 分页器数据
      total: 10,
      pageNum: 1,
      // pageSize: 10
    };
  },
  methods: {
    // 页码改变事件
    handleCurrentChange(val) {
      this.pageNum = val;
      this.optinos.set = (this.pageNum - 1) * 10;
      this.GetTagLists();
    },

    playLists() {
      // 保存 顶部歌单数据
      getPlayLists()
        .then((result) => {
          // console.log(result);
          this.topcard = result.data.playlists[0];
          // console.log(this.topcard);
          // console.log(result);
          // console.log(result.data.playlists[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // tag切换
    itemClick(index) {
      // console.log(index);
      this.currentIndex = index;
      // console.log(this.currentIndex);
    },

    // 保存歌单列表
    GetTagLists() {
      getTagLists(this.optinos)
        .then((value) => {
          // console.log(value.data);
          this.lists = value.data.playlists;
          this.total = value.data.total;
          // console.log(this.lists);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.playLists();
    // console.log(getTagLists());
    this.GetTagLists();
  },
  // 切换tag
  watch: {
    currentIndex() {
      // console.log(this.currentIndex);
      this.optinos.cat = this.tag[this.currentIndex];
      this.GetTagLists();
      // 切换tag后把回到当前tag的第一页
      this.pageNum = 1
    },
  },
};
</script>

<style>
.top-card {
  padding: 20px;
  height: 200px;
  display: flex;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
}

.top-card .icon-wrap {
  margin-right: 20px;
  z-index: 1;
}

.top-card .icon-wrap img {
  width: 160px;
  height: 160px;
}

.top-card .content-wrap {
  z-index: 1;
}

.top-card .content-wrap .tag {
  color: #dfac67;
  border: 1px solid #dfac67;
  width: 100px;
  height: 30px;
  text-align: center;
  border-radius: 5px;
  font-size: 16px;
  line-height: 30px;
  cursor: pointer;
}

.top-card .content-wrap .title {
  color: white;
  padding-top: 10px;
}

.top-card .content-wrap .info {
  color: #bdbab9;
  font-size: 14px;
  padding-top: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
}

.top-card .bg {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  filter: blur(20px);
}

.top-card .bg-mask {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
.tab-container {
  padding-top: 30px;
}

.tab-container .tab-bar {
  display: flex;
  justify-content: flex-end;
}

.tab-container .tab-bar .item {
  font-size: 15px;
  color: gray;
  margin-right: 20px;
  cursor: pointer;
}

.tab-container .tab-bar .active {
  color: #dd6d60;
}
</style>