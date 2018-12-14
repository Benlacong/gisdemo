<template>
  <router-view/>
</template>

<script>
export default {
  name: 'app'
  // created: function () {
  //   this.$axios
  //     .get(
  //       '/weather/geo?key=fa89ea037ea05e21fd42af617c2a973f',
  //       {
  //         params: {
  //           lon: 117,
  //           lat: 31.78,
  //           format: 1
  //         }
  //       }
  //     )
  //     .then(function (response) {
  //       console.log(response)
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //     })
  // }
}
</script>

<style lang="scss">
html {
  background-color: #eee;
}
</style>
