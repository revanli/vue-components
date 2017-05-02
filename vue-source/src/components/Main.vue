<template>
  <div class="main">
    <div class="balls item">
      <loading type="balls" color="#FF4959" :size="{ width: '40px', height: '40px'}"></loading>
    </div>
    <div class="item">
      <vue-count-to :end="3000" :duration="2.5" :options="{useEasing: true, useGrouping: true, separator: ',', decimal: '.', prefix: '', suffix: ''}"></vue-count-to>
    </div>
  </div>
</template>

<script>
import loading from '@/components/loading'
import vueCountTo from '@/components/vue-count-to'
export default {
  name: 'main',
  data () {
    return {
    }
  },
  components: {
    loading,
    vueCountTo
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
