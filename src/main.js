import Vue from 'vue'
import fastclick from 'fastclick'
import App from './App.vue'
import router from './router'
import store from './store'
import './common/stylus/index.styl'
Vue.config.productionTip = false

fastclick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
