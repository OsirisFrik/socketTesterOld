const originalData = {
  message: null,
  color: '',
  timeout: 6000,
  showClose: false
}

const state = {
  data: {}
}

const mutations = {
  TOAST (state, payload) {
    for (const key in originalData) {
      if (typeof payload[key] === 'undefined') {
        payload[key] = originalData[key]
      }
    }

    state.data = payload
  }
}

const actions = {

}

export default {
  state,
  mutations,
  actions
}
