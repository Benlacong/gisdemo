import * as jsapi from './jsapi'

export async function createMap () {
  const [
    MapView,
    Map,
    Locator,
    BasemapToggle,
    FeatureLayer,
    Search
  ] = await jsapi.load([
    'esri/views/MapView',
    'esri/Map',
    'esri/tasks/Locator',
    'esri/widgets/BasemapToggle',
    'esri/layers/FeatureLayer',
    'esri/widgets/Search'
  ])
  window.locatorTask = new Locator({
    url: 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer'
  })
  window.map = new Map({
    basemap: 'streets'
  })
  window.view = new MapView({
    map: map,
    container: 'viewDiv',
    zoom: 7,
    center: [117.25, 31.83]
  })
  // 切换地图
  var toggle = new BasemapToggle({
    view: view,
    nextBasemap: 'satellite'
  })
  view.ui.add(toggle, 'bottom-right')
  // 添加安徽shp
  var featureLayer = new FeatureLayer({
    url: 'http://localhost:6080/arcgis/rest/services/ah2/MapServer'
  })
  featureLayer.opacity = 1
  map.add(featureLayer)
  // 添加定位搜索
  var searchWidget = new Search({
    view: view
  })
  view.ui.add(searchWidget, {
    position: 'top-right'
  })
}
