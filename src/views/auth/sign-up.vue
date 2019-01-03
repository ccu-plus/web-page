<template>
  <v-layout justify-space-around>
    <v-flex xs11 sm9 md7 lg5 xl3>
      <v-form @submit="submit">
        <p class="display-2 text-xs-center">Juice</p>

        <v-text-field
          v-model="username"
          v-validate="'required|numeric|length:9'"
          data-vv-name="username"
          data-vv-as="單一入口帳號"
          :error-messages="$validator.errors.collect('username')"
          label="單一入口帳號*"
          prepend-icon="fas fa-user"
        ></v-text-field>

        <v-text-field
          v-model="password"
          v-validate="'required'"
          :append-icon="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
          @click:append="passwordVisible = !passwordVisible"
          data-vv-name="password"
          data-vv-as="單一入口密碼"
          :error-messages="$validator.errors.collect('password')"
          label="單一入口密碼*"
          prepend-icon="fas fa-unlock-alt"
          :type="passwordVisible ? 'text' : 'password'"
        ></v-text-field>

        <v-text-field
          v-model="nickname"
          v-validate="'required|length:3,12'"
          data-vv-name="nickname"
          data-vv-as="暱稱"
          :error-messages="$validator.errors.collect('nickname')"
          label="暱稱*"
          prepend-icon="far fa-id-card"
        ></v-text-field>

        <v-text-field
          v-model="email"
          v-validate="'email'"
          data-vv-name="email"
          data-vv-as="信箱"
          :error-messages="$validator.errors.collect('email')"
          label="信箱"
          prepend-icon="fas fa-envelope"
        ></v-text-field>

        <div class="mt-3 text-xs-center">
          <v-btn
            block
            color="success"
            :disabled="isFormInvalid"
            :loading="false"
            type="submit"
          >
            <v-icon small>fas fa-sign-in-alt</v-icon>
            <span class="ml-2">註冊</span>
          </v-btn>
        </div>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import FormMixin from "@/mixins/form.ts";

@Component
export default class SignUp extends Mixins(FormMixin) {
  username: string = "";

  password: string = "";

  nickname: string = "";

  email: string = "";

  passwordVisible: boolean = false;

  async submit(event: Event) {
    event.preventDefault();

    if (!(await this.$validator.validateAll())) {
      return;
    }
  }
}
</script>
