<template>
  <validation-provider
    v-slot="{ errors }"
    name="帳號"
    rules="required|max:10|min:9"
    slim
  >
    <v-text-field
      v-model="$attrs.value"
      @click:append="visible = !visible"
      @input="$emit('input', $attrs.value)"
      :append-icon="appendIcon"
      autofocus
      :disabled="disabled"
      :error-messages="errors"
      :label="label"
      maxlength="10"
      minlength="9"
      :prepend-icon="prependIcon"
      required
      :type="inputType"
    />
  </validation-provider>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { mdiAccountBox, mdiEye, mdiEyeOff } from '@mdi/js';
import { ValidationProvider } from '@/libs/validate';

@Component({
  components: {
    ValidationProvider,
  },
})
export default class Username extends Vue {
  @Prop({ default: false }) private readonly disabled!: boolean;

  @Prop({ required: true }) private readonly type!: string;

  private prependIcon = mdiAccountBox;

  private visible = false;

  get appendIcon() {
    if (!this.isAlumni) {
      return undefined;
    }

    return this.visible ? mdiEyeOff : mdiEye;
  }

  get inputType() {
    return this.isAlumni && !this.visible ? 'password' : 'text';
  }

  get label() {
    return this.isAlumni ? '校友系統帳號' : '單一入口帳號';
  }

  get isAlumni() {
    return this.type === 'alumni';
  }
}
</script>
