import { mount } from '@vue/test-utils'
import IndexPage from '@/pages/index.vue'

import {
  createLocalVue,
  shallowMount
} from '@vue/test-utils'

describe('Index Page', () => {

  const localVue = createLocalVue()

  const wrapper = shallowMount(IndexPage, {
    localVue
  })

  it('should be a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

})
