<template>
  <div class="main">
    <div class="balls item">
      <loading type="balls" color="#FF4959" :size="{ width: '40px', height: '40px'}"></loading>
    </div>
    <!-- <h2>spiningDubbles</h2>
    <vue-loading type="spiningDubbles" color="#d9544e" :size="{ width: '50px', height: '50px' }"></vue-loading> -->
  </div>
</template>

<script>
import loading from '@/components/loading'
// import vueLoading from 'vue-loading-template'
export default {
  name: 'main',
  data () {
    return {
    }
  },
  components: {
    loading
    // vueLoading
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
