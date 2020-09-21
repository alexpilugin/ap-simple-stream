import { mount } from '@vue/test-utils'
import Carousel from "~/components/Carousel.vue";

describe('Carousel', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(Carousel)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
