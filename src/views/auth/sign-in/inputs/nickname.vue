<template>
  <validation-provider
    v-slot="{ errors }"
    name="暱稱"
    rules="required|max:12|min:3"
    slim
  >
    <v-text-field
      v-model="$attrs.value"
      @input="$emit('input', $attrs.value)"
      autofocus
      :error-messages="errors"
      label="暱稱"
      maxlength="12"
      minlength="3"
      :prepend-icon="prependIcon"
      required
    />
  </validation-provider>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mdiAccountCardDetails } from '@mdi/js';
import { ValidationProvider } from '@/libs/validate';

@Component({
  components: {
    ValidationProvider,
  },
})
export default class Nickname extends Vue {
  private prependIcon = mdiAccountCardDetails;
}
</script>
