const state = {
  data: {}
}

const mutations = {
  TOAST (state, payload) {
    if (typeof payload.color === 'undefined') {
      payload.color = ''
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
