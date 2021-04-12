<template>
  <div id="app">
    <top />
    <index />
  </div>
</template>

<script>
import Index from "./components/Index.vue";
import Top from "./components/Top.vue";
export default {
  name: "App",
  components: {
    Top,
    Index,
  },
};
</script>

<style>
@import './assets/css/base.css';
</style>
