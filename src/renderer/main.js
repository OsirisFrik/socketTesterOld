import Vue from 'vue'
import Vuetify from 'vuetify'

import App from './App'
import router from './router'
import store from './store'

import i18n from '../i18n'
import Database from '../database'
import Customs from '../customs'

import 'highlight.js/styles/default.css'
import 'vuetify/dist/vuetify.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@fortawesome/fontawesome-free/css/fontawesome.min.css'
import './assets/style.scss'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  i18n,
  Customs,
  Database,
  template: '<App/>'
}).$mount('#app')
