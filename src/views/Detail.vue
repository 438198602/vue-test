<template>
  <div class="detail">
    <MyHeader :title="state.title" />

    <van-list
      v-model:loading="state.loading"
      :finished="state.finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in state.list"
        :key="item"
        :title="item.id + '-' + item.title"
        :value="item.sentence"
        @click="listClick(item)"
      />
    </van-list>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getHomeList } from '@/api/index';

export default {
  setup() {
    const state = reactive({
      title: '',
      page: 1,
      list: [],
      loading: false,
      finished: false
    });
    const router = useRouter();
    const route = useRoute();

    const _getHomeList = () => {
      setTimeout(async () => {
        let data = await getHomeList({ page: state.page });
        state.page++;
        state.list = state.list.concat(data);

        // 加载状态结束
        state.loading = false;

        // 数据全部加载完成
        if (state.list.length >= 40) {
          state.finished = true;
        }
      }, 1000);
    };

    const onLoad = () => {
      _getHomeList();
    };

    const listClick = item => {
      router.push(`/detail/${item.id}?title=${item.title}`);
    };

    onMounted(() => {
      state.title = route.query.title;
    });

    return { state, onLoad, listClick };
  }
};
</script>

<style lang="scss" scoped>
.detail {
  min-height: 100vh;
}
</style>
