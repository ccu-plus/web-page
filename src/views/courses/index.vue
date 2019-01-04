<template>
  <v-layout justify-space-around>
    <v-flex xs11 sm9 md7>
      <v-form @submit="submit">
        <v-container>
          <v-layout wrap>
            <v-flex xs12 md3>
              <v-select
                v-model="college"
                hide-details
                :items="[
                  '學院',
                  '文學院',
                  '理學院',
                  '社會科學學院',
                  '工學院',
                  '管理學院',
                  '法學院',
                  '教育學院',
                  '其他'
                ]"
                label="學院"
              ></v-select>
            </v-flex>

            <v-flex xs12 md3>
              <v-text-field hide-details label="系所"></v-text-field>
            </v-flex>

            <v-flex xs12 md4>
              <v-text-field
                v-model="keyword"
                v-validate="'max:16'"
                data-vv-name="keyword"
                data-vv-as="搜尋字詞"
                :error-messages="$validator.errors.collect('keyword')"
                label="課程名稱、代碼/教授姓名"
              >
              </v-text-field>
            </v-flex>

            <v-flex xs12 md2>
              <v-btn
                :block="$vuetify.breakpoint.smAndDown"
                color="success"
                :disabled="isFormInvalid"
              >
                <v-icon>search</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import FormMixin from "@/mixins/form.ts";

@Component
export default class Courses extends Mixins(FormMixin) {
  college: string = "";

  department: string = "";

  keyword: string = "";

  submit() {
    return 1;
  }
}
</script>

<style lang="scss" scoped></style>
