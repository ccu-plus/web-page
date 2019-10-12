<template>
  <validation-observer v-slot="{ invalid, passes }" slim>
    <v-form @submit.prevent="passes(submit)">
      <div class="mb-5 d-flex align-center justify-center">
        <img
          alt="CCU PLUS LOGO"
          height="60"
          :src="require('@/assets/logo.svg')"
        />

        <span class="ml-2 display-2">CCU PLUS</span>
      </div>

      <validation-provider
        v-slot="{ errors }"
        name="帳號"
        rules="required|max:10|min:9"
        slim
      >
        <v-text-field
          v-model="username"
          autofocus
          :disabled="isSignUp"
          :error-messages="errors"
          label="單一入口/校友系統帳號"
          maxlength="10"
          minlength="9"
          :prepend-icon="icons.mdiAccountBox"
          required
        />
      </validation-provider>

      <validation-provider
        v-slot="{ errors }"
        name="密碼"
        rules="required"
        slim
      >
        <v-text-field
          v-model="password"
          :append-icon="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
          @click:append="passwordVisible = !passwordVisible"
          :disabled="isSignUp"
          :error-messages="errors"
          label="單一入口/校友系統密碼"
          :prepend-icon="icons.mdiLock"
          required
          :type="passwordVisible ? 'text' : 'password'"
        />
      </validation-provider>

      <v-expand-transition>
        <div v-if="isSignUp">
          <p class="mt-2 subheading text-center">
            歡迎使用 CCU PLUS，就差一步囉！
          </p>

          <validation-provider
            v-slot="{ errors }"
            name="暱稱"
            rules="required|max:12|min:3"
            slim
          >
            <v-text-field
              v-model="nickname"
              autofocus
              :error-messages="errors"
              label="暱稱"
              maxlength="12"
              minlength="3"
              :prepend-icon="icons.mdiAccountCardDetails"
              required
            />
          </validation-provider>

          <validation-provider
            v-slot="{ errors }"
            name="信箱"
            rules="required|email"
            slim
          >
            <v-text-field
              v-model="email"
              :error-messages="errors"
              label="信箱"
              :prepend-icon="icons.mdiEmail"
              required
              type="email"
            />
          </validation-provider>
        </div>
      </v-expand-transition>

      <validation-provider
        class="d-flex align-center"
        name="驗證碼"
        rules="required|digits:5"
        tag="div"
      >
        <img
          v-if="captcha.data"
          @click="getCaptcha"
          :alt="captcha.nonce"
          :src="captcha.data"
          style="cursor: pointer;"
        />

        <v-text-field
          v-model="secret"
          class="ml-2"
          hide-details
          label="驗證碼"
          maxlength="5"
          minlength="5"
          required
        />
      </validation-provider>

      <div class="mt-3 text-center">
        <v-btn
          block
          color="success"
          :disabled="invalid"
          :loading="false"
          type="submit"
        >
          <template v-if="isSignIn">
            <v-icon small>{{ icons.mdiLogin }}</v-icon>
            <span class="ml-1">登入</span>
          </template>

          <template v-else-if="isSignUp">
            <v-icon small>{{ icons.mdiAccountPlus }}</v-icon>
            <span class="ml-1">註冊</span>
          </template>
        </v-btn>
      </div>
    </v-form>
  </validation-observer>
</template>

<script lang="ts">
import axios from '@/libs/axios';
import { Component, Vue } from 'vue-property-decorator';
import { ValidationProvider, ValidationObserver } from '@/libs/validate';
import { mdiAccountBox, mdiAccountCardDetails, mdiAccountPlus, mdiEmail, mdiLock, mdiLogin } from '@mdi/js';

enum Status {
  SignIn,
  SignUp,
}

@Component({
  components: {
    ValidationProvider,
    ValidationObserver,
  },
})
export default class SignIn extends Vue {
  private icons = {
    mdiAccountBox,
    mdiAccountCardDetails,
    mdiAccountPlus,
    mdiEmail,
    mdiLock,
    mdiLogin,
  };

  private status: Status = Status.SignIn;

  private username = '';

  private password = '';

  private passwordVisible = false;

  private nickname = '';

  private email = '';

  private secret = '';

  private captcha = {};

  get isSignIn() {
    return this.status === Status.SignIn;
  }

  get isSignUp() {
    return this.status === Status.SignUp;
  }

  private async submit() {
    if (this.isSignIn) {
      this.signIn();
    } else if (this.isSignUp) {
      this.signUp();
    }
  }

  private signIn() {
    // axios.post('/auth/sign-in');

    this.status = Status.SignUp;
  }

  private signUp() {
    //
  }

  private async getCaptcha() {
    const { data } = await axios.get('/captcha');

    this.captcha = data;

    this.secret = '';
  }

  private created() {
    this.getCaptcha();
  }
}
</script>
