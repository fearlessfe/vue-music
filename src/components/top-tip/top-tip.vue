<template>
  <div class="top-tip" v-if="showFlag" @click.stop="hide">
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    delay: {
      type: Number,
      default: 1000
    }
  },
  data () {
    return {
      showFlag: false
    }
  },
  mounted () {
    this.hide()
  },
  methods: {
    show () {
      this.showFlag = true
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.hide()
      }, this.delay)
    },
    hide () {
      this.showFlag = false
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"

.top-tip
  position fixed
  top 0
  width 100%
  z-index 500
  background $color-dialog-background
  &.drop-enter-active, &.drop-leave-active
    transition: all 0.3s
  &.drop-enter, &drop-leave-to
    transform translate3d(0, -100%, 0)
</style>
