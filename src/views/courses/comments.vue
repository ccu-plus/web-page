<template>
  <article class="mt-4">
    <v-card v-if="loading" outlined>
      <v-skeleton-loader type="table-heading" />

      <v-divider />

      <v-skeleton-loader class="mx-4 mt-4 mb-3" type="paragraph" />
    </v-card>

    <comment
      v-else
      v-for="(comment, idx) in comments"
      :class="idx ? 'mt-6' : undefined"
      :comment="comment"
      :key="idx"
    />

    <v-card v-if="!loading && !comments.length" outlined>
      <v-card-text class="text-center title">
        <span v-if="$store.state.signIn">您上過這堂課嗎？點擊留言按鈕，成為第一位分享者吧！</span>
        <span v-else>目前此課程還沒有評論喔！</span>
      </v-card-text>
    </v-card>
  </article>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from '@/libs/axios';
import Comment from './commnet.vue';

@Component({
  components: {
    Comment,
  },
})
export default class Comments extends Vue {
  private comments = [];

  private error = false;

  private loading = true;

  private async created() {
    const {
      data: { data },
      status,
    } = await axios.get(`/courses/${this.$route.params.code}/comments`);

    if (status !== 200) {
      this.error = true;
    } else {
      this.comments = data;

      this.loading = false;
    }
  }
}
</script>
