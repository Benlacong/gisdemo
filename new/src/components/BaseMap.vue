<template>
  <div id="viewDiv">
  </div>
</template>

<script>
import * as esriLoader from 'esri-loader'
import { createMap2 } from './tdtmap'
import { area } from './measure'
import { card } from '@/components/WeatherCard'
export default {
  data: function () {
    return {
      mapTitle: 'Create Map',
      popupIStrue: false
    }
  },
  methods: {
  },
  mounted () {
    const Fn = async () => {
      await createMap2()
      await area()
      await card()
    }
    Fn()
  }
}
</script>
<style scoped>
@import url("https://js.arcgis.com/4.9/esri/themes/light/main.css");
#viewDiv {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
