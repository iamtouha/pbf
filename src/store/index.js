import { createStore } from "vuex";

export default createStore({
  state: {
    registerDialog: false,
  },
  getters: {},
  mutations: {
    REGISTER_DIALOG_OPEN(state) {
      state.registerDialog = true;
    },
    REGISTER_DIALOG_CLOSE(state) {
      state.registerDialog = false;
    },
  },
});
