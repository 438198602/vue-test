<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive>
      <component
        :is="Component"
        :key="route.path"
        v-if="route.meta.keepAlive"
      />
    </keep-alive>
    <component :is="Component" :key="route" v-if="!route.meta.keepAlive" />
  </router-view>

  <van-tabbar
    v-if="tabbar_route?.meta?.tabbar"
    route
    placeholder
    safe-area-inset-bottom
  >
    <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { useRoute } from "vue-router";

export default {
  setup() {
    const tabbar_route = useRoute();

    return { tabbar_route };
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
img {
  display: block;
  width: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
