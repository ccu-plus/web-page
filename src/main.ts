import 'intersection-observer';
import './style.scss';

import Vue from 'vue';
import App from './app.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
  name: 'CCUPLUS',
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#ccu-plus');
