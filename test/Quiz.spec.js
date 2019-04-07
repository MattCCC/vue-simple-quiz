import Vue from 'vue'
import Vuex from 'vuex'
import Quiz from '~/components/Quiz.vue'
import CustomButton from '~/components/CustomButton'
import sinon from 'sinon'

import {
  createLocalVue,
  shallowMount
} from '@vue/test-utils'

Vue.use(Vuex)

import quickQuestionsMock from './mocks/quizData'

import quickStoreMock from './mocks/vuexStoreFactory'

describe('Quiz component', () => {
  quickStoreMock.modules.quiz.getters = {
    questions: () => quickQuestionsMock,
  }

  let store = new Vuex.Store(quickStoreMock)

  const localVue = createLocalVue()
  localVue.use(Vuex)

  const wrapper = shallowMount(Quiz, {
    store,
    localVue
  })

  const vm = wrapper.vm


  it('should be a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('should render quiz form tag', () => {
    expect(wrapper.contains('form')).toBe(true)
  })

  it('should contain any question', () => {
    expect(vm.questions.length > 0).toBe(true)
  })

  it('should have Next button', () => {
    expect(wrapper.find('.next').exists()).toBe(true)
  })

  it('should check for any marked answer on Next button click', () => {
    const isAnyAnswerCheckedStub = sinon.stub()
    wrapper.setMethods({ isAnyAnswerChecked: isAnyAnswerCheckedStub })

    vm.$toast = {error: () => false}

    vm.onClickNext()

    expect(vm.isAnyAnswerChecked.called).toBe(true)
  })

})
