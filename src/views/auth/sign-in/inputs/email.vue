<template>
  <validation-provider
    v-slot="{ errors }"
    name="信箱"
    rules="required|email"
    slim
  >
    <v-text-field
      v-model="$attrs.value"
      @input="$emit('input', $attrs.value)"
      :error-messages="errors"
      label="信箱"
      :prepend-icon="prependIcon"
      required
      type="email"
    />
  </validation-provider>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mdiEmail } from '@mdi/js';
import { ValidationProvider } from '@/libs/validate';

@Component({
  components: {
    ValidationProvider,
  },
})
export default class Email extends Vue {
  private prependIcon = mdiEmail;
}
</script>
