<template>
    <el-dropdown id="tool">
      <span class="el-dropdown-link" >
        工具菜单
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item id="draw-polygon">测量面积</el-dropdown-item>
        <el-dropdown-item id="draw-line">测量距离</el-dropdown-item>
        <el-dropdown-item @click.native="popupswitch">坐标显示</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
import * as esriLoader from 'esri-loader'
export default {
  data: function () {
    return {
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>
<style scoped>
</style>
