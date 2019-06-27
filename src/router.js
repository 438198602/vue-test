import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/Home.vue"),
      meta: {
        title: "Home",
        isTabbar: true,
        keepAlive: false
      }
    },
    {
      path: "/about",
      name: "about",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue"),
      meta: {
        title: "About",
        isTabbar: true,
        keepAlive: false
      }
    },
    {
      path: "/shareBook",
      name: "shareBook",
      component: () => import("./views/shareBook/shareBook.vue"),
      meta: {
        title: "shareBook",
        keepAlive: true
      }
    },
    { path: "*", redirect: "/" }
  ]
});

router.beforeEach((to, from, next) => {
  // 路由发生变化修改页面title
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;
