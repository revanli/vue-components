import Vue from 'vue'
import App from './App.vue'
import clipper from './clipper.js'

Vue.use(clipper)

new Vue({
  el: '#app',
  render: h => h(App)
})
