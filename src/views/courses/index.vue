<template>
  <div>
    <validation-observer
      v-slot="{ invalid }"
      @submit.prevent="submit"
      class="row"
      tag="form"
    >
      <v-col cols="12" md="2">
        <v-select
          v-model="form.college"
          @change="form.department = form.dimension = ''"
          clearable
          :disabled="loading"
          hide-details
          :items="lists.colleges"
          label="學院"
          menu-props="offsetY"
        />
      </v-col>

      <v-col cols="12" md="3">
        <v-select
          v-model="form.department"
          @change="form.dimension = ''"
          clearable
          :disabled="loading"
          hide-details
          :items="lists.departments"
          label="系所"
          menu-props="offsetY"
        />
      </v-col>

      <v-col cols="12" md="3">
        <v-select
          v-model="form.dimension"
          clearable
          :disabled="loading || form.department !== '通識教育中心'"
          hide-details
          :items="lists.dimensions"
          label="向度"
          menu-props="offsetY"
        />
      </v-col>

      <v-col cols="12" md="3">
        <validation-provider
          v-slot="{ errors }"
          name="搜尋字詞"
          rules="max:16"
          slim
        >
          <v-text-field
            v-model="form.keyword"
            clearable
            :disabled="loading"
            :error-messages="errors"
            hide-details
            label="課程名稱、代碼/授課教授"
            maxlength="16"
          />
        </validation-provider>
      </v-col>

      <v-col cols="12" md="1">
        <v-btn
          block
          color="success"
          :disabled="invalid"
          :large="$vuetify.breakpoint.mdAndUp"
          :loading="loading"
          type="submit"
        >
          <v-icon>{{ icons.mdiMagnify }}</v-icon>
        </v-btn>
      </v-col>
    </validation-observer>

    <v-data-table
      class="elevation-1 mt-3"
      disable-pagination
      disable-sort
      :headers="headers"
      hide-default-footer
      :hide-default-header="$vuetify.breakpoint.xsOnly"
      :items="$store.state.courses"
      :loading="loading"
      no-data-text="探索，帶來無限可能"
    >
      <template v-slot:item.recently="{ item: { recently } }">
        <v-icon v-if="recently" color="green">{{ icons.mdiNewBox }}</v-icon>
      </template>

      <template v-slot:item.code="{ item: { code, dimension } }">
        <span class="d-block">{{ code }}</span>
        <span v-if="dimension">{{ dimension }}</span>
      </template>

      <template v-slot:item.name="{ item: { code, name } }">
        <router-link :to="{ name: 'courses.show', params: { code } }">{{ name }}</router-link>
      </template>

      <template v-slot:item.professors="{ item: { professors } }">
        <span
          v-for="professor in professors.slice(0, maxProfessors)"
          class="d-block"
        >{{ professor }}</span>

        <span v-if="professors.length > maxProfessors">……</span>
      </template>

      <template v-if="searched" v-slot:footer>
        <div class="v-data-footer px-4 py-2">
          <a
            class="pt-1"
            href="https://www.algolia.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              alt="Search by algolia"
              :src="require('@/assets/search-by-algolia.svg')"
            >
          </a>
        </div>
      </template>
    </v-data-table>

    <h2 class="headline mt-6">
      <v-icon large>{{ icons.mdiCommentText }}</v-icon>
      <span class="ml-2">最新評論</span>
    </h2>

    <v-card
      v-if="!loaded"
      class="mt-5"
      outlined
      tag="section"
    >
      <v-card-title class="course-skeleton-loader">
        <v-skeleton-loader
          type="text"
          width="8rem"
        />

        <span class="mx-1">-</span>

        <v-skeleton-loader
          type="text"
          width="7rem"
        />

        <span class="mx-2">·</span>

        <v-skeleton-loader
          type="text"
          width="3rem"
        />

        <div class="flex-grow-1" />

        <v-skeleton-loader
          type="text"
          width="8rem"
        />

        <span class="mx-2 grey--text text--lighten-1">·</span>

        <v-skeleton-loader
          type="text"
          width="9.5rem"
        />
      </v-card-title>

      <v-divider />

      <v-card-text>
        <v-skeleton-loader
          max-width="80%"
          type="paragraph"
        />
      </v-card-text>
    </v-card>

    <v-card
      v-for="comment in comments"
      class="mt-5"
      :key="`${comment.course.code}-${comment.commented_at}`"
      outlined
      tag="section"
    >
      <v-card-title class="subtitle-1">
        <router-link :to="{ name: 'courses.show', params: { code: comment.course.code } }">
          <span>{{ comment.course.department }}</span>
          <span class="mx-1">-</span>
          <span>{{ comment.course.name }}</span>
        </router-link>

        <span class="mx-2">·</span>

        <span class="cyan--text text--darken-2">{{ comment.user || '匿名' }}</span>

        <div class="flex-grow-1" />

        <template v-if="comment.professor">
          <span class="grey--text text--darken-1">受評教授：{{ comment.professor }}</span>

          <span class="mx-2 grey--text text--lighten-1">·</span>
        </template>

        <span class="grey--text">{{ comment.commented_at }}</span>
      </v-card-title>

      <v-divider />

      <v-card-text style="user-select: none; white-space: pre-line;">{{ comment.content.trim() }}</v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from '@/libs/axios';
import Colleges from '@/libs/colleges';
import Departments from '@/libs/departments';
import Dimensions from '@/libs/dimensions';
import { mdiCommentText, mdiMagnify, mdiNewBox } from '@mdi/js';
import { ValidationProvider, ValidationObserver } from '@/libs/validate';
import track from '@/libs/track';

@Component({
  components: {
    ValidationProvider,
    ValidationObserver,
  },
})
export default class Courses extends Vue {
  private form: { [key: string]: string } = this.$store.state.search;

  private icons = {
    mdiCommentText,
    mdiMagnify,
    mdiNewBox,
  };

  private loading = false;

  private loaded = true;

  private searched = false;

  get comments() {
    return this.$store.state.comments;
  }

  get headers() {
    const headers = [
      { value: 'recently', align: 'right' },
      { text: '開課系所', value: 'department', align: 'center' },
      { text: '課程代碼', value: 'code', align: 'center' },
      { text: '課程名稱', value: 'name', align: 'left' },
      { text: '授課教授', value: 'professors', align: 'center' },
      { text: '評論數', value: 'comments', align: 'center' },
    ];

    if (this.$vuetify.breakpoint.xsOnly) {
      headers.shift();
    }

    return headers;
  }

  get lists() {
    return {
      colleges: Colleges,
      departments: Departments[this.form.college] || [],
      dimensions: Dimensions,
    };
  }

  get maxProfessors() {
    return this.$vuetify.breakpoint.xsOnly ? 2 : 3;
  }

  private async submit() {
    this.loading = true;

    await this.$store.dispatch('search', this.form);

    track(this.$route.fullPath, {
      type: 'search',
      search: Object.values(this.form).filter((v) => v.length).join(' '),
      count: this.$store.state.courses.length,
    });

    this.loading = false;

    this.searched = true;
  }

  private async created() {
    if (this.comments.length) {
      return;
    }

    this.loaded = false;

    const { data: { data } } = await axios.get('/courses/comments');

    this.$store.commit('setComments', data);

    this.loaded = true;
  }
}
</script>

<style lang="scss">
.course-skeleton-loader {
  .v-skeleton-loader__text {
    border-radius: 1rem;
    height: 1rem;
    margin-bottom: 0;
  }
}
</style>
