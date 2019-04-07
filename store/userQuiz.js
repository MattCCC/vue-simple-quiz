/**
 * Handle user's related quiz data
 */

import axios from 'axios'
import appCfg from '~/app.config.js'

export const state = () => ({
  betterThan: 0,
  userResponses: [],
})

const initialState = state()

export const getters = {
  betterThan: state => state.betterThan,
  userResponses: state => state.userResponses,
}


export const mutations = {
  SET_BETTER_THAN (state, payload) {
    state.betterThan = payload
  },
  SET_RESPONSE (state, payload) {
    state.userResponses[ payload.questionIndex ] = payload.isCorrect
  },
  RESET_STATE (state) {
    Object.assign(state, initialState)
  },
}


export const actions = {
  async SEND_RESPONSES ({ commit }) {
    /**
    * Use external API as an example.. Please mind that it will return the same value from backend
    */
    const { data } = await axios.post(appCfg.apiUrl)
    commit('SET_BETTER_THAN', data.betterThan)
  }
}
