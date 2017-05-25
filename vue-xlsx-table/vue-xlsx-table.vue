<template>
  <div class="vue-xlsx-container">
    <div class="xlsx-upload-wrapper">
      <button type="button" class="xlsx-button" @click="handleUploadBtnClick">
        <slot></slot>
      </button>
      <input id="upload-input" type="file" :accept="accept" class="c-hide" @change="handleFileChange">
    </div>
    <!-- dialog wrapper -->
    <div class="xlsx-dialog-wrapper" v-if="workbook">
      <div class="xlsx-dialog-content">
        <div class="xlsx-dialog__header">
          <span class="el-dialog__title">
            <span>检查数据是否正确?</span>
          </span>
        </div>
        <div class="xlsx-dialog__body">
          <div class="xlsx-table-wrapper">
            <table>
              <thead>
                <tr>
                  <td v-for="name in tableData.header">{{ name }}</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="tr in tableData.body">
                  <td v-for="td in tr">{{ td }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="xlsx-dialog__footer">
          <span class="dailog-footer">
            <button type="button" class="xlsx-button button-large button-primary" @click="clearAllData">
              <span>取消</span>
            </button>
          </span>
          <button type="button" class="xlsx-button button-large mr20">
            <span>确认</span>
          </button>
          <button type="button" class="xlsx-button button-large" @click="exportXlsx">
            <span>导出</span>
          </button>
        </div>
      </div>
    </div>
    <!-- dialog bg -->
    <div class="xlsx-dialog-modal" v-if="workbook"></div>
  </div>

</template>

<script>
import XLSX from 'xlsx'
import FileSaver from 'file-saver'

export default {
  name: 'vue-xlsx-table',
  data () {
    return {
      rawFile: null,
      workbook: null,
      tableData: {
        header: [],
        body: []
      },
      xlsxArrJson: null
    }
  },
  props: {
    accept: {
      type: String,
      default: '.xlsx, .xls'
    }
  },
  computed: {
    rABS () {
      // true: readAsBinaryString ; false: readAsArrayBuffer
      return false
    }
  },
  methods: {
    handleFileChange (e) {
      if (this.rawFile !== null) {
        return
      }
      this.rawFile = e.target.files[0]
      this.fileConvertToWorkbook(this.rawFile)
      .then((workbook) => {
        let xlsxArr = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]])
        this.xlsxArrJson = xlsxArr
        this.workbook = workbook
        this.initTable(
          this.xlsxArrToTableArr(xlsxArr)
        )
      }).catch((err) => {
        console.error(err)
      })
    },
    fileConvertToWorkbook (file) {
      let reader = new window.FileReader()
      let fixdata = (data) => {
        let o = ''
        let w = 10240
        let l = 0
        for (l; l < data.byteLength / w; ++l) {
          o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
        }
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
        return o
      }
      return new Promise((resolve, reject) => {
        try {
          reader.onload = (renderEvent) => {
            let data = renderEvent.target.result
            if (this.rABS) {
              /* if binary string, read with type 'binary' */
              resolve(XLSX.read(data, {type: 'binary'}))
            } else {
              /* if array buffer, convert to base64 */
              let arr = fixdata(data)
              resolve(XLSX.read(window.btoa(arr), {type: 'base64'}))
            }
          }
          reader.onerror = (error) => {
            reject(error)
          }
          if (this.rABS) {
            reader.readAsBinaryString(file)
          } else {
            reader.readAsArrayBuffer(file)
          }
        } catch (error) {
          reject(error)
        }
      })
    },
    xlsxArrToTableArr (xlsxArr) {
      let tableArr = []
      let length = 0
      let maxLength = 0
      let maxLengthIndex = 0
      xlsxArr.forEach((item, index) => {
        length = Object.keys(item).length
        if (maxLength < length) {
          maxLength = length
          maxLengthIndex = index
        }
      })
      let tableHeader = Object.keys(xlsxArr[maxLengthIndex])
      let rowItem = {}
      xlsxArr.forEach((item) => {
        rowItem = {}
        for (let i = 0; i < maxLength; i++) {
          rowItem[tableHeader[i]] = item[tableHeader[i]] || ''
        }
        tableArr.push(rowItem)
      })
      return {
        header: tableHeader,
        data: tableArr
      }
    },
    tableArrToXlsxArr ({data, header}) {
      let xlsxArr = []
      let tempObj = {}
      data.forEach((rowItem) => {
        tempObj = {}
        rowItem.forEach((item, index) => {
          tempObj[header[index]] = item
        })
        xlsxArr.push(tempObj)
      })
      return xlsxArr
    },
    exportXlsx () {
      // test
      var _headers = ['id', 'name', 'age', 'country', 'remark']
      var _data = [
        {
          id: '1',
          name: 'test1',
          age: '30',
          country: 'China',
          remark: 'hello'
        },
        {
          id: '2',
          name: 'test2',
          age: '20',
          country: 'America',
          remark: 'world'
        },
        {
          id: '3',
          name: 'test3',
          age: '18',
          country: 'Unkonw',
          remark: '???'
        }
      ]
      var headers = _headers.map((v, i) => Object.assign({}, {v: v, position: String.fromCharCode(65 + i) + 1}))
                    .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {})
      // 为 _headers 添加对应的单元格位置
      // [ { v: 'id', position: 'A1' },
      //   { v: 'name', position: 'B1' },
      //   { v: 'age', position: 'C1' },
      //   { v: 'country', position: 'D1' },
      //   { v: 'remark', position: 'E1' } ]
      // .map((v, i) => Object.assign({}, {v: v, position: String.fromCharCode(65+i) + 1 }))
      // 转换成 worksheet 需要的结构
      // { A1: { v: 'id' },
      //   B1: { v: 'name' },
      //   C1: { v: 'age' },
      //   D1: { v: 'country' },
      //   E1: { v: 'remark' } }
      // .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {});
      var data = _data.map((v, i) => _headers.map((k, j) => Object.assign({}, { v: v[k], position: String.fromCharCode(65 + j) + (i + 2) }))).reduce((prev, next) => prev.concat(next)).reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {})
        // 匹配 headers 的位置，生成对应的单元格数据
        // [ [ { v: '1', position: 'A2' },
        //     { v: 'test1', position: 'B2' },
        //     { v: '30', position: 'C2' },
        //     { v: 'China', position: 'D2' },
        //     { v: 'hello', position: 'E2' } ],
        //   [ { v: '2', position: 'A3' },
        //     { v: 'test2', position: 'B3' },
        //     { v: '20', position: 'C3' },
        //     { v: 'America', position: 'D3' },
        //     { v: 'world', position: 'E3' } ],
        //   [ { v: '3', position: 'A4' },
        //     { v: 'test3', position: 'B4' },
        //     { v: '18', position: 'C4' },
        //     { v: 'Unkonw', position: 'D4' },
        //     { v: '???', position: 'E4' } ] ]
        // .map((v, i) => _headers.map((k, j) => Object.assign({}, { v: v[k], position: String.fromCharCode(65+j) + (i+2) })))
        // 对刚才的结果进行降维处理（二维数组变成一维数组）
        // [ { v: '1', position: 'A2' },
        //   { v: 'test1', position: 'B2' },
        //   { v: '30', position: 'C2' },
        //   { v: 'China', position: 'D2' },
        //   { v: 'hello', position: 'E2' },
        //   { v: '2', position: 'A3' },
        //   { v: 'test2', position: 'B3' },
        //   { v: '20', position: 'C3' },
        //   { v: 'America', position: 'D3' },
        //   { v: 'world', position: 'E3' },
        //   { v: '3', position: 'A4' },
        //   { v: 'test3', position: 'B4' },
        //   { v: '18', position: 'C4' },
        //   { v: 'Unkonw', position: 'D4' },
        //   { v: '???', position: 'E4' } ]
        // .reduce((prev, next) => prev.concat(next))
        // 转换成 worksheet 需要的结构
        //   { A2: { v: '1' },
        //     B2: { v: 'test1' },
        //     C2: { v: '30' },
        //     D2: { v: 'China' },
        //     E2: { v: 'hello' },
        //     A3: { v: '2' },
        //     B3: { v: 'test2' },
        //     C3: { v: '20' },
        //     D3: { v: 'America' },
        //     E3: { v: 'world' },
        //     A4: { v: '3' },
        //     B4: { v: 'test3' },
        //     C4: { v: '18' },
        //     D4: { v: 'Unkonw' },
        //     E4: { v: '???' } }
        // .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {});
      // 合并 headers 和 data
      var output = Object.assign({}, headers, data)
      // 获取所有单元格的位置
      var outputPos = Object.keys(output)
      // 计算出范围
      var ref = outputPos[0] + ':' + outputPos[outputPos.length - 1]
      // 构建 workbook 对象
      var wb = {
        SheetNames: ['mySheet'],
        Sheets: {
          'mySheet': Object.assign({}, output, {'!ref': ref})
        }
      }
      // 导出 Excel
      // XLSX.writeFile(wb, 'output.xlsx');
      var wopts = {bookType: 'xlsx', bookSST: false, type: 'binary'}
      var wbout = XLSX.write(wb, wopts)
      function s2ab (s) {
        var buf = new ArrayBuffer(s.length)
        var view = new Uint8Array(buf)
        for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
        return buf
      }
      const fileName = 'test_' + this.getTimeStamp() + '.xlsx'
      /* the saveAs call downloads a file on the local machine */
      FileSaver.saveAs(new window.Blob([s2ab(wbout)], {type: ''}), fileName)
    },
    initTable ({data, header}) {
      this.tableData.header = header
      this.tableData.body = data
      this.$emit('on-select-file', this.tableData)
    },
    handleUploadBtnClick () {
      this.clearAllData()
      document.getElementById('upload-input').click()
    },
    clearAllData () {
      document.getElementById('upload-input').value = null
      this.tableData = {
        header: [],
        body: []
      }
      this.rawFile = null
      this.workbook = null
    },
    getTimeStamp () {
      var date = new Date()
      const mouthStr = ('0' + (date.getMonth() + 1)).slice(-2)
      const dateStr = ('0' + date.getDate()).slice(-2)
      const hourStr = ('0' + date.getHours()).slice(-2)
      const minuteStr = ('0' + date.getMinutes()).slice(-2)
      const secondStr = ('0' + date.getSeconds()).slice(-2)
      const timeStr = date.getFullYear() + mouthStr + dateStr + hourStr + minuteStr + secondStr
      return timeStr
    }
  }
}
</script>

<style scoped>
.vue-xlsx-container {
  display: inline-block;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.vue-xlsx-container *{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.vue-xlsx-container .c-hide {
  display: none;
}
.xlsx-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #20a0ff;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  padding: 7px 9px;
  font-size: 12px;
  border-radius: 4px;
  color: #fff;
  background-color: #20a0ff;
}
.xlsx-button.button-large{
  padding: 10px 15px;
  font-size: 14px;
}
.xlsx-button.button-primary{
  color: #1f2d3d;
  border: 1px solid #bfcbd9;
  background-color: #fff;
}
.xlsx-dialog-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  z-index: 999;
}
.xlsx-dialog-content {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0,0,0,.3);
  box-sizing: border-box;
  margin-bottom: 50px;
  top: 15%;
}
.xlsx-dialog__header {
  padding: 20px 20px 0;
  font-weight: 700;
}
.xlsx-dialog__body {
  position: relative;
  padding: 30px 20px;
  color: #48576a;
  overflow: hidden;
}
.xlsx-table-wrapper {
  font-size: 13px;
  width: 1000px;
}
.xlsx-table-wrapper table {
  table-layout: fixed;
  width: 100%;
  text-align: center;
  border-collapse: collapse;
}
.xlsx-table-wrapper thead {
  font-weight: 700;
  background-color: #eff2f7;
}
.xlsx-table-wrapper td {
  border: 1px solid #8492a6;
  padding: 5px 0;
  word-wrap: break-word;
}
.xlsx-dialog__footer {
  padding: 10px 20px 15px;
  text-align: right;
  box-sizing: border-box;
}
.mr20 {
  margin-right: 20px;
}
.xlsx-dialog-modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: .5;
  background: #000;
  z-index: 998;
}
</style>
