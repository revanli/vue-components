<template>
  <div id="app">
    <div class="center">
      <div class="btn large primary" @click="openModal">Click Me</div>
      <vue-modal :isOpen="isOpen" @close-modal="closeModal">
        <div slot="header">header</div>
        <div slot="body">body</div>
        <!-- <div slot="footer">footer</div> -->
      </vue-modal>
    </div>
  </div>
</template>

<script>
import VueModal from './vue-modal.vue'
export default {
  name: 'app',
  components: {
    VueModal
  },
  data () {
    return {
      isOpen: false,
      modalStatus: {
        isShowModal: false,
        displayAttr: 'none'
      }
    }
  },
  methods: {
    openModal () {
      this.isOpen = !this.isOpen
    },
    closeModal (val) {
      this.isOpen = val
    }
  }
}
</script>

<style>
/*
 * reset.css
 * date: 2017-08-21;
 */
/* --- reset style --- */
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
  display: block;
}
html, body {
  line-height: 1;
  width: 100%;
  min-height: 100vh;
}
body, html {
  font-family:'Microsoft Yahei', 'Hiragino Sans GB', 'Helvetica Neue', 'Luxi Sans', 'DejaVu Sans', Tahoma, STHeiti, Arial, Helvetica, sans-serif;
}
body {
  color: #fff;
  background-color: #ccc;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a {
  color: #FFFFFF;
  text-decoration: none;
}
*:focus {
  outline: none;
}
* {
  box-sizing: border-box;
}
* { -webkit-tap-highlight-color: rgba(0, 0, 0, 0); }

#app {
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
}

/* --- button --- */
.btn {
  position: relative;
  display: inline-block;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  contain: content;
  appearance: none;
  text-align: center;
  border: 0;
  line-height: 1;
  cursor: pointer;
  text-decoration: none;
  font-weight: 500; 
  -webkit-transition: box-shadow 0.2s ease-in-out;
     -moz-transition: box-shadow 0.2s ease-in-out;
       -o-transition: box-shadow 0.2s ease-in-out;
          transition: box-shadow 0.2s ease-in-out;
}
.btn:active {
  position: relative;
  top: 1px;
  -webkit-box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8) inset;
     -moz-box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8) inset;
          box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8) inset;
}
/* size */
.btn.small {
  width: 1.94rem;
  height: .42rem;
  line-height: .42rem;
  font-size: 12px;
}
.btn.mini {
  width: 1.26rem;
  height: .55rem;
  line-height: .55rem;
  font-size: 14px;
}
.btn.middle {
  width: 4.45rem;
  height: .96rem;
  line-height: .96rem;
  font-size: 18px;
}
.btn.large {
  width: 5.22rem;
  height: .96rem;
  line-height: .96rem;
  font-size: 18px;
  letter-spacing: 2px;
}
.btn.full {
  width: 100%;
  height: .96rem;
  line-height: .96rem;
  font-size: 18px;
  letter-spacing: 2px;
}
/* color */
/* type */
.btn.plain {
  color: #FFFFFF;
  background: #FF5C5C;
  border-radius: 1rem;
}
.btn.primary {
  color: #FFFFFF;
  background: #FF5C5C;
  border-radius: 1rem;
}
.btn.secondary {
  background-image: linear-gradient(-16deg, #8181EA 0%, #8E81E3 100%);
  border-radius: 1rem;
}
.btn.warn {

}
.btn.disabled {
  opacity: .7;
  background: #e6e6e6;
  color: #333;
  cursor: not-allowed;
}
.btn.expired {
  opacity: .7;
  cursor: not-allowed;
}
.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.center {
  text-align: center;
  padding-top: 5rem;
}
</style>
