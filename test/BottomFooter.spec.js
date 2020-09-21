import { mount } from '@vue/test-utils'
import BottomFooter from "~/components/BottomFooter.vue";

describe('BottomFooter', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(BottomFooter)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
