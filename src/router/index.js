import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
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
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
