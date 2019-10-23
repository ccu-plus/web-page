<template>
  <div
    @click="$emit('click')"
    class="cursor-pointer d-inline-block"
  >
    <v-img
      @click="refresh"
      :alt="`captcha-${nonce}`"
      contain
      eager
      height="40"
      :src="image"
      :transition="false"
      width="150"
    >
      <v-row
        v-if="loading"
        align="center"
        class="fill-height ma-0 grey lighten-4"
        justify="center"
        style="opacity: .7"
      >
        <v-progress-circular
          color="primary"
          indeterminate
          sie="24"
          width="3"
        />
      </v-row>
    </v-img>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import axios from '@/libs/axios';

@Component
export default class Captcha extends Vue {
  @Prop() private readonly update!: any;

  private error = false;

  private image = '';

  private loading = false;

  private nonce = '';

  private timeoutId = 0;

  @Watch('update') private onValueChanged = this.refresh;

  private async refresh() {
    if (this.loading) {
      return;
    }

    window.clearTimeout(this.timeoutId);

    const { data, status } = await this.fetch();

    if (status !== 200) {
      this.error = true;
    } else {
      this.image = data.data;

      this.$emit('nonce', this.nonce = data.nonce);

      // Captcha 有效期限為 10 分鐘，每十分鐘須更新一次
      this.timeoutId = window.setTimeout(this.refresh, 10 * 60 * 1000);
    }
  }

  private async fetch() {
    this.loading = true;

    const response = await axios.get('/captcha');

    this.loading = false;

    return response;
  }

  private created() {
    this.refresh();
  }

  private beforeDestroy() {
    window.clearTimeout(this.timeoutId);
  }
}
</script>
