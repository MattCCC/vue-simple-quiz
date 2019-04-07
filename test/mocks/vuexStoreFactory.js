
import {
  state,
  getters,
  mutations,
  actions
} from '~/store/quiz.js'

import {
  state as userState,
  getters as userGetters,
  mutations as userMutations,
  actions as userActions
} from '~/store/userQuiz.js'

export default {
  modules: {
    quiz: {
      namespaced: true,
      state,
      getters,
      mutations,
      actions
    },
    userQuiz: {
      namespaced: true,
      userState,
      userGetters,
      userMutations,
      userActions
    }
  }
}
