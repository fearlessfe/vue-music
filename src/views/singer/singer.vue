<template>
  <div class="singer" ref="singer">
    <list-view ref="list" :data="singerList" @select="selectSinger"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
import ListView from 'components/listView/listView'
import { getSinger } from 'api/singer'
import { ERR_OK } from 'api/config'
import { mapMutations } from 'vuex'
import { playListMixin } from 'common/js/mixin'
import Singer from 'common/js/singer'
export default {
  mixins: [playListMixin],
  data () {
    return {
      singerList: []
    }
  },
  created () {
    this._getSingerList()
  },
  methods: {
    selectSinger (singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    handlePlayList (playList) {
      const bottom = playList.length > 0 ? '60px' : ''
      this.$refs.singer.style.bottom = bottom
      this.$refs.list.refresh()
    },
    _getSingerList () {
      getSinger().then(res => {
        if (res.code === ERR_OK) {
          this.singerList = res?.singerList?.data?.singerlist
          this.singerList = this._normalizeSinger(this.singerList)
        }
      })
    },
    _normalizeSinger (list) {
      const map = {}
      list.map(item => {
        if (map[item.country]) {
          map[item.country].push(
            new Singer({
              id: item.singer_mid,
              name: item.singer_name
            })
          // {
          //   id: item.singer_id,
          //   name: item.singer_name,
          //   pic: item.singer_pic,
          //   mid: item.singer_mid
          // }
          )
        } else {
          map[item.country] = []
          map[item.country].push(
            new Singer({
              id: item.singer_mid,
              name: item.singer_name
            })
          //   {
          //   id: item.singer_id,
          //   name: item.singer_name,
          //   pic: item.singer_pic,
          //   mid: item.singer_mid
          // }
          )
        }
      })
      return map
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  components: {
    ListView
  }
}
</script>

<style lang="stylus" scoped>
.singer {
  position fixed
  width 100%
  top 88px
  bottom 0
}
</style>
