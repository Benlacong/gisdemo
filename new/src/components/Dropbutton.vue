<template>
  <el-dropdown id='tool'>
    <span class='el-dropdown-link'>
      工具菜单
      <i class='el-icon-arrow-down el-icon--right'></i>
    </span>
    <el-dropdown-menu slot='dropdown'>
      <el-dropdown-item id='draw-polygon'>测量面积</el-dropdown-item>
      <el-dropdown-item id='draw-line'>测量距离</el-dropdown-item>
      <el-dropdown-item @click.native='popupswitch'>坐标显示</el-dropdown-item>
      <el-dropdown-item @click.native='weatherswitch'>实时天气预报</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import * as esriLoader from 'esri-loader'
import { area } from './measure'
import { card } from './WeatherCard'
import * as jsapi from './jsapi'
export default {
  data: function () {
    return {
      popupIStrue: false
    }
  },
  methods: {
    popupswitch: function () {
      this.popupIStrue = !this.popupIStrue
      view.on('click', event => {
        // 停止派发事件，阻止它被分配到其他document节点
        event.stopPropagation()
        // 获取点击处的经纬度
        // 保留3位小数
        var lon = Math.round(event.mapPoint.longitude * 1000) / 1000
        var lat = Math.round(event.mapPoint.latitude * 1000) / 1000

        // 配置popup弹出框
        view.popup.open({
          title: '此处的经纬度为:[' + lon + ',' + lat + ']', // 经纬度信息在popup的标题处显示
          location: event.mapPoint // 在鼠标点击处弹出popup
        })
        if (this.popupIStrue) {
          view.popup.visible = true
        } else {
          view.popup.visible = false
        }

        // 查找鼠标点击处所对应的实地地址
        locatorTask.locationToAddress(event.mapPoint).then(response => {
          // 将鼠标点击处的信息对象event.mapPoint传入函数locationToAddress()
          // 传入完成后，调用匿名函数，传入参数是locationToAddress()返回的地址信息对象
          // 如果成功找到地址，将其在popup中显示出来
          view.popup.content = response.address
        })
      })
    },
    weatherswitch: async function () {
      const [IdentifyTask, IdentifyParameters] = await jsapi.load([
        'esri/tasks/IdentifyTask',
        'esri/tasks/support/IdentifyParameters'
      ])
      var identifyTask, params
      var ahURL =
        'http://localhost:6080/arcgis/rest/services/MyMapService/MapServer'
      identifyTask = new IdentifyTask(ahURL)
      params = new IdentifyParameters()
      params.tolerance = 3
      params.layerOption = 'top'
      params.width = view.width
      params.height = view.height
      var cvue = this
      view.on('click', event => {
        params.geometry = event.mapPoint
        params.mapExtent = view.extent
        identifyTask.execute(params).then(function (response) {
          window.results = response.results[0].feature.attributes.LAST_NAME9
          console.log(results)
          cvue.a()
        })
      })
    },
    a () {
      console.log('111')
      this.$axios
        .get('/weather/geo?key=fa89ea037ea05e21fd42af617c2a973f', {
          params: {
            cityname: results,
            format: 1
          }
        })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  mounted () {
  }
}
</script>
<style scoped>
#tool {
  top: 20px;
  left: 80px;
  position: absolute;
  z-index: 99;
  padding: 10px;
  opacity: 0.75;
}
</style>
