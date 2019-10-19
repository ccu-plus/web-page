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
import storage from 'store';

Component.registerHooks([
  'beforeRouteEnter',
]);

@Component
export default class SignOut extends Vue {
  public from!: Route;

  private beforeRouteEnter(to: Route, from: Route, next: (to?: ((vm: SignOut) => any)) => void) {
    next((vm) => vm.from = from);
  }

  private async mounted() {
    await axios.post('/auth/sign-out');

    delete axios.defaults.headers.common['api-token'];

    storage.remove('api-token');

    this.$store.commit('setSignIn', false);

    await this.$router.replace(this.from ? this.from.path : { name: 'courses' });
  }
}
</script>
