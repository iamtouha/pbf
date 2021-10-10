import { createStore } from "vuex";

export default createStore({
  state: {
    registerDialog: false,
    signedIn: false,
  },
  getters: {},
  mutations: {
    REGISTER_DIALOG_OPEN(state) {
      state.registerDialog = true;
    },
    REGISTER_DIALOG_CLOSE(state) {
      state.registerDialog = false;
    },
    SIGNED_IN(state) {
      state.signedIn = true;
    },
    SIGNED_OUT(state) {
      state.signedIn = false;
    },
  },
});
