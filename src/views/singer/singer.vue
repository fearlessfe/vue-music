<template>
  <div class="singer">
    <list-view :data="singerList"></list-view>
  </div>
</template>

<script>
import ListView from 'components/listView/listView'
import { getSinger } from 'api/singer'
import { ERR_OK } from 'api/config'
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
            pic: item.singer_pic
          })
        } else {
          map[item.country] = []
          map[item.country].push({
            id: item.singer_id,
            name: item.singer_name,
            pic: item.singer_pic
          })
        }
      })
      return map
    }
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
