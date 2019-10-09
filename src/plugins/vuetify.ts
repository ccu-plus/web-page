import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import zhHant from 'vuetify/src/locale/zh-Hant';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdiSvg',
  },
  lang: {
    current: 'zh-Hant',
    locales: {
      'zh-Hant': zhHant,
    },
  },
});
