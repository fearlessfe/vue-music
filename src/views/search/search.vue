<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
      <scroll :refreshesDelay="refreshesDelay" class="shortcut" ref="shortCut" :data="shortCut">
        <div>
        <div class="hot-key">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li @click="addQuery(key.k)" class="item" v-for="key in hotKey" :key="key.k">
              <span>{{key.k}}</span>
            </li>
          </ul>
        </div>
        <div class="search-history" v-show="searchHistory.length">
          <h1 class="title">
            <span class="text">搜索历史</span>
            <span class="clear" @click="showConfirm">
              <i class="icon-clear"></i>
            </span>
          </h1>
          <search-list @select="addQuery" @delete="deleteSearchHistory" :searches="searchHistory"></search-list>
        </div>
        </div>
      </scroll>
    </div>
    <div ref="searchResult" class="search-result" v-show="query">
      <suggest ref="suggest" @select="saveSearch" @listScroll="blurInput" :query="query"></suggest>
    </div>
    <confirm ref="confirm" text="是否清空所有搜索历史"
      confirmBtnText="清空"
      @confirm="clearSearchHistory"
    ></confirm>
    <router-view></router-view>
  </div>
</template>
<script>
import SearchBox from 'components/search-box/search-box'
import Suggest from 'views/suggest/suggest'
import { getHotKey } from 'api/search'
import { ERR_OK } from 'api/config'
import { mapActions } from 'vuex'
import SearchList from 'components/search-list/search-list'
import Confirm from 'components/confirm/confirm'
import Scroll from 'components/scroll/scroll'
import { playListMixin, searchMixin } from 'common/js/mixin'

export default {
  mixins: [playListMixin, searchMixin],
  data () {
    return {
      hotKey: [],
      refreshesDelay: 120
    }
  },
  computed: {
    shortCut () {
      return this.hotKey.concat(this.searchHistory)
    }

  },
  watch: {
    query (newQuery) {
      if (!newQuery) {
        setTimeout(() => {
          this.$refs.shortCut.refresh()
        }, 20)
      }
    }
  },
  created () {
    this._getHotKey()
  },
  mounted () {
    this.$nextTick().then(() => {
      this.$refs.confirm.hide()
    })
  },
  methods: {
    handlePlayList (playList) {
      const bottom = playList.length > 0 ? '60px' : ''
      this.$refs.shortcutWrapper.style.bottom = bottom
      this.$refs.searchResult.style.bottom = bottom

      this.$refs.shortCut.refresh()
      this.$refs.suggest.refresh()
    },
    showConfirm () {
      this.$refs.confirm.show()
    },
    _getHotKey () {
      getHotKey().then(res => {
        if (res.code === ERR_OK) {
          this.hotKey = res.data.hotkey.slice(0, 10)
        }
      })
    },
    ...mapActions([
      'clearSearchHistory'
    ])
  },
  components: {
    SearchBox,
    Suggest,
    SearchList,
    Confirm,
    Scroll
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>
