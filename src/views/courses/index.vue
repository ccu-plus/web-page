<template>
  <v-layout justify-space-around>
    <v-flex xs11 sm9 md7>
      <v-form @submit="submit">
        <v-container>
          <v-layout wrap>
            <v-flex xs12 md3>
              <v-select
                v-model="college"
                clearable
                hide-details
                :items="collegeItems"
                label="學院"
                @change="department = ''"
              ></v-select>
            </v-flex>

            <v-flex xs12 md3>
              <v-select
                v-model="department"
                clearable
                hide-details
                :items="departmentItems"
                label="系所"
              ></v-select>
            </v-flex>

            <v-flex xs12 md4>
              <v-text-field
                v-model="keyword"
                v-validate="'max:16'"
                data-vv-name="keyword"
                data-vv-as="搜尋字詞"
                :error-messages="$validator.errors.collect('keyword')"
                label="課程名稱、代碼/授課教授"
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
import CollegeList from "./colleges";
import { Component, Mixins } from "vue-property-decorator";
import DepartmentList from "./departments";
import FormMixin from "@/mixins/form";

@Component
export default class Courses extends Mixins(FormMixin) {
  college: string = "";

  department: string = "";

  keyword: string = "";

  get collegeItems() {
    return CollegeList;
  }

  get departmentItems() {
    return DepartmentList[this.college] || [];
  }

  submit() {
    return 1;
  }
}
</script>

<style lang="scss" scoped></style>
