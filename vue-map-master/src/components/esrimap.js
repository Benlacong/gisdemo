import * as jsapi from './jsapi'

export async function createMap () {
  const [
    MapView,
    Map,
    Locator,
    BasemapToggle,
    FeatureLayer
  ] = await jsapi.load([
    'esri/views/MapView',
    'esri/Map',
    'esri/tasks/Locator',
    'esri/widgets/BasemapToggle',
    'esri/layers/FeatureLayer'
  ])
  var locatorTask = new Locator({
    url: 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer'
  })
  const map = new Map({
    basemap: 'streets'
  })
  window.view = new MapView({
    map: map,
    container: 'viewDiv',
    zoom: 7,
    center: [117.25, 31.83]
  })
  // 点击事件：显示坐标
  view.on('click', (event) => {
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

    // 查找鼠标点击处所对应的实地地址
    locatorTask.locationToAddress(event.mapPoint).then((response) => {
      // 将鼠标点击处的信息对象event.mapPoint传入函数locationToAddress()
      // 传入完成后，调用匿名函数，传入参数是locationToAddress()返回的地址信息对象
      // 如果成功找到地址，将其在popup中显示出来
      view.popup.content = response.address
    })
  })
  // 切换地图
  var toggle = new BasemapToggle({
    view: view,
    nextBasemap: 'satellite'
  })
  view.ui.add(toggle, 'top-right')
  // 添加安徽shp
  var featureLayer = new FeatureLayer({
    url: 'http://localhost:6080/arcgis/rest/services/ah2/MapServer'
  })
  featureLayer.opacity = 0.5
  map.add(featureLayer)
}
