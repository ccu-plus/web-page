<template>
  <validation-provider
    v-slot="{ errors }"
    class="d-flex align-center"
    name="驗證碼"
    rules="required|digits:5"
    tag="div"
  >
    <captcha
      @click="() => $refs.input.focus()"
      @nonce="(val) => $emit('nonce', val)"
      :update="refresh"
    />

    <v-text-field
      v-model="secret"
      @focus="(event) => event.target.select()"
      @input="(val) => $emit('input', val)"
      class="ml-2 mt-0"
      :error-messages="errors"
      hide-details
      label="驗證碼"
      maxlength="5"
      minlength="5"
      ref="input"
      required
    />
  </validation-provider>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import Captcha from '@/components/captcha.vue';
import { ValidationProvider } from '@/libs/validate';

@Component({
  components: {
    Captcha,
    ValidationProvider,
  },
})
export default class CaptchaInput extends Vue {
  @Prop() private readonly refresh!: any;

  private secret = '';
}
</script>
