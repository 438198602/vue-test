<template>
  <div class="setting">
    <MyHeader title="设置" />

    <van-cell title="检查更新" is-link value="v1.0.7" @click="checkUpdate" />
    <van-cell title="清除缓存" is-link @click="clearCache" />
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import { Toast } from 'vant';

export default {
  setup() {
    const state = reactive({});

    const checkUpdate = () => {
      Toast.loading({
        message: '更新检查中...',
        forbidClick: true,
        duration: 1000,
        onClose: () => {
          Toast('无更新');
        }
      });
    };

    const clearCache = () => {
      Toast.loading({
        message: '清除中...',
        forbidClick: true,
        onClose: () => {
          Toast('清除成功');
        }
      });
    };

    onMounted(() => {});

    return {
      state,
      checkUpdate,
      clearCache
    };
  }
};
</script>

<style lang="scss" scoped>
.setting {
}
</style>
