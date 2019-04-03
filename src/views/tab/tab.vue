<template>
  <div class="tab">
    <router-link tag="div" v-for="tab in tabs" :key="tab.to" class="tab-item" :to="tab.to" >
      <span class="tab-link">{{tab.name}}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Tab',
  data () {
    return {
      tabs: [
        {
          name: '推荐',
          to: '/recommend'
        },
        {
          name: '歌手',
          to: '/singer'
        },
        {
          name: '排行',
          to: '/rank'
        },
        {
          name: '搜索',
          to: '/search'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
.tab
  display flex
  align-items center
  height 44px
  font-size $font-size-medium
  .tab-item
    flex 1
    text-align center
    .tab-link
      padding-bottom 5px
      color $color-text-l
    &.router-link-active
      .tab-link
        color $color-theme
        border-bottom 2px solid $color-theme
</style>
