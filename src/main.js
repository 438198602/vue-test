import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import {
  Tabbar,
  TabbarItem,
  List,
  Cell,
  CellGroup,
  Divider,
  IndexBar,
  IndexAnchor,
  NavBar,
  Loading,
  PullRefresh,
  Uploader,
  Image as VanImage,
  Swipe,
  SwipeItem,
  Search,
  NoticeBar,
  Icon,
} from "vant";

import Header from "./components/Header";

// 在正式环境中替换掉console
if (process.env.NODE_ENV !== "development") {
  window.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    debug: () => {},
    error: () => {},
  };
}

const app = createApp(App);
app
  .use(Tabbar)
  .use(TabbarItem)
  .use(List)
  .use(Cell)
  .use(CellGroup)
  .use(Divider)
  .use(IndexBar)
  .use(IndexAnchor)
  .use(NavBar)
  .use(Loading)
  .use(PullRefresh)
  .use(Uploader)
  .use(VanImage)
  .use(Swipe)
  .use(SwipeItem)
  .use(Search)
  .use(NoticeBar)
  .use(Icon);

app.component("MyHeader", Header);

app.use(store).use(router).mount("#app");
