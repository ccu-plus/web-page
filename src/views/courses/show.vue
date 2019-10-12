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

        <div class="d-inline-block">
          <h3>
            <v-icon>{{ icons.mdiLibraryBooks }}</v-icon>
            <span>課程大綱</span>
          </h3>

          <section>
            <v-skeleton-loader v-if="loading" type="text" />

            <v-btn
              v-else
              class="pa-0"
              height="16"
              :href="outlineLink"
              rel="noopener noreferrer"
              target="_blank"
              text
            >
              <span>Ecourse</span>
              <v-icon class="ml-1" small>{{ icons.mdiOpenInNew }}</v-icon>
            </v-btn>
          </section>
        </div>

        <div class="ml-8 d-inline-block">
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

    <h2>
      <v-icon large>{{ icons.mdiCommentText }}</v-icon>
      <span class="ml-2">評論</span>
    </h2>

    <comments />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from '@/libs/axios';
import Comments from './comments.vue';
import { mdiAccountMultiple, mdiCalendar, mdiCommentText, mdiHistory, mdiLibraryBooks, mdiOpenInNew, mdiSchool } from '@mdi/js';
import NotFound from '@/views/errors/404.vue';

@Component({
  components: {
    Comments,
    NotFound,
  },
})
export default class Course extends Vue {
  private course: { [key: string]: any } = {};

  private error = false;

  private icons = {
    mdiAccountMultiple,
    mdiCalendar,
    mdiCommentText,
    mdiHistory,
    mdiLibraryBooks,
    mdiOpenInNew,
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

  private async created() {
    const {
      data: { data },
      status,
    } = await axios.get(`/courses/${this.$route.params.code}`);

    if (status === 200) {
      this.course = data;
      this.loading = false;
    } else {
      this.error = true;
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
