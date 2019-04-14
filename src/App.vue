<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>
<script>
import MHeader from './views/m-header/m-header'
import Tab from './views/tab/tab'
import Player from './views/player/player'
export default {

  components: {
    MHeader,
    Tab,
    Player
  }
}
</script>
<style lang="stylus" scoped>
#app
  height 100%
  width 100%
  overflow hidden
</style>
