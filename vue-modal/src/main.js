import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// pages
import vueModal from './vue-modal.vue'

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/vue-modal',
      name: 'vue-modal',
      component: vueModal
    }
  ]
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
