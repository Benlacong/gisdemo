import * as jsapi from './jsapi'
export async function createMap2 () {
  const [
    TileInfo, WebTileLayer, Map, MapView, Point, SpatialReference, FeatureLayer, Search, Locator
  ] = await jsapi.load([
    'esri/layers/support/TileInfo',
    'esri/layers/WebTileLayer',
    'esri/Map',
    'esri/views/MapView',
    'esri/geometry/Point',
    'esri/geometry/SpatialReference',
    'esri/layers/FeatureLayer',
    'esri/widgets/Search',
    'esri/tasks/Locator'
  ])
  const tileInfo = new TileInfo({
    dpi: 90.71428571427429,
    rows: 256,
    cols: 256,
    compressionQuality: 0,
    origin: {
      x: -180,
      y: 90
    },
    spatialReference: {
      wkid: 4326
    },
    lods: [
      { level: 2, levelValue: 2, resolution: 0.3515625, scale: 147748796.52937502 },
      { level: 3, levelValue: 3, resolution: 0.17578125, scale: 73874398.264687508 },
      { level: 4, levelValue: 4, resolution: 0.087890625, scale: 36937199.132343754 },
      { level: 5, levelValue: 5, resolution: 0.0439453125, scale: 18468599.566171877 },
      { level: 6, levelValue: 6, resolution: 0.02197265625, scale: 9234299.7830859385 },
      { level: 7, levelValue: 7, resolution: 0.010986328125, scale: 4617149.8915429693 },
      { level: 8, levelValue: 8, resolution: 0.0054931640625, scale: 2308574.9457714846 },
      { level: 9, levelValue: 9, resolution: 0.00274658203125, scale: 1154287.4728857423 },
      { level: 10, levelValue: 10, resolution: 0.001373291015625, scale: 577143.73644287116 },
      { level: 11, levelValue: 11, resolution: 0.0006866455078125, scale: 288571.86822143558 },
      { level: 12, levelValue: 12, resolution: 0.00034332275390625, scale: 144285.93411071779 },
      { level: 13, levelValue: 13, resolution: 0.000171661376953125, scale: 72142.967055358895 },
      { level: 14, levelValue: 14, resolution: 8.58306884765625e-005, scale: 36071.483527679447 },
      { level: 15, levelValue: 15, resolution: 4.291534423828125e-005, scale: 18035.741763839724 },
      { level: 16, levelValue: 16, resolution: 2.1457672119140625e-005, scale: 9017.8708819198619 },
      { level: 17, levelValue: 17, resolution: 1.0728836059570313e-005, scale: 4508.9354409599309 },
      { level: 18, levelValue: 18, resolution: 5.3644180297851563e-006, scale: 2254.4677204799655 },
      { level: 19, levelValue: 19, resolution: 2.68220901489257815e-006, scale: 1127.23386023998275 },
      { level: 20, levelValue: 20, resolution: 1.341104507446289075e-006, scale: 563.616930119991375 }
    ]
  })
  // 天地图矢量
  const tdtVecLayer = new WebTileLayer('http://{subDomain}.tianditu.com/DataServer?T=vec_c&x={col}&y={row}&l={level}', {
    subDomains: ['t0'],
    tileInfo: tileInfo,
    id: 'tdtVecLayer'
  })
  // 天地图注记
  const tdtCvaLayer = new WebTileLayer('http://{subDomain}.tianditu.com/DataServer?T=cva_c&x={col}&y={row}&l={level}', {
    subDomains: ['t0'],
    tileInfo: tileInfo,
    id: 'tdtCvaLayer'
  })
  // 天地图影像
  const tdtImgLayer = new WebTileLayer('http://{subDomain}.tianditu.com/DataServer?T=img_c&x={col}&y={row}&l={level}', {
    subDomains: ['t0'],
    tileInfo: tileInfo,
    visible: false,
    id: 'tdtImgLayer'
  })
  window.map = new Map({
    basemap: {
      baseLayers: [tdtVecLayer, tdtImgLayer, tdtCvaLayer]
    }
  })
  window.view = new MapView({
    container: 'viewDiv',
    map: map,
    spatialReference: {
      wkid: 4326
    },
    center: new Point({
      x: 120,
      y: 30,
      spatialReference: new SpatialReference({ wkid: 4326 })
    }),
    scale: 2000000
  })

  // 去掉缩放按钮和esri logo
  // view.ui.remove('zoom')
  view.ui.remove('attribution')
  // 添加安徽shp
  var featureLayer = new FeatureLayer({
    url: 'http://localhost:6080/arcgis/rest/services/ah2/MapServer'
  })
  featureLayer.opacity = 0.5
  map.add(featureLayer)
  // 添加定位搜索
  var searchWidget = new Search({
    view: view
  })
  view.ui.add(searchWidget, {
    position: 'top-right'
  })
  // 经纬度
  window.locatorTask = new Locator({
    url: 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer'
  })
}
