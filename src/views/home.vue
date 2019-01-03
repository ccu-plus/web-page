<template>
  <div v-resize="onResize" class="home">
    <v-parallax
      class="cover"
      :height="windowHeight"
      :src="require('../assets/home-cover.jpg')"
    >
      <v-layout align-center column justify-center>
        <div>
          <v-img
            height="230"
            :src="require('../assets/logo.svg')"
            width="230"
          ></v-img>
        </div>
        <h1 class="display-3 mt-3">CCU PLUS</h1>
        <h4 class="headline">猶如在茫茫學海中那道曙光</h4>
      </v-layout>
    </v-parallax>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  windowHeight: number = window.innerHeight;

  onResize() {
    this.windowHeight = window.innerHeight;
  }
}
</script>

<style lang="scss" scoped>
.cover /deep/ img {
  filter: brightness(90%);
}
</style>
