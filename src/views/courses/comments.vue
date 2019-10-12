<template>
  <article class="mt-4">
    <comment
      v-for="(comment, idx) in comments"
      :class="idx ? 'mt-6' : undefined"
      :comment="comment"
      :key="idx"
    />
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

  private async created() {
    const {
      data: { data },
      status,
    } = await axios.get(`/courses/${this.$route.params.code}/comments`);

    if (status === 200) {
      this.comments = data;
    } else {
      this.error = true;
    }
  }
}
</script>
