<template>
  <div class="m-header">
    <div class="icon"></div>
    <div class="text">QQ Music</div>
    <router-link to="/user" class="mine" tag="div">
      <i class="icon-mine"></i>
    </router-link>
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
  .mine
    position: absolute
    top: 0
    right: 0
    .icon-mine
      display: block
      padding: 12px
      font-size: 20px
      color: $color-theme
</style>
