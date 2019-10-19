<template>
  <div>
    <heading-section class="mb-4" />

    <error-alert :code="error" :messages="errorBag" />

    <validation-observer v-slot="{ invalid, passes }" slim>
      <v-form @submit.prevent="passes(submit)">
        <input-username
          v-model="form.username"
          @input="detectType"
          :disabled="!isSignIn"
          :type="form.type"
        />

        <input-password
          v-model="form.password"
          :disabled="!isSignIn"
          :type="form.type"
        />

        <v-expand-transition>
          <div v-if="!isSignIn">
            <p class="mt-2 headline text-center">歡迎使用 CCU PLUS，就差一步囉！</p>

            <input-nickname v-model="form.nickname" />

            <input-email v-model="form.email" />
          </div>
        </v-expand-transition>

        <captcha-input
          v-if="isSignIn"
          v-model="form.captcha"
          @nonce="(val) => (form.nonce = val)"
          :refresh="submits"
        />

        <input-identify
          v-model="form.type"
          :class="isSignIn ? 'mt-2' : 'mt-0'"
          :disabled="!isSignIn"
        />

        <div class="mt-3 text-center">
          <v-btn
            block
            color="success"
            :disabled="error === 403 || invalid"
            :loading="loading"
            type="submit"
          >
            <v-icon small>{{ submitIcon }}</v-icon>
            <span class="ml-1">{{ isSignIn ? '登入' : '註冊' }}</span>
          </v-btn>
        </div>
      </v-form>
    </validation-observer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from '@/libs/axios';
import CaptchaInput from '@/components/captcha-input.vue';
import ErrorAlert from '@/views/auth/sign-in/error-alert.vue';
import HeadingSection from '@/views/auth/sign-in/heading-section.vue';
import InputUsername from '@/views/auth/sign-in/inputs/username.vue';
import InputPassword from '@/views/auth/sign-in/inputs/password.vue';
import InputNickname from '@/views/auth/sign-in/inputs/nickname.vue';
import InputEmail from '@/views/auth/sign-in/inputs/email.vue';
import InputIdentify from '@/views/auth/sign-in/inputs/identify.vue';
import { mdiAccountPlus, mdiLogin } from '@mdi/js';
import pick from 'lodash/pick';
import { ValidationObserver } from '@/libs/validate';

@Component({
  components: {
    CaptchaInput,
    ErrorAlert,
    HeadingSection,
    InputUsername,
    InputPassword,
    InputNickname,
    InputEmail,
    InputIdentify,
    ValidationObserver,
  },
})
export default class SignIn extends Vue {
  private error = 0;

  private errorBag = {};

  private form = {
    username: '',
    password: '',
    nickname: '',
    email: '',
    type: 'portal',
    nonce: '',
    captcha: '',
    token: '',
  };

  private isSignIn = true;

  private loading = false;

  private submits = 0;

  get submitIcon() {
    return this.isSignIn ? mdiLogin : mdiAccountPlus;
  }

  private detectType() {
    if (this.form.username.match(/^[A-Z][12]\d+$/)) {
      this.form.type = 'alumni';
    } else if (this.form.username.match(/^\d+$/)) {
      this.form.type = 'portal';
    }
  }

  private async submit() {
    this.loading = true;

    await (this.isSignIn ? this.signIn() : this.signUp());

    ++this.submits;
  }

  private async signIn() {
    const { data: { data }, status } = await axios.post('/auth/sign-in', {
      captcha: `${this.form.nonce}.${this.form.captcha}`,
      ...pick(this.form, ['username', 'password', 'type']),
    });

    if (status === 400 || status === 401 || status === 422) {
      this.error = status;

      if (status === 422) {
        this.errorBag = data;
      }
    } else if (status === 200) {
      if (data.signedUp) {
        return this.signedIn(data.token);
      }

      this.error = 0;
      this.isSignIn = false;
      this.form.token = data.token;
    } else {
      this.error = 500;
    }

    this.loading = false;
  }

  private async signUp() {
    const { data: { data }, status } = await axios.post(
      '/auth/sign-up',
      pick(this.form, ['nickname', 'email', 'token']),
    );

    if (status === 200) {
      return this.signedIn(data.token);
    } else if (status === 403) {
      this.error = status;
    } else if (status === 422) {
      this.error = status;
      this.errorBag = data;
    } else {
      this.error = 500;
    }

    this.loading = false;
  }

  private signedIn(token: string) {
    axios.defaults.headers.common['Api-Token'] = token;

    localStorage.setItem('api-token', token);

    this.$store.commit('setSignIn', true);

    return this.$router.push({ name: 'courses' });
  }
}
</script>
