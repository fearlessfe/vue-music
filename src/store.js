import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './store/actions'
import * as getters from './store/getters'
import mutations from './store/mutations'
import state from './store/state'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
