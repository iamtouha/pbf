import { createStore } from "vuex";

export default createStore({
  state: {
    registerDialog: false,
    user: null,
  },
  getters: {},
  mutations: {
    REGISTER_DIALOG_OPEN(state) {
      state.registerDialog = true;
    },
    REGISTER_DIALOG_CLOSE(state) {
      state.registerDialog = false;
    },
    SIGNED_IN(state, { uid, email }) {
      state.user = { uid, email };
    },
    SIGNED_OUT(state) {
      state.user = null;
    },
  },
});
