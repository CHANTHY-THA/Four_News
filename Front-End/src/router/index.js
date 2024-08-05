import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import LoginLayout from "../layouts/LoginLayout.vue";

import CategoryView from "../views/CategoryView.vue";
import UserView from "../views/User.vue";
import HomeView from "../views/HomeView.vue";

import LoginView from "../views/Login.vue";
import NewsView from "@/views/NewsView.vue";

const routes = [
  {
    path: "/",
    component: LoginLayout,
    children: [
      {
        path: "",
        name: "login",
        component: LoginView,
      },
    ],
  },
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "category",
        name: "category",
        component: CategoryView,
      },
      {
        path: "news",
        name: "news",
        component: NewsView,
      },
      {
        path: "user",
        name: "user",
        component: UserView,
      },
      {
        path: "home",
        name: "home",
        component: HomeView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const isAuthenticated = false; // Replace with actual auth check
//   if (to.name !== "login" && !isAuthenticated) next({ name: "login" });
//   else next();
// });

export default router;
