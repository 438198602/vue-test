<template>
  <div class="home">
    <van-search
      v-model="state.searchTxt"
      shape="round"
      background="#4fc08d"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    />

    <van-swipe :autoplay="3000" :height="200" lazy-render>
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>

    <van-notice-bar
      left-icon="volume-o"
      text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
    />

    <van-grid>
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
    </van-grid>

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
import { reactive, onActivated } from 'vue';
import { useRouter } from 'vue-router';
import { getHomeList } from '@/api/index';

export default {
  setup() {
    const state = reactive({
      searchTxt: '',
      images: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg'
      ],
      page: 1,
      list: [],
      loading: false,
      finished: false
    });
    const router = useRouter();

    const onSearch = val => {
      console.log(val);
    };

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

    onActivated(() => {
      console.log('---Home onActivated---');
    });

    return { state, onSearch, onLoad, listClick };
  }
};
</script>

<style lang="scss" scoped>
.home {
  .van-search {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    width: 100%;
  }
  .van-swipe {
    margin-top: 55px;
  }
  .van-notice-bar {
    margin: 10px auto 0;
  }
}
</style>
