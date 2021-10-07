import { createRouter, createWebHistory } from "vue-router";
import Homepage from "../pages/Home.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Homepage,
    },
    {
      path: "/form",
      component: () => import("../pages/Form.vue"),
    },
  ],
});
export default router;
