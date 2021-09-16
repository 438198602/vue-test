import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: '首页',
      keepAlive: true,
      tabbar: true,
      savedPosition: { top: 0 }
    },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/user',
    name: 'User',
    meta: {
      title: '我的',
      keepAlive: true,
      tabbar: true,
      savedPosition: { top: 0 }
    },
    component: () => import('../views/User.vue')
  },
  {
    path: '/message',
    name: 'Message',
    meta: {
      title: '系统消息'
    },
    component: () => import('../views/Message.vue')
  },
  {
    path: '/setting',
    name: 'Setting',
    meta: {
      title: '设置'
    },
    component: () => import('../views/Setting.vue')
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      title: '关于'
    },
    component: () => import('../views/About.vue')
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    meta: {
      title: '详情'
    },
    component: () => import('../views/Detail.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.meta.savedPosition) {
      return to.meta.savedPosition;
    } else if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});
router.afterEach((to, from) => {
  let top = document.body.scrollTop || document.documentElement.scrollTop;
  if (from.meta.keepAlive) {
    from.meta.savedPosition.top = top;
  }
});

export default router;
