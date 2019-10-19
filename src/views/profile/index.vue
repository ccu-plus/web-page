<template>
  <div>
    <p>暱稱：{{ profile.nickname }}</p>
    <p>信箱：{{ profile.email }}（{{ profile.verified ? '已驗證' : '尚未驗證' }}）</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Profile extends Vue {
  get profile() {
    return this.$store.state.profile;
  }
}
</script>
