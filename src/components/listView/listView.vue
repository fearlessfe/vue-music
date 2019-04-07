<template>
  <scroll class="listview" :data="data">
    <ul>
      <li v-for="(value, key) in data" :key="key" class="list-group">
        <h2 class="list-group-title">{{key}}</h2>
        <ul>
          <li class="list-group-item" v-for="item in value" :key="item.id">
            <img v-lazy="item.pic" class="avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchStart">
      <ul>
        <li v-for="(item, index) in shortcutList" :key="item" class="item" :data-index="index">{{item}}</li>
      </ul>
    </div>
  </scroll>
</template>
<script>
import Scroll from '../scroll/scroll'
import { getData } from 'common/js/dom'
export default {
  props: {
    data: {
      type: null,
      default: {}
    }
  },
  computed: {
    shortcutList () {
      return Object.keys(this.data).filter(item => !!item)
    }
  },
  methods: {
    onShortcutTouchStart (e) {
      let anchorIndex = getData(e.target, 'index')
      return anchorIndex
    }
  },
  components: {
    Scroll
  }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable"
.listview
  position relative
  background-color $color-background
  .list-group
    padding-bottom 30px
    .list-group-title
      height 30px
      line-height 30px
      padding-left 20px
      font-size $font-size-small
      color $color-text-l
      background $color-highlight-background
    .list-group-item
      display flex
      align-items center
      padding 20px 0 0 30px
      .avatar
        width 50px
        height 50px
        border-radius 50%
      .name
        margin-left 28px
        color $color-text-l
        font-size $font-size-medium
  .list-shortcut
    position absolute
    z-index 30
    right 0
    top 120px
    // transform translateY(-50%)
    width 80px
    padding 20px 0
    border-radius 10px
    text-align center
    background $color-background
    font-family Helvetica
    .item
      padding 10px
      line-height 1
      color $color-text-l
      font-size $font-size-small
      &.current
        color: $color-theme
</style>
