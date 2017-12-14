import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import CountTo from '@/components/vue-count-to'
// import Slider from '@/components/vue-slider/vue-slider.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    }, {
      path: '/countTo',
      name: 'countTo',
      component: CountTo
    }
  ]
})
