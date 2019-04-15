<template>
  <div class="recommend" ref="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <div>
        <div v-if="banners.length" class="slider-wrapper">
          <slider>
            <div v-for="item in banners" :key="item.id">
              <a :href="item.linkUrl">
                <img @load="loadImage" :src="item.picUrl">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in discList" :key="item.access_num" class="item">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.cover_url_small">
              </div>
              <div class="text">
                <h2 class="name">{{item.creator_info.nick}}</h2>
                <p class="desc">{{item.title}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import { getRecommend, getDiscList } from 'api/recommend'
import Slider from 'components/slider/slider'
import Scroll from 'components/scroll/scroll'
import Loading from 'components/loading/loading'
import { ERR_OK } from 'api/config'
import { playListMixin } from 'common/js/mixin'

export default {
  mixins: [playListMixin],
  data () {
    return {
      banners: [],
      discList: []
    }
  },
  created () {
    this._getRecommend()
    getDiscList().then(res => {
      this.discList = res?.playlist?.data?.v_playlist  // eslint-disable-line
    })
  },
  methods: {
    handlePlayList (playList) {
      const bottom = playList.length > 0 ? '60px' : ''
      this.$refs.recommend.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    _getRecommend () {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          this.banners = res.data.slider
        }
      })
    },
    loadImage () {
      if (!this.checkLoaded) {
        this.checkloaded = true
        this.$refs.scroll.refresh()
      }
    }
  },
  components: {
    Slider,
    Scroll,
    Loading
  }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable"
.recommend
  position fixed
  width 100%
  top 88px
  bottom 0
  .recommend-content
    height: 100%
    overflow: hidden
    .recommend-list
      .list-title
        height 65px
        line-height 65px
        text-align center
        font-size $font-size-medium
        color $color-theme
      .item
        display flex
        box-sizing border-box
        align-items flex-start
        padding 0 20px 20px
        .icon
          flex 0 0 60px
          width 60px
          padding-right 20px
        .text
          display flex
          flex-direction column
          justify-content center
          flex 1
          line-height 20px
          overflow hidden
          font-size $font-size-medium
          .name
            margin-bottom 10px
            color $color-text
          .desc
            color: $color-text-d
    .loading-container
      position absolute
      width 100%
      top 50%
      transform translateY(-50%)
</style>
