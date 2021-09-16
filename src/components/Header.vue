<template>
  <van-nav-bar
    :title="title"
    left-arrow
    fixed
    placeholder
    z-index="9999"
    safe-area-inset-top
    @click-left="onClickLeft"
    @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="wap-home-o" size="18" />
    </template>
  </van-nav-bar>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'NavBar',
  props: {
    title: String
  },
  setup() {
    const router = useRouter();

    const onClickLeft = () => {
      router.go(-1);
    };

    const onClickRight = () => {
      router.push('/');
    };

    return { onClickLeft, onClickRight };
  }
};
</script>
