import CountUp from './vue-count-up.vue';
// 导出模块
export default CountUp;

//global 情况下 自动安装
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('count-up', CountUp);
}