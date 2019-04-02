<template>
  <div id="app">
    <m-header></m-header>
  </div>
</template>
<script>
import MHeader from './views/m-header/m-header'
export default {
  components: {
    MHeader
  }
}
</script>
<style lang="stylus" scoped>
import "~common/stylus/variable"
#app
  color: $color-theme
</style>
