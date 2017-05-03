import CountTo from './vue-countTo.vue';
// 导出模块
export default CountTo;

//global 情况下 自动安装
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('count-to', CountTo);
}