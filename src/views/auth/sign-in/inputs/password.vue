<template>
  <validation-provider
    v-slot="{ errors }"
    name="密碼"
    rules="required"
    slim
  >
    <v-text-field
      v-model="$attrs.value"
      @click:append="visible = !visible"
      @input="$emit('input', $attrs.value)"
      :append-icon="appendIcon"
      :disabled="disabled"
      :error-messages="errors"
      :label="label"
      :prepend-icon="prependIcon"
      required
      :type="inputType"
    />
  </validation-provider>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { mdiEye, mdiEyeOff, mdiLock } from '@mdi/js';
import { ValidationProvider } from '@/libs/validate';

@Component({
  components: {
    ValidationProvider,
  },
})
export default class Password extends Vue {
  @Prop({ default: false }) private readonly disabled!: boolean;

  @Prop({ required: true }) private readonly type!: string;

  private prependIcon = mdiLock;

  private visible = false;

  get appendIcon() {
    return this.visible ? mdiEyeOff : mdiEye;
  }

  get inputType() {
    return this.visible ? 'text' : 'password';
  }

  get label() {
    return this.type === 'alumni' ? '校友系統密碼' : '單一入口密碼';
  }
}
</script>
