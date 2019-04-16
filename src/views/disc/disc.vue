<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSongList } from 'api/recommend'
import MusicList from '../music-list/music-list'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'
export default {
  data () {
    return {
      songs: []
    }
  },
  computed: {
    title () {
      return this.disc.title
    },
    bgImage () {
      return this.disc.cover_url_big
    },
    ...mapGetters([
      'disc'
    ])
  },
  created () {
    this._getSongList()
  },
  methods: {
    _getSongList () {
      if (!this.disc.tid) {
        this.$router.push({
          path: '/recommend'
        })
        return
      }
      getSongList(this.disc.tid).then(res => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeData(res.songlist)
        }
      })
    },
    _normalizeData (list) {
      let ret = []
      list.forEach(musicData => {
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>
