import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGER] (state, payload) {
    state.singer = payload
  }
}

export default mutations
