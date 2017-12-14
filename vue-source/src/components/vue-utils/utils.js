/**
 * @name  vue移动端工具函数
 * @author liyufan@thejoyrun.com
 * @deprecated  2017-12-08
 */

var utils = {};
var showToast = false, // 存储toast显示状态
    showIndicator = false, // 存储loading显示状态
    toastVM = null, // 存储toastvm
    indicatorVM = null; // 存储indicator节点元素

utils.install = function (Vue, options) {

  var opt = {
    defaultType: 'center',
    duration: '2500',
    wordWrap: false
  };

  for (var property in options) {
    opt[property] = options[property];
  }

  Vue.prototype.$toast = function (tips, type) {

    var curType = type ? type : opt.defaultType;
    var wordWrap = opt.wordWrap ? 'util-word-wrap' : '';
    var style = opt.width ? 'style="width: ' + opt.width + '"' : '';
    var tmp = '<div v-show="show" :class="type" class="util-toast ' + wordWrap + '" ' + style + '>{{tip}}</div>';

    if (showToast) {
      return;
    }
    if (!toastVM) {
      var toastTpl = Vue.extend({
        data: function () {
          return {
            show: showToast,
            tip: tips,
            type: 'util-toast-' + curType
          }
        },
        template: tmp
      });
      toastVM = new toastTpl()
      var tpl = toastVM.$mount().$el;
      document.body.appendChild(tpl);
    }
    toastVM.type = 'util-toast-' + curType;
    toastVM.tip = tips;
    toastVM.show = showToast = true;

    setTimeout(function () {
      toastVM.show = showToast = false;
    }, opt.duration)
  };
  ['bottom', 'center', 'top'].forEach(function (type) {
    Vue.prototype.$toast[type] = function (tips) {
      return Vue.prototype.$toast(tips, type)
    }
  });

  Vue.prototype.$indicator = function (tips, type) {
    if (type == 'close') {
      indicatorVM.show = showIndicator = false;
    } else {
      if (showIndicator) {
        // 如果indicator还在则不再执行
        return;
      }
      var tpl = ''
      var tipsTpl = !tips || tips == '' ? '' : '<div class="util-indicator-text">' + tips + '</div>'

      if (type == 'fade-circle') {
        tpl = '<div class="util-indicator-leaf">' + 
              '  <div class="loading-leaf loading-leaf-0"></div>' + 
              '  <div class="loading-leaf loading-leaf-1"></div>' + 
              '  <div class="loading-leaf loading-leaf-2"></div>' + 
              '  <div class="loading-leaf loading-leaf-3"></div>' +
              '  <div class="loading-leaf loading-leaf-4"></div>' +
              '  <div class="loading-leaf loading-leaf-5"></div>' + 
              '  <div class="loading-leaf loading-leaf-6"></div>' + 
              '  <div class="loading-leaf loading-leaf-7"></div>' + 
              '  <div class="loading-leaf loading-leaf-8"></div>' + 
              '  <div class="loading-leaf loading-leaf-9"></div>' + 
              '  <div class="loading-leaf loading-leaf-10"></div>' + 
              '  <div class="loading-leaf loading-leaf-11"></div>' +
              '</div>'
      } else {
        tpl = '<div class="util-indicator-spin"><div></div></div>' 
      }
      var loadTpl = Vue.extend({
        data: function () {
          return {
            show: showIndicator
          }
        },
        template: '<div v-show="show" class="util-indicator">' + 
                  '  <div class="util-indicator-wrapper">' + tpl + tipsTpl +
                  // '    <div class="util-indicator-text">' + tips + '</div>' +
                  '  </div>' +
                  '  <div class="util-indicator-mask" @touchmove.stop.prevent></div>' +
                  '</div>'
      });
      indicatorVM = new loadTpl();
      var tpl = indicatorVM.$mount().$el;

      document.body.appendChild(tpl);
      indicatorVM.show = showIndicator = true;
    }
  };

  ['open', 'close'].forEach(function (type) {
    Vue.prototype.$indicator[type] = function (tips) {
      return Vue.prototype.$indicator(tips, type)
    }
  });
}


module.exports = utils;



