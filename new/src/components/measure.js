import * as jsapi from './jsapi'

export async function area () {
  const [
    Draw,
    Graphic,
    Polygon,
    geometryEngine,
    Polyline,
    TextSymbol,
    Point
  ] = await jsapi.load([
    'esri/views/2d/draw/Draw',
    'esri/Graphic',
    'esri/geometry/Polygon',
    'esri/geometry/geometryEngine',
    'esri/geometry/Polyline',
    'esri/symbols/TextSymbol',
    'esri/geometry/Point'
  ])

  var draw = new Draw({
    view: view
  })

  // draw polygon button
  var drawPolygonButton = document.getElementById('draw-polygon')
  drawPolygonButton.onclick = function () {
    view.graphics.removeAll()
    var action = draw.create('polygon')
    action.on('vertex-add', drawPolygon)
    action.on('cursor-update', drawPolygon)
    // action.on('vertex-remove', drawPolygon)
    // action.on('redo', drawPolygon)
    // action.on('undo', drawPolygon)
    // action.on('draw-complete', drawPolygon)
  }

  // this function is called from the polygon draw action events
  // to provide a visual feedback to users as they are drawing a polygon
  function drawPolygon (event) {
    var vertices = event.vertices

    // remove existing graphic
    view.graphics.removeAll()

    // create a new polygon
    var polygon = new Polygon({
      rings: vertices,
      spatialReference: view.spatialReference
    })

    // create a new graphic representing the polygon, add it to the view
    var graphic = new Graphic({
      geometry: polygon,
      symbol: {
        type: 'simple-fill', // autocasts as SimpleFillSymbol
        color: [178, 102, 234, 0.8],
        style: 'solid',
        outline: { // autocasts as SimpleLineSymbol
          color: [255, 255, 255],
          width: 2
        }
      }
    })

    view.graphics.add(graphic)

    // calculate the area of the polygon
    var area = geometryEngine.geodesicArea(polygon, 'square-kilometers')
    if (area < 0) {
      // simplify the polygon if needed and calculate the area again
      var simplifiedPolygon = geometryEngine.simplify(polygon)
      if (simplifiedPolygon) {
        area = geometryEngine.geodesicArea(simplifiedPolygon, 'square-kilometers')
      }
    }
    // start displaying the area of the polygon
    labelAreas(polygon, area)
  }

  // Label polyon with its area
  function labelAreas (geom, area) {
    var graphic = new Graphic({
      geometry: geom.centroid,
      symbol: {
        type: 'text',
        color: 'blue',
        haloColor: 'black',
        haloSize: '1px',
        text: area.toFixed(2) + '平方千米',
        xoffset: 3,
        yoffset: 3,
        font: { // autocast as Font
          size: 14,
          family: 'sans-serif'
        }
      }
    })
    view.graphics.add(graphic)
  }
  // 设置右键清屏
  view.on('click', event => {
    if (event.button === 2) {
      view.graphics.removeAll()
    }
  })
  // 测量距离
  var drawLineButton = document.getElementById('draw-line')
  drawLineButton.onclick = function () {
    view.graphics.removeAll()
    var action = draw.create('polyline')
    action.on('vertex-add', drawPolyline)
    action.on('cursor-update', drawPolyline)
    action.on('draw-complete', drawPolyline)
  }
  function drawPolyline (event) {
    var vertices = event.vertices
    view.graphics.removeAll()
    var polyline = new Polyline({
      type: 'polyline', // autocasts as Polyline
      paths: vertices,
      spatialReference: view.spatialReference
    })
    var graphic = new Graphic({
      geometry: polyline,
      symbol: {
        type: 'simple-line', // autocasts as SimpleLineSymbol
        color: [4, 90, 141],
        width: 3,
        cap: 'round',
        join: 'round'
      }
    })
    view.graphics.add(graphic)
    window.lineLength = geometryEngine.geodesicLength(polyline, 'kilometers')
    if (lineLength < 0) {
      // simplify the polygon if needed and calculate the lineLength again
      var simplifiedpolyline = geometryEngine.simplify(polyline)
      if (simplifiedpolyline) {
        lineLength = geometryEngine.geodesicArea(simplifiedpolylinen, 'kilometers')
      }
    }
    labelLength(polyline, lineLength)
    // var totalSymbol = new TextSymbol('总长度：' + lineLength + '千米')
    // // totalSymbol.setOffset(40, -15)
    // view.graphics.add(totalSymbol)
  }
  function labelLength (polyline, lineLength) {
    var point = {
      type: 'point', // autocasts as /Point
      x: polyline.paths[0][polyline.paths[0].length - 1][0], // 120
      y: polyline.paths[0][polyline.paths[0].length - 1][1], // 30
      spatialReference: view.spatialReference
    }
    var graphic = new Graphic({
      geometry: point,
      symbol: {
        type: 'text',
        color: 'black',
        // haloColor: 'black',
        // haloSize: '1px',
        text: lineLength + '千米',
        // xoffset: 3,
        // yoffset: 3,
        font: { // autocast as Font
          size: 14,
          family: 'sans-serif'
        }
      }
    })
    view.graphics.add(graphic)
  }
}
