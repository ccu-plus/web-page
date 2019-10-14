<template>
  <v-parallax
    v-resize="onResize"
    :height="windowHeight"
    :src="require('@/assets/home-cover.jpg')"
  >
    <v-row align="center">
      <v-col class="text-center">
        <v-img
          alt="CCU PLUS LOGO"
          contain
          eager
          height="230"
          :src="require('@/assets/logo.svg')"
          :transition="false"
        />

        <h1 class="display-3 mt-3">CCU PLUS</h1>

        <h4 class="headline">猶如在茫茫學海中那道曙光</h4>
      </v-col>
    </v-row>
  </v-parallax>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RawLocation, Route } from 'vue-router';

Component.registerHooks([
  'beforeRouteEnter',
]);

@Component
export default class Home extends Vue {
  private windowHeight = window.innerHeight;

  public beforeRouteEnter(to: Route, from: Route, next: (to?: RawLocation) => void) {
    if (to.hash.startsWith('#!/')) {
      return next({ path: to.hash.substring(2), replace: true });
    }

    next();
  }

  private onResize() {
    this.windowHeight = window.innerHeight;
  }
}
</script>
