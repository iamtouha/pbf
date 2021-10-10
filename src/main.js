import { createApp } from "vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import InputField from "./components/InputField.vue";
import "./assets/style.css";

let app;

onAuthStateChanged(auth, (user) => {
  user ? store.commit("SIGNED_IN") : store.commit("SIGNED_OUT");
  if (!app) {
    app = createApp(App)
      .component("InputField", InputField)
      .use(router)
      .use(store)
      .mount("#app");
  }
});
