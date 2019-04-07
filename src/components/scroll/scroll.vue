<template>
  <div ref="wrapper" class="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: [Object, Array],
      default: null
    }
  },
  watch: {
    data () {
      this.$nextTick().then(() => {
        this._initScroll()
      })
    }
  },
  mounted () {
    this.$nextTick().then(() => {
      this._initScroll()
    })
  },
  methods: {
    _initScroll () {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      })
    }
  },
  enable () {
    this.scroll && this.scroll.enable()
  },
  disable () {
    this.scroll && this.scroll.disable()
  },
  refresh () {
    this.scroll && this.scroll.refresh()
  },
  scrollTo () {
    this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
  },
  scrollToElement () {
    this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
  }
}
</script>

<style lang="stylus" scoped>
.wrapper {
  width 100%
  height 100%
  overflow hidden
}
</style>
