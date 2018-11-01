import Vue from 'vue'
import Vuex from 'vuex'

import state from './app/state'
import getters from './app/getters'
import mutations from './app/mutations'
import actions from './app/actions'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

/**
 * Vuex Hot Reload
 */
if(module.hot)  {
  module.hot.accept([ './app/getters', './app/mutations', './app/actions' ], () => {
    store.hotUpdate({
      getters: reqruie('./app/getters').default,
      mutations: reqruie('./app/mutations').default,
      actions: reqruie('./app/actions').default
    })
  })
}

export default store
