<template>
  <div class="user">
    <div class="info">
      <div class="left">
        <div class="avatar">
          <van-uploader
            v-model="state.fileList"
            :after-read="afterRead"
            preview-size="60px"
            :preview-image="false"
            :preview-full-image="false"
          >
            <img :src="state.userInfo.avatar" alt="" />
          </van-uploader>
        </div>
      </div>
      <div class="right">
        <p class="name">{{ state.userInfo.username }}</p>
        <p class="des">{{ state.userInfo.des }}</p>
      </div>
    </div>

    <div class="list">
      <van-cell title="系统消息" icon="comment-o" is-link to="/message" />
      <van-cell title="设置" icon="setting-o" is-link to="/setting" />
      <van-cell title="关于" icon="question-o" is-link to="/about" />
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  setup() {
    const state = reactive({
      userInfo: {
        avatar: "https://b.yzcdn.cn/vant/icon-demo-1126.png",
        username: "我没有名字",
        des: "我太难了…太难了…难了…了…了…了",
      },
      fileList: [],
    });

    const afterRead = (file) => {
      state.userInfo.avatar = file.content;
    };

    return { state, afterRead };
  },
};
</script>

<style lang="scss" scoped>
.user {
  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    widows: 100%;
    height: 160px;
    padding: 0 20px;
    background: #ccc;
    .left {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60px;
      .avatar {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      margin-left: 20px;
      .name {
        font-size: 16px;
      }
      .des {
        font-size: 14px;
        margin-top: 8px;
      }
    }
  }
  .list {
    margin-top: 20px;
  }
}
</style>
