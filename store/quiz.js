/**
 * Handle quiz related data
 */

// Use static json file as an example
import quizData from '~/static/quiz.json'

export const state = () => ({
  questions: []
})


export const getters = {
  questions: state => state.questions
}


export const mutations = {
  SET_QUESTIONS (state, questions) {
    state.questions = questions
  }
}


export const actions = {
  GET_QUESTIONS ({ commit }) {
    commit('SET_QUESTIONS', quizData)
  }
}
