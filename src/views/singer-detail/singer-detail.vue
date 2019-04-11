<template>
<transition name="slide">
  <div class="singer-detail">
    <audio src="http://dl.stream.qqmusic.qq.com/C400001Qu4I30eVFYb.m4a?guid=3319473582&vkey=66FA3AA72BF4253183D016D32F80F8E91D109367F460D423DB780B419DA31C68FEB733D3F9410FFF986D0EFE71EB6781BEF50F6468026532&uin=0&fromtag=66"></audio>
  </div>
</transition>

</template>
<script>
import { getSingerDetail } from 'api/singer'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      data: []
    }
  },
  computed: {
    ...mapGetters([
      'singer'
    ])
  },
  created () {
    this._getDetail()
  },
  methods: {
    _getDetail () {
      if (!this.singer.mid) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.mid).then(res => {
        if (res.code === ERR_OK) {
          this.data = this._normalizeSongs(res.data.list)
        }
      })
    },
    _normalizeSongs (list) {
      let ret = []
      list.map(item => {
        let { musicData } = item
        if (musicData.songmid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
.singer-detail
  position fixed
  z-index 100
  top 0
  left 0
  right 0
  bottom 0
  background $color-background

.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
</style>
