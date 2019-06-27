<template>
  <div class="share_book_detail">
    <ul v-for="item in chapterList" :key="item.id">
      <li @click="changeUrl(item.id)">{{ item.text }}</li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import * as util from "../../utils/util";

export default {
  data() {
    return {
      url: "https://www.77nt.com/27755/",
      rules: {
        charset: "utf-8",
        user_agent: "",
        chapter_list: [
          {
            tagName: "div",
            type: "class",
            content: "list"
          },
          {
            tagName: "dl",
            type: "",
            content: ""
          },
          {
            tagName: "dd",
            type: "",
            content: ""
          },
          {
            tagName: "a",
            type: "",
            content: ""
          }
        ],
        cont: [
          {
            tagName: "div",
            type: "class",
            content: "content"
          }
        ],
        rule: {
          jump: 1,
          del: []
        }
      },
      chapterList: [],
      data: null
    };
  },
  beforeCreate() {
    this.$toast({
      type: "loading",
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
      duration: 0
    });
  },
  created() {
    console.log("created");
    console.log(util.urlToJson(window.location.search));
    axios({
      method: "GET",
      url: `http://cors-anywhere.herokuapp.com/${this.url}`,
      //   url: this.url,
      responseType: "document"
    })
      .then(res => {
        this.$toast.clear();

        let data = res.data;
        let chapterList = _querySelector(data, this.rules.chapter_list);
        function _querySelector(data, items) {
          function _tag(list) {
            let name;
            if (list.type == "class" && list.content) {
              name = `.${list.content}`;
            } else {
              name = `${list.content || list.tagName}`;
            }
            return name;
          }
          let tag = "";
          for (let i = 0; i < items.length; i++) {
            if (i == items.length - 1) {
              tag += _tag(items[i]);
            } else {
              tag += _tag(items[i]) + " > ";
            }
          }
          return data.querySelectorAll(`${tag}`);
        }
        for (let i = 0; i < chapterList.length; i++) {
          this.chapterList.push({
            id: i,
            text: chapterList[i].innerHTML
          });
        }
      })
      .catch(e => {
        console.log(e);
        this.$toast.clear();
      });
  },
  mounted() {},
  beforeDestroy() {},
  watch: {
    // $route(to, from) {
    //   console.log(to, from);
    // }
  },
  methods: {
    changeUrl(id) {
      this.$router.replace({
        path: `${this.$route.path}`,
        query: Object.assign({}, this.$route.query, { id })
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.share_book_detail {
}
</style>
