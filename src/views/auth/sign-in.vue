<template>
  <v-layout justify-space-around>
    <v-flex xs11 sm9 md7 lg5 xl3>
      <v-form @submit="submit">
        <p class="display-2 text-xs-center">Juice</p>

        <v-text-field
          v-model="username"
          v-validate="'required|length:9,10'"
          autofocus
          data-vv-name="username"
          data-vv-as="帳號"
          :disabled="isSignUp"
          :error-messages="$validator.errors.collect('username')"
          label="單一入口/校友系統帳號"
          maxlength="10"
          minlength="9"
          prepend-icon="fas fa-user"
        ></v-text-field>

        <v-text-field
          v-model="password"
          v-validate="'required'"
          :append-icon="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
          @click:append="passwordVisible = !passwordVisible"
          data-vv-name="password"
          data-vv-as="密碼"
          :disabled="isSignUp"
          :error-messages="$validator.errors.collect('password')"
          label="單一入口/校友系統密碼"
          prepend-icon="fas fa-unlock-alt"
          :type="passwordVisible ? 'text' : 'password'"
        ></v-text-field>

        <v-expand-transition>
          <div v-if="isSignUp">
            <p class="mt-2 subheading text-xs-center">
              歡迎使用 CCU PLUS，就差一步囉！
            </p>

            <v-text-field
              v-model="nickname"
              v-validate="'required|length:3,12'"
              autofocus
              data-vv-name="nickname"
              data-vv-as="暱稱"
              :error-messages="$validator.errors.collect('nickname')"
              label="暱稱"
              maxlength="12"
              minlength="3"
              prepend-icon="far fa-id-card"
            ></v-text-field>

            <v-text-field
              v-model="email"
              v-validate="'required|email'"
              data-vv-name="email"
              data-vv-as="信箱"
              :error-messages="$validator.errors.collect('email')"
              label="信箱"
              prepend-icon="fas fa-envelope"
              type="email"
            ></v-text-field>
          </div>
        </v-expand-transition>

        <div class="mt-3 text-xs-center">
          <v-btn
            block
            color="success"
            :disabled="isFormInvalid"
            :loading="false"
            type="submit"
          >
            <template v-if="isSignIn">
              <v-icon small>fas fa-sign-in-alt</v-icon>
              <span class="ml-2">登入</span>
            </template>

            <template v-else-if="isSignUp">
              <v-icon small>fas fa-user-plus</v-icon>
              <span class="ml-2">註冊</span>
            </template>
          </v-btn>
        </div>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import FormMixin from "@/mixins/form.ts";

enum Status {
  SignIn,
  SignUp,
  Alumni,
  Migration
}

@Component
export default class SignIn extends Mixins(FormMixin) {
  status: Status = Status.SignIn;

  username: string = "";

  password: string = "";

  passwordVisible: boolean = false;

  nickname: string = "";

  email: string = "";

  get isSignIn() {
    return this.status === Status.SignIn;
  }

  get isSignUp() {
    return this.status === Status.SignUp;
  }

  async submit(event: Event) {
    event.preventDefault();

    if (!(await this.$validator.validateAll())) {
      return;
    }

    this.signIn();

    this.status = Status.SignUp;
  }

  signIn() {
    //
  }

  signUp() {
    //
  }
}
</script>
