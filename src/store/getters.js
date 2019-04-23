export const singer = state => state.singer

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playList = state => state.playList

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const currentSong = (state) => {
  return state.playList[state.currentIndex] || {}
}

export const disc = state => state.disc

export const topList = stste => stste.topList

export const searchHistory = stste => stste.searchHistory

export const playHistory = stste => stste.playHistory
