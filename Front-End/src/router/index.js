import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import LoginLayout from "../layouts/LoginLayout.vue";

import CategoryView from "../views/CategoryView.vue";
import UserView from "../views/User.vue";
import HomeView from "../views/HomeView.vue";
import AuthorView from "../views/Author.vue";

import LoginView from "../views/Login.vue";

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
        path: "user",
        name: "user",
        component: UserView,
      },
      {
        path: "home",
        name: "home",
        component: HomeView,
      },
      {
        path: "author",
        name: "author",
        component: AuthorView,
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
