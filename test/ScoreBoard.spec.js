import Vue from 'vue'
import Vuex from 'vuex'
import { mount } from '@vue/test-utils'
import ScoreBoard from '@/components/ScoreBoard.vue'

import {
  createLocalVue,
  shallowMount
} from '@vue/test-utils'

Vue.use(Vuex)

import quickQuestionsMock from './mocks/quizData'

import quickStoreMock from './mocks/vuexStoreFactory'

describe('ScoreBoard', () => {

  quickStoreMock.modules.quiz.getters = {
    questions: () => quickQuestionsMock,
  }
  quickStoreMock.modules.userQuiz.getters = {
    userResponses: () => [],
    betterThan: () => 65,
  }
  let store = new Vuex.Store(quickStoreMock)

  const localVue = createLocalVue()
  localVue.use(Vuex)

  const wrapper = shallowMount(ScoreBoard, {
    store,
    localVue
  })

  const vm = wrapper.vm


  it('should be a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

})
