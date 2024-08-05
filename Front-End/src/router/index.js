import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CategoryView from "../views/CategoryView.vue";
import User from "../views/User.vue";
import Login from "../views/Login.vue";
import NewsView from "@/views/NewsView.vue";
// import MenuBar from "../views/MenuBar.vue";
// import { loadLayoutMiddleware } from '@/router/middleware/loadLayoutMiddleware';

const routes = [
  {
    path: "/category",
    name: "category",
    component: CategoryView,
    meta: {
      layout: "AppLayout",
    },
  },
  {
    path: "/news",
    name: "news",
    component: NewsView,
    meta: {
      layout: "AppLayout",
    },
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/user",
    name: "user",

    component: User,
    meta: {
      layout: "AppLayout",
    },
  },
  // {
  //   path: '/',
  //   name: 'menu',
  //   component: MenuBar,
  //   meta: {
  //     layout: 'AppLayout'
  //   }

  // },
  {
    path: "/",
    name: "login",
    component: Login,
    meta: {
      layout: "AppLayout",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// router.beforeEach(loadLayoutMiddleware)

export default router;
