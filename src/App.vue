<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>

    <van-tabbar v-if="$route.meta.isTabbar" route safe-area-inset-bottom>
      <van-tabbar-item replace to="/" icon="home-o">
        Home
      </van-tabbar-item>
      <van-tabbar-item replace to="/about" icon="search">
        About
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style lang="scss">
html {
  // 设计稿375px
  // postcss-pxtorem rootValue 37.5px
  font-size: 10vw;
}
@media screen and (max-width: 300px) {
  html {
    width: 300px;
    font-size: 30px;
  }
}
@media screen and (min-width: 500px) {
  html {
    width: 500px;
    font-size: 50px;
    margin: 0 auto;
  }
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);
  padding-right: constant(safe-area-inset-right);
  padding-right: env(safe-area-inset-right);
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: constant(safe-area-inset-left);
  padding-left: env(safe-area-inset-left);
  /* 移动端触摸元素时出现半透明灰色遮罩 */
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  /* 禁用系统默认的长按菜单 */
  -webkit-touch-callout: none;
  user-select: none;
}
img {
  width: 100%;
  height: auto;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  font-size: 16px;
}
</style>
