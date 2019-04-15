import { mapGetters } from 'vuex'
export const playListMixin = {
  computed: {
    ...mapGetters([
      'playList'
    ])
  },
  mounted () {
    this.handlePlayList(this.playList)
  },
  activated () {
    this.handlePlayList(this.playList)
  },
  watch: {
    playList (newList) {
      this.handlePlayList(newList)
    }
  },
  methods: {
    handlePlayList () {
      throw new Error('component must implement handlePlayList function')
    }
  }
}
