<template>
  <div>
    歌手
  </div>
</template>

<script>
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
        }
      })
    },
    _normalizeSinger (list) {
      const map = new Map()
      list.map(item => {
        if (map.has(list.country)) {
          map.get(list.country).push({
            id: list.singer_id,
            name: list.singer_name,
            pic: list.singer_pic
          })
        } else {
          map.set(list.country, [])
        }
      })
    }
  }
}
</script>
