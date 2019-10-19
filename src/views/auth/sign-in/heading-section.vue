<template>
  <v-row align="center" class="mb-4" justify="center">
    <div>
      <v-img
        alt="CCU PLUS LOGO"
        eager
        height="50"
        :src="require('@/assets/logo.svg')"
        width="50"
      />
    </div>

    <span class="ml-3 display-2">CCU PLUS</span>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class HeadingSection extends Vue {
  //
}
</script>
