<template>
  <div>
     <base-map></base-map>
     <dropbutton></dropbutton>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import BaseMap from '@/components/BaseMap.vue' // @ is an alias to /src
import Dropbutton from '@/components/Dropbutton.vue'

@Component({
  components: {
    BaseMap,
    Dropbutton
  }
})
export default class MapView extends Vue {}
</script>
