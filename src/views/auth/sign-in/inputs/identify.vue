<template>
  <validation-provider
    v-slot="{ errors }"
    name="登入身份"
    rules="required|oneOf:portal,alumni"
    slim
  >
    <v-radio-group
      v-model="$attrs.value"
      @change="$emit('input', $attrs.value)"
      :disabled="disabled"
      :error-messages="errors"
      :hint="hint"
      label="登入身份"
      persistent-hint
      row
    >
      <v-radio label="在校生" value="portal" />

      <v-radio label="校友" value="alumni" />
    </v-radio-group>
  </validation-provider>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ValidationProvider } from '@/libs/validate';

@Component({
  components: {
    ValidationProvider,
  },
})
export default class Identify extends Vue {
  @Prop({ default: false }) private readonly disabled!: boolean;

  get hint() {
    return `將透過 ${this.url} 驗證身份`;
  }

  get url() {
    return this.$attrs.value === 'portal'
      ? 'https://portal.ccu.edu.tw'
      : 'https://miswww1.ccu.edu.tw/alumni/alumni/';
  }
}
</script>
