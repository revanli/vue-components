import SlideImg from './vue-slider.vue'

const vueSlider = {
  install: function (Vue) {
    Vue.component('v-slider', SlideImg)
  }
}

export default vueSlider