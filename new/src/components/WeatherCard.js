import * as jsapi from './jsapi'

export async function card () {
  const [
    IdentifyTask, IdentifyParameters
  ] = await jsapi.load([
    'esri/tasks/IdentifyTask',
    'esri/tasks/support/IdentifyParameters'
  ])
  var identifyTask, params
  var ahURL = 'http://localhost:6080/arcgis/rest/services/MyMapService/MapServer'
  view.on('click', executeIdentifyTask)
  identifyTask = new IdentifyTask(ahURL)
  params = new IdentifyParameters()
  params.tolerance = 3
  params.layerOption = 'top'
  params.width = view.width
  params.height = view.height
  function executeIdentifyTask (event) {
    params.geometry = event.mapPoint
    params.mapExtent = view.extent
    identifyTask.execute(params).then(function (response) {
      var results = response.results[0].feature.attributes.LAST_NAME9
      console.log(results)
      this.$axios
        .get(
          '/weather/geo?key=fa89ea037ea05e21fd42af617c2a973f',
          {
            params: {
              cityname: results,
              format: 1
            }
          }
        )
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    })
  }
}
