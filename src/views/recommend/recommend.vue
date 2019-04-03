<template>
  <div class="recommend">
    <div v-if="banners.length" class="slider-wrapper">
      <slider>
        <div v-for="item in banners" :key="item.id">
          <a :href="item.linkUrl">
            <img :src="item.picUrl">
          </a>
        </div>
      </slider>
    </div>
    <div class="recommend-list">
      <h1 class="list-title">热门歌单推荐</h1>
      <ul>

      </ul>
    </div>
  </div>
</template>

<script>
import { getRecommend, getDiscList } from 'api/recommend'
import Slider from 'components/slider/slider'
import { ERR_OK } from 'api/config'

export default {
  data () {
    return {
      banners: []
    }
  },
  created () {
    this._getRecommend()
    getDiscList().then(res => {
      console.log(res.recomPlaylist)
    })
  },
  methods: {
    _getRecommend () {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          this.banners = res.data.slider
        }
      })
    }
  },
  components: {
    Slider
  }
}
</script>
