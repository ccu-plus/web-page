import axios from '@/libs/axios';
import { CancelTokenSource } from 'axios';
import storage from 'store';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    requests: [] as CancelTokenSource[],

    signIn: !!storage.get('api-token'),

    profile: {
      nickname: '',
      email: '',
      verified: false,
    },

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

    setProfile(state, payload) {
      state.profile = payload;
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
