import { Commit } from 'vuex'

export default {
  setHeader: ({ commit }, { visible, title, buttons, useBackButton, more }) => commit('setHeader', { visible, title, buttons, useBackButton, more }),

  setFooter: ({ commit }, { visible, buttons }) => commit('setFooter', { visible, buttons }),

  setUser: ({ commit }, user) => commit('setUser', user),

  pushHistory: ({ commit }, { route, component }) => commit('pushHistory', { route, component }),

  popHistory: ({ commit }) => commit('popHistory'),

  clearHistory: ({ commit }) => commit('clearHistory'),

  overwriteHistoryData: ({ commit }, component) => commit('overwriteHistoryData', component),

  setBackButtonHandler: ({ commit }, handler) => commit('setBackButtonHandler', handler),

  setBackgroundProcessor: ({ commit }, settedProcessor) => commit('setBackgroundProcessor', settedProcessor),

  removeBackgroundProcessor: ({ commit }, processorName) => commit('removeBackgroundProcessor', processorName),
}
