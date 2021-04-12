<template>
  <div class="top-bar">
    <div class="search">
      <div class="el-input el-input--small el-input--prefix">
        <input
          type="text"
          autocomplete="off"
          placeholder="搜索"
          class="el-input__inner"
          @keyup.enter ='toSearch' 
          v-model="inputVal"
        />
        <span class="el-input__prefix">
          <i class="el-input__icon el-icon-search"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Top",
  data() {
    return {
      inputVal : ''
    }
  },
  methods: {
    // enter 键
    toSearch() {
      if (this.inputVal == "") {
        // 提示用户
        this.$message.warning("请输入内容!");
      } else {
        // 携带数据去搜索页面
        this.$router.push(`/result?q=${this.inputVal}`);
      }
    },
  },
};
</script>

<style>
.top-bar {
  height: 60px;
  background-color: rgb(141, 137, 137);
  overflow: hidden;
}
.search {
  width: 300px;
  margin: 14px auto;
}
</style>