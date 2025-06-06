<template>
  <not-found v-if="error" />

  <div v-else>
    <v-card
      color="blue-grey darken-1"
      dark
      outlined
    >
      <v-card-text class="d-flex align-center" style="padding: 1.5rem;">
        <section>
          <v-skeleton-loader
            v-if="loading"
            type="sentences"
            width="400"
          />

          <p v-else class="display-1">{{ course.name }}</p>

          <div v-if="!loading" class="title">
            <template v-if="course.dimension">
              <span>{{ course.dimension }}</span>

              <span class="mx-1">·</span>
            </template>

            <span>{{ course.code }}</span>
          </div>
        </section>

        <div class="flex-grow-1" />

        <section class="text-center">
          <v-skeleton-loader v-if="loading" type="text" />

          <span v-else class="d-block display-1">{{ course.credit }}</span>

          <span>學分</span>
        </section>
      </v-card-text>

      <v-divider />

      <v-card-text class="course-info">
        <div class="d-inline-block">
          <h3>
            <v-icon>{{ icons.mdiSchool }}</v-icon>
            <span>授課系所</span>
          </h3>

          <section>
            <v-skeleton-loader v-if="loading" type="text" />

            <span v-else>{{ course.department }}</span>
          </section>
        </div>

        <div class="mx-8 d-inline-block">
          <h3>
            <v-icon>{{ icons.mdiCalendar }}</v-icon>
            <span>授課學期</span>
          </h3>

          <section>
            <v-skeleton-loader v-if="loading" type="text" />

            <span v-else>{{ semester.name }}</span>
          </section>
        </div>

        <div
          v-if="$vuetify.breakpoint.xsOnly"
          class="my-6"
        />

        <div :class="isOvermuch ? 'my-6' : 'd-inline-block'">
          <h3>
            <v-icon>{{ icons.mdiAccountMultiple }}</v-icon>
            <span>授課教授</span>
          </h3>

          <section>
            <v-skeleton-loader v-if="loading" type="text" />

            <template v-else v-for="(name, idx) in semester.professors">
              <span v-if="idx" class="mx-1">·</span>
              <span>{{ name }}</span>
            </template>
          </section>
        </div>
      </v-card-text>

      <v-divider />

      <v-card-text class="course-info">
        <h3>
          <v-icon>{{ icons.mdiHistory }}</v-icon>
          <span>歷史開課學期</span>
        </h3>

        <section>
          <v-skeleton-loader v-if="loading" type="text" />

          <template v-else v-for="({ name }, idx) in course.semesters">
            <span v-if="idx" class="mx-1">·</span>

            <v-btn
              @click="semesterIdx = idx"
              class="pa-0"
              height="20"
              min-width="45"
              text
            >{{ name }}</v-btn>
          </template>
        </section>
      </v-card-text>
    </v-card>

    <v-divider class="mt-6 mb-3" />

    <v-row align="center" no-gutters>
      <h2>
        <v-icon large>{{ icons.mdiCommentText }}</v-icon>
        <span class="ml-2">評論</span>
      </h2>

      <comment-form
        v-if="$store.state.signIn"
        @created="++counter"
        :professors="course.professors"
      >
        <v-btn
          class="ml-3"
          color="success"
          depressed
          small
        >
          <v-icon small>{{ icons.mdiPlus }}</v-icon>
          <span>新增評論</span>
        </v-btn>
      </comment-form>
    </v-row>

    <comments :key="counter" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from '@/libs/axios';
import Comments from './comments.vue';
import CommentForm from './form.vue';
import {
  mdiAccountMultiple,
  mdiCalendar,
  mdiCommentText,
  mdiHistory,
  mdiLibraryBooks,
  mdiOpenInNew,
  mdiPlus,
  mdiSchool,
} from '@mdi/js';
import NotFound from '@/views/errors/404.vue';

@Component({
  components: {
    CommentForm,
    Comments,
    NotFound,
  },
})
export default class Course extends Vue {
  private counter = 0;

  private course: { [key: string]: any } = {};

  private error = false;

  private icons = {
    mdiAccountMultiple,
    mdiCalendar,
    mdiCommentText,
    mdiHistory,
    mdiLibraryBooks,
    mdiOpenInNew,
    mdiPlus,
    mdiSchool,
  };

  private loading = true;

  private semesterIdx = 0;

  get semester() {
    return !this.course.semesters ? {} : this.course.semesters[this.semesterIdx];
  }

  get outlineLink() {
    if (!this.course.code || !this.semester) {
      return undefined;
    }

    const base = 'https://ecourse.ccu.edu.tw/php/Courses_Admin/guest3.php';
    const courseno = `courseno=${this.course.code}_01`;
    const year = `year=${parseInt(this.semester.name, 10)}`;
    const term = `term=${this.semester.name.endsWith('上') ? 1 : 2}`;

    return `${base}?${courseno}&${year}&${term}`;
  }

  get isOvermuch() {
    if (!Object.keys(this.semester).length) {
      return false;
    }

    return this.semester.professors.length > 8;
  }

  private async created() {
    const {
      data: { data },
      status,
    } = await axios.get(`/courses/${this.$route.params.code}`);

    if (status !== 200) {
      this.error = true;
    } else {
      this.course = data;

      document.title = `${this.course.name} ${this.course.code} | CCU PLUS`;

      this.loading = false;
    }
  }
}
</script>

<style lang="scss">
.course-info {
  padding: 1.5rem;

  h3 {
    font-size: 1.2rem;

    span {
      margin-left: 4px;
      vertical-align: middle;
    }
  }

  section {
    margin-top: 1rem;
    font-size: 1rem;
  }
}
</style>
