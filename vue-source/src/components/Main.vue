<template>
  <div class="main">
    <div class="balls item">
      <loading type="balls" color="#FF4959" :size="{ width: '40px', height: '40px'}"></loading>
    </div>
    <div class="item">
      <vue-count-to :end="2017" :duration="5" :options="{useEasing: true, useGrouping: true, separator: ',', decimal: '.', prefix: '', suffix: ''}"></vue-count-to>
    </div>
    <vue-xlsx-table @on-select-file="handleSelectedFile">导入Excel</vue-xlsx-table>
  </div>
</template>

<script>
import loading from '@/components/loading'
import vueCountTo from '@/components/vue-count-to'
import vueXlsxTable from '@/components/vue-xlsx-table'
export default {
  name: 'main',
  data () {
    return {
    }
  },
  components: {
    loading,
    vueCountTo,
    vueXlsxTable
  },
  methods: {
    handleSelectedFile (data) {
      console.log(data)
    }
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
