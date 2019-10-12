import axios from '@/libs/axios';
import Vue from 'vue';
import Vuex from 'vuex';
import { CancelTokenSource } from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    signIn: false,
    requests: [] as CancelTokenSource[],
    courses: [],
    search: {
      college: '',
      department: '',
      dimension: '',
      keyword: '',
    },
  },

  mutations: {
    setSignIn(state, payload) {
      state.signIn = payload;
    },

    setCourses(state, payload) {
      state.courses = payload;
    },
  },

  actions: {
    async search({ commit }, params) {
      const { data: { data } } = await axios.get('/courses/search', { params });

      commit('setCourses', data);
    },
  },
});
