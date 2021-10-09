import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import InputField from "./components/InputField.vue";
import "./assets/style.css";

const app = createApp(App);

app.component("InputField", InputField);

app.use(router).use(store).mount("#app");
