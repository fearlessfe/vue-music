import * as types from './mutation-types'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'
import { saveSearch, deleteSearch, clearSearch } from 'common/js/cache'

function findIndex (list, song) {
  return list.findIndex((item) => {
    return item.songid === song.songid
  })
}

export const selectPlay = function ({ commit, state }, { list, index }) {
  if (!state.sequenceList.length) {
    commit(types.SET_FULL_SCREEN, true)
  }
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    index = findIndex(randomList, list[index])
    commit(types.SET_CURRENT_INDEX, index)
    commit(types.SET_PLAYING_STATE, true)
  } else {
    commit(types.SET_PLAYLIST, list)
    commit(types.SET_CURRENT_INDEX, index)

    commit(types.SET_PLAYING_STATE, true)
  }
}

export const randomPlay = function ({ commit }, { list }) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomList = shuffle(list)
  commit(types.SET_PLAYLIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const insertSong = function ({ commit, state }, song) {
  let playlist = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  // 当前歌曲
  let currentSong = playlist[currentIndex]
  // 插入的歌曲是否在列表中，返回其index
  let findPlayIndex = findIndex(playlist, song)
  // 当前播放歌曲后插入新的歌曲
  currentIndex++
  playlist.splice(currentIndex, 0, song)

  if (findPlayIndex > -1) {
    if (currentIndex > findPlayIndex) {
      playlist.splice(findPlayIndex, 1)
      currentIndex--
    } else {
      playlist.splice(findPlayIndex + 1, 1)
    }
  }

  let currentSeqIndex = findIndex(sequenceList, currentSong) + 1
  let findSeqIndex = findIndex(sequenceList, song)

  sequenceList.splice(currentIndex, 0, song)

  if (findSeqIndex > -1) {
    if (currentSeqIndex > findSeqIndex) {
      sequenceList.splice(findSeqIndex, 1)
    } else {
      playlist.splice(findIndex + 1, 1)
    }
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const saveSearchHistory = function ({ commit }, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const deleteSearchHistory = function ({ commit }, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

export const clearSearchHistory = function ({ commit }) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}

export const deleteSong = function ({ commit, state }, song) {
  let playlist = state.playList.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  let pindex = findIndex(playlist, song)
  playlist.splice(pindex, 1)
  let sindex = findIndex(sequenceList, song)
  playlist.splice(sindex, 1)

  if (currentIndex > pindex || currentIndex === playlist.length) {
    currentIndex--
  }
  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)

  const playingState = playlist.length > 0
  commit(types.SET_PLAYING_STATE, playingState)
}

export const deleteSongList = function ({ commit, state }, song) {
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_CURRENT_INDEX, -1)
  commit(types.SET_PLAYING_STATE, false)
}
