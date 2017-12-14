<template>
  <div id="app">
    <button @click="showToast">SHOW TOAST</button>
    <button @click="showIndicator">SHOW INDICATOR</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    showToast () {
      this.$toast('hahahaha')
    },
    showIndicator () {
      this.$indicator('emememem')
    }
  }
}
</script>

<style>
@import url(./assets/css/utils.css);

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 800px;
  margin: 100px auto;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.item {
  width: 200px;
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
