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
          v-model="form.username"
          @click:append="usernameVisible = !usernameVisible"
          @input="detectType"
          :append-icon="form.type === 'alumni' ? (usernameVisible ? icons.mdiEyeOff : icons.mdiEye) : undefined"
          autofocus
          :disabled="isSignUp"
          :error-messages="errors"
          :label="form.type === 'alumni' ? '校友系統帳號' : '單一入口帳號'"
          maxlength="10"
          minlength="9"
          :prepend-icon="icons.mdiAccountBox"
          required
          :type="(form.type === 'alumni' && !usernameVisible) ? 'password' : 'text'"
        />
      </validation-provider>

      <validation-provider
        v-slot="{ errors }"
        name="密碼"
        rules="required"
        slim
      >
        <v-text-field
          v-model="form.password"
          @click:append="passwordVisible = !passwordVisible"
          :append-icon="passwordVisible ? icons.mdiEyeOff : icons.mdiEye"
          :disabled="isSignUp"
          :error-messages="errors"
          :label="form.type === 'alumni' ? '校友系統密碼' : '單一入口密碼'"
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
              v-model="form.nickname"
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
              v-model="form.email"
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
        v-slot="{ errors }"
        class="d-flex align-center"
        name="驗證碼"
        rules="required|digits:5"
        tag="div"
      >
        <img
          v-if="captcha.data"
          @click="() => {fetchCaptcha(); $refs.captcha.focus()}"
          :alt="captcha.nonce"
          :src="captcha.data"
          style="cursor: pointer;"
        />

        <v-text-field
          v-model="form.captcha"
          class="ml-2"
          :error-messages="errors"
          hide-details
          label="驗證碼"
          maxlength="5"
          minlength="5"
          ref="captcha"
          required
        />
      </validation-provider>

      <validation-provider
        v-slot="{ errors }"
        name="登入身份"
        rules="required|oneOf:portal,alumni"
        slim
      >
        <v-radio-group
          v-model="form.type"
          :disabled="isSignUp"
          :error-messages="errors"
          hide-details
          label="登入身份"
          row
        >
          <v-radio label="在校生" value="portal"></v-radio>
          <v-radio label="校友" value="alumni"></v-radio>
        </v-radio-group>
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
import {
  mdiAccountBox,
  mdiAccountCardDetails,
  mdiAccountPlus,
  mdiEmail,
  mdiEye,
  mdiEyeOff,
  mdiLock,
  mdiLogin,
} from '@mdi/js';

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
  private captcha = {};

  private form = {
    username: '',
    password: '',
    nickname: '',
    email: '',
    type: 'portal',
    captcha: '',
  };

  private icons = {
    mdiAccountBox,
    mdiAccountCardDetails,
    mdiAccountPlus,
    mdiEmail,
    mdiEye,
    mdiEyeOff,
    mdiLock,
    mdiLogin,
  };

  private passwordVisible = false;

  private status: Status = Status.SignIn;

  private usernameVisible = false;

  get isSignIn() {
    return this.status === Status.SignIn;
  }

  get isSignUp() {
    return this.status === Status.SignUp;
  }

  private detectType() {
    if (this.form.username.match(/^[A-Z][12]\d+$/)) {
      this.form.type = 'alumni';
    } else if (this.form.username.match(/^\d+$/)) {
      this.form.type = 'portal';
    }
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

  private async fetchCaptcha() {
    const { data } = await axios.get('/captcha');

    this.captcha = data;

    this.form.captcha = '';
  }

  private created() {
    this.fetchCaptcha();
  }
}
</script>
