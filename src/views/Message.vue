<template>
  <div class="message">
    <MyHeader title="系统消息" />

    <van-pull-refresh v-model="state.refreshing" @refresh="onRefresh">
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
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { getHomeList } from "@/api/index";

export default {
  setup() {
    const state = reactive({
      page: 1,
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
    });

    const _getHomeList = () => {
      setTimeout(async () => {
        if (state.refreshing) {
          state.list = [];
          state.refreshing = false;
        }

        let data = await getHomeList({ page: state.page });
        state.page++;
        state.list = state.list.concat(data);

        state.loading = false;

        if (state.list.length >= 30) {
          state.finished = true;
        }
      }, 1000);
    };

    const onLoad = () => {
      _getHomeList();
    };

    const onRefresh = () => {
      state.page = 1;
      state.finished = false;
      state.loading = true;
      _getHomeList();
    };

    onMounted(() => {});

    return {
      state,
      onLoad,
      onRefresh,
    };
  },
};
</script>

<style lang="scss" scoped>
.message {
  .van-cell {
    height: 100px;
  }
}
</style>
