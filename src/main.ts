import "./style.scss";

import Vue from "vue";
import VeeValidate from "vee-validate";
import Vuetify from "vuetify";
import App from "./app.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

Vue.use(VeeValidate, {
  dictionary: {
    zh_TW: require("vee-validate/dist/locale/zh_TW")
  },
  inject: false,
  locale: "zh_TW"
});

Vue.use(Vuetify, {
  lang: {
    locales: {
      "zh-Hant": require("vuetify/lib/locale/zh-Hant")
    },
    current: "zh-Hant"
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
