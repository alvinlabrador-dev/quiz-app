import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";

import Home from "@/views/Home";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/category/",
        name: "Category",
        component: () =>
          import(/* webpackChunkName: "category" */ "@/views/Category.vue")
      }
    ]
  },
  {
    path: "/quiz/",
    name: "Quiz",
    component: () => import(/* webpackChunkName: "quiz" */ "@/views/Quiz.vue"),
    children: [
      {
        path: ":itemId",
        name: "Item",
        component: () =>
          import(/* webpackChunkName: "item" */ "@/views/Item.vue")
      }
    ],
    beforeEnter(_, __, next) {
      // redirect if quiz is access directly
      if (!store.state.quizItems.length) next("/");
      else next();
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
