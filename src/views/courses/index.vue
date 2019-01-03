<template>
  <v-layout justify-space-around>
    <v-flex xs11 sm9 md7>
      <v-form @submit="submit">
        <v-container>
          <v-layout wrap>
            <v-flex xs12 md3>
              <v-select
                v-model="college"
                :items="['Apple', 'Banana', 'Car']"
                label="學院"
              ></v-select>
            </v-flex>

            <v-flex xs12 md3>
              <v-text-field
                label="系所"

              ></v-text-field>
            </v-flex>

            <v-flex xs12 md4>
              <v-text-field
                label="課程代碼/課程名稱"
              >
              </v-text-field>
            </v-flex>

            <v-flex xs12 md2>
              <v-btn :block="$vuetify.breakpoint.smAndDown" color="success">
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
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  college: string = "";

  department: string = "";

  submit() {
    return 1;
  }
}
</script>

<style lang="scss" scoped></style>
