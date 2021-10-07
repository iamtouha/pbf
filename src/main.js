import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import InputField from "./components/InputField.vue";
import "./assets/style.css";

const app = createApp(App);

app.component("InputField", InputField);

app.use(router).mount("#app");
