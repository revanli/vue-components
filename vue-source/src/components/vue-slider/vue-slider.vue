<template>
  <div class="switch-img-box" id="slide-box">
    <div class="switch-img-type switch-img-left">
      <ul :style="{'width': ulWidth, 'transition-timing-function': slideChange}">
        <li v-for="(li, index) in list" :style="{'width': listWidth + '%'}">
          <a :href="li.href ? li.href : 'javascript:;'">
            <img :src="li.src" class="slider-img" />
          </a>
        </li>
      </ul>
    </div>
    <!-- 分页器 -->
    <div class="switch-option" v-if="option">
      <div>
        <span v-for="(li, index) in list"></span>
      </div>
    </div>
    <!-- 箭头 -->
    <div class="switch-arrow" v-if="arrowurl && arrowsize">
      <div :class="{'arrow-left': direction == 'left', 'arrow-top': direction == 'top'}"
           :style="{'width': arrowWidth + 'px', 'height': arrowHeight + 'px',
            'background': 'url(' + arrowurl + ') no-repeat', 'background-size': '100%'}">
      </div>
      <div :class="{'arrow-right': direction == 'left', 'arrow-bottom': direction == 'top'}"
           :style="{'width': arrowWidth + 'px', 'height': arrowHeight + 'px', 'background': 'url(' + arrowurl + ') no-repeat', 'background-size': '100%'}">
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
/**
 * @params [Array] list [{src: imgSrc, href: imgHref}]
 * @params [Boolean] autoplay default: false
 * @params [String] type 'transparent'（透明度切换）, 'slide'(滑动切换, 默认) 轮播方式
 * @params [Boolean] option default: false
 * @params [Number] time 轮播间隔时间，毫秒 （默认4000）
 * @params [String] slidetype 过渡效果 （默认'ease'慢速开始，然后变快，然后慢速结束的过渡效果,参考：transition-timing-function）
 * @params [String] arrowurl-箭头图片链接
 * @params [String] arrowsize 箭头尺寸‘width,height’
 * @params [String] direction-切换方向'left'（左右） 'top'（上下） （默认：左右）
 * 
 */
  export default {
    data () {
      return {
        slideChange: '',
        arrowWidth: '',
        arrowHeight: ''
      }
    },
    computed: {
      // ul宽度
      ulWidth () {
        return (this.list.length) + '00%';
      },
      // li宽度
      listWidth () {
        return 100 / (this.list.length)
      }
    },
    mounted () {
      // 设置各个数据
      this.slideChange = this.lidetype || 'ease'
      if (this.arrowsize && this.arrowurl) {
      }
    },
    props: ['list', 'autoplay', 'type', 'time', 'slidetype', 'arrowurl', 'arrowsize', 'option', 'direction'],
    methods: {
      
    }
  }
</script>

<style>
  
</style>