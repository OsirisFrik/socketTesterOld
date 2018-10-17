import Vue from 'vue'
import store from './renderer/store'

/**
 * @method SendToast
 * @param {Object} toast
 * @param {!String} toast.message
 * @param {?String} toast.color
 * @param {?Number} toast.timeout
 * @param {?Boolean} toast.showClose
 */

function SendToast (toast) {
  return store.commit('TOAST', toast)
}
Vue.prototype.$toast = SendToast

function commitEvent (evetn, payload) {
  return store.commit(event, payload)
}
Vue.prototype.$commit = commitEvent

export default {
  install: function (Vue) {
    return Vue
  }
}
