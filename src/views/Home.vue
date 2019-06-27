<template>
  <div class="home">
    <transition name="bounce">
      <p class="title_fixed" v-show="isShow">标题栏</p>
    </transition>
    <img alt="Vue logo" src="../assets/logo.png" class="logo" />
    <div class="vuex">
      <p>Vuex: {{ $store.state.token || "null" }}</p>
      <button @click="_setToken()">change Vuex</button>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { mapMutations } from "vuex";

export default {
  name: "home",
  components: {
    HelloWorld
  },
  data() {
    return {
      scrollTop: 0,
      isShow: true
    };
  },
  beforeCreate() {
    this.$toast({
      type: "loading",
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner"
    });
  },
  created() {
    this.$toast.clear();
  },
  mounted() {
    window.addEventListener("scroll", this.menu);
  },
  beforeDestroy() {},
  destroyed() {
    window.removeEventListener("scroll", this.menu);
  },
  methods: {
    ...mapMutations(["setToken"]),
    _setToken() {
      let token = this.$store.state.token || 0;
      this.setToken(token + 1);
    },
    menu() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop - this.scrollTop < 0) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
      this.scrollTop = scrollTop;
    }
  }
};
</script>
<style lang="scss" scoped>
.home {
  margin-bottom: 100px;
}
.title_fixed {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  background: #ccc;
}
.logo {
  width: 100%;
  margin-top: 50px;
}
.vuex {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
  button {
    padding: 6px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
}
.bounce-enter-active {
  animation: bounce-in 2s;
}
.bounce-leave-active {
  animation: bounce-out 2s;
}
@keyframes bounce-in {
  0% {
    transform: translateY(-100px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes bounce-out {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-100px);
    opacity: 0;
  }
}
</style>
