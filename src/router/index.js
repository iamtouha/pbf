import { createRouter, createWebHistory } from "vue-router";
import { auth } from "../firebase";
import store from "../store";
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
      meta: {
        auth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const user = auth.currentUser;
  if (to.meta.auth && user) {
    return next();
  }
  if (to.meta.auth && !user) {
    store.commit("REGISTER_DIALOG_OPEN");
    return next("/");
  }
  return next();
});

export default router;
