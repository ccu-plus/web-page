import Vue from "vue";
import Vuex from "vuex";
import { CancelTokenSource } from "axios/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    requests: <Array<CancelTokenSource>>[]
  },
  mutations: {},
  actions: {}
});
