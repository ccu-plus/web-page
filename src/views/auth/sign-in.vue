<template>
  <v-layout justify-space-around>
    <v-flex xs11 sm9 md7 lg5 xl3>
      <v-form @submit="submit">
        <p class="display-2 text-xs-center">Juice</p>

        <v-text-field
          v-model="username"
          v-validate="'required|numeric|length:9'"
          data-vv-name="username"
          data-vv-as="帳號"
          :error-messages="$validator.errors.collect('username')"
          hint="單一入口/校友系統"
          label="帳號"
          prepend-icon="fas fa-user"
        ></v-text-field>

        <v-text-field
          v-model="password"
          v-validate="'required'"
          :append-icon="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
          @click:append="passwordVisible = !passwordVisible"
          data-vv-name="password"
          data-vv-as="密碼"
          :error-messages="$validator.errors.collect('password')"
          hint="單一入口/校友系統"
          label="密碼"
          prepend-icon="fas fa-unlock-alt"
          :type="passwordVisible ? 'text' : 'password'"
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
            <span class="ml-2">登入</span>
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
  Guest,
  Current,
  Alumni,
  Migrate
}

@Component
export default class SignIn extends Mixins(FormMixin) {
  status: Status = Status.Guest;

  username: string = "";

  password: string = "";

  passwordVisible: boolean = false;

  nickname: string = "";

  email: string = "";

  async submit(event: Event) {
    event.preventDefault();

    if (!(await this.$validator.validateAll())) {
      return;
    }
  }
}
</script>
