<template>
  <v-row align="center" class="h-full" justify="center">
    <v-progress-circular
      color="primary"
      indeterminate
      :size="64"
      :width="2"
    />
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from '@/libs/axios';
import { Route } from 'vue-router';

Component.registerHooks([
  'beforeRouteEnter',
]);

@Component
export default class SignOut extends Vue {
  public from!: Route;

  private beforeRouteEnter(to: Route, from: Route, next: (to?: ((vm: SignOut) => any)) => void) {
    next((vm) => vm.from = from);
  }

  private created() {
    delete axios.defaults.headers.common['api-token'];

    localStorage.removeItem('api-token');

    this.$store.commit('setSignIn', false);

    this.$nextTick(() => this.$router.replace(this.from.path));
  }
}
</script>
