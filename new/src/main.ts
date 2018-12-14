import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/v'
axios.defaults.headers.post['Content-Type'] = 'application/json';
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
