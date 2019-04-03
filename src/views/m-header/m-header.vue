<template>
  <div class="m-header">
    <div class="icon"></div>
    <div class="text">QQ Music</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

.m-header
  position: relative
  height: 44px
  display: flex
  justify-content: center
  align-items: center
  color: $color-theme
  .icon
    width: 30px
    height: 32px
    margin-right: 9px
    bg-image('logo')
    background-size: 30px 32px
  .text
    font-size: $font-size-large
</style>
