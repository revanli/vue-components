<template>
  <span ref='countup'></span>
</template>

<script>
import CountUp from 'countup.js'
export default {
  name: 'countup-demo',
  data () {
    return {
      numAnim:null
    }
  },
  props: {
    start: {
      type: Number,
      default: 0
    },
    end: {
      type: Number,
      default: 2017
    },
    decimal: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 2.5
    },
    options: {
      type: Object
    }
  },
  mounted () {
    this.initCountUp()
  },
  methods: {
    initCountUp () {
      this.numAnim = new CountUp(this.$refs.countup, this.start, this.end, this.decimal, this.duration, this.options)
      this.numAnim.start()
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
