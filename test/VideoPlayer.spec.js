import { mount } from '@vue/test-utils'
import VideoPlayer from "~/components/VideoPlayer.vue";

describe('VideoPlayer', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(VideoPlayer)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})
