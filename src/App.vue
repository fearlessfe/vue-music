<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
import MHeader from './views/m-header/m-header'
import Tab from './views/tab/tab'
export default {
  components: {
    MHeader,
    Tab
  }
}
</script>
<style lang="stylus" scoped>
</style>
