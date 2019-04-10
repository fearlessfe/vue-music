<template>
  <div class="singer">
    <list-view :data="singerList" @select="selectSinger"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
import ListView from 'components/listView/listView'
import { getSinger } from 'api/singer'
import { ERR_OK } from 'api/config'
import { mapMutations } from 'vuex'
export default {
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
          map[item.country].push({
            id: item.singer_id,
            name: item.singer_name,
            pic: item.singer_pic,
            mid: item.singer_mid
          })
        } else {
          map[item.country] = []
          map[item.country].push({
            id: item.singer_id,
            name: item.singer_name,
            pic: item.singer_pic,
            mid: item.singer_mid
          })
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
