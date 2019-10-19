<template>
  <v-alert
    v-model="alert"
    dismissible
    type="error"
  >
    <span v-if="code === 401">帳號或密碼錯誤</span>

    <span v-else-if="code === 403">頁面逾時，請重新整理網頁</span>

    <ul v-else-if="code === 422">
      <li v-for="msg in messages">{{ msg }}</li>
    </ul>

    <template v-else>
      <span>{{ code === 400 ? '驗證伺服器' : '伺服器內部' }}</span>

      <span class="mr-1">錯誤，請私訊粉絲專頁</span>

      <a
        class="grey--text text--lighten-5"
        href="https://fb.me/ccu.plus"
        rel="noopener noreferrer"
        target="_blank"
      >fb.me/ccu.plus</a>

      <span class="mx-1">或聯繫</span>

      <a
        class="grey--text text--lighten-5"
        href="mailto:support@ccu.plus"
      >support@ccu.plus</a>
    </template>
  </v-alert>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component
export default class ErrorAlert extends Vue {
  @Prop({ default: 0 }) private readonly code!: number;

  @Prop({ default: () => [] }) private readonly messages!: string[];

  private alert = false;

  @Watch('code') private onCodeChanged() {
    this.alert = this.code > 0;
  }
}
</script>
