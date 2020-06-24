
const state = {
  currentNodeId: '0'
}

const mutations = {
  SET_CURRENT_NODEID: (state, currentNodeId) => {
    state.currentNodeId = currentNodeId
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
