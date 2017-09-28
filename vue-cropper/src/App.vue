<template>
  <div id="app">
    <img id="target" src=""></img>
    <div class="upload-wrap">
      <label>
        <input type="file" accept="image/*" id="capture" @change="upload($event)">
        <span class="h-bar"></span>
        <span class="v-bar"></span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  },
  methods: {
    upload (event) {
      let targetObj = document.getElementById('target')
      this.clip(event, {
        resultObj: targetObj,
        aspectRatio: 1
      })
    }
  },
  mounted () {
  }
}
</script>

<style>
body {
  background: #ccc;
  text-align: center;
}
.upload-wrap {
  display: inline-block;
  margin: 20px 0 0 0;
}
.upload-wrap.middle label {
  width: 212px;
  height: 128px;
  padding: 40px 80px;
}
.upload-wrap label {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  width: 100px;
  height: 100px;
  padding: 25px;
  border: 2px dashed rgba(255, 245, 245, 0.57);
  border-radius: 4px;
}
.upload-wrap label input {
  display: none;
}
.upload-wrap label .h-bar {
  display: inline-block;
  width: 50px;
  height: 2px;
  background: #D8D8D8;
}
.upload-wrap label .v-bar {
  display: inline-block;
  width: 2px;
  height: 50px;
  background: #D8D8D8;
  transform: translateX(-23px);
}
#target {
  width: 150px;
  height: 150px;
}
</style>
