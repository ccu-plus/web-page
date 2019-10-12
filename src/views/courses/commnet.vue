<template>
  <div>
    <v-btn
      @click="collapse = !collapse"
      icon
      :style="collapse ? undefined : 'vertical-align: top;'"
    >
      <v-icon v-if="collapse">{{ icons.mdiChevronRight }}</v-icon>
      <v-icon v-else>{{ icons.mdiChevronDown }}</v-icon>
    </v-btn>

    <div v-if="collapse" class="d-inline-block">
      <span class="grey--text text--darken-2">{{ comment.user || '匿名'}}</span>
      <span class="mx-1 grey--text text--lighten-1">·</span>
      <span class="grey--text">{{ comment.commented_at }}</span>
    </div>

    <v-card
      :class="collapse ? 'd-none' : 'd-inline-block'"
      outlined
      tag="section"
      :tile="!root"
      width="calc(100% - 36px)"
    >
      <v-card-title class="subtitle-1">
        <span class="cyan--text text--darken-2">{{ comment.user || '匿名' }}</span>

        <comment-form
          v-if="$store.state.signIn"
          :reply="comment.user || '匿名'"
        >
          <v-btn class="ml-2" icon small>
            <v-icon>{{ icons.mdiReply }}</v-icon>
          </v-btn>
        </comment-form>

        <div class="flex-grow-1" />

        <span
          v-if="comment.professor"
          class="grey--text text--darken-1"
        >受評教授：{{ comment.professor }}</span>

        <span class="mx-2 grey--text text--lighten-1">·</span>

        <span class="grey--text">{{ comment.commented_at }}</span>
      </v-card-title>

      <v-divider />

      <v-card-text v-if="comment.deleted">應教授或第三方要求，此評論已被刪除</v-card-text>

      <v-card-text v-else class="comment-content">{{ comment.content.trim() }}</v-card-text>
    </v-card>

    <comment
      v-if="comment.comments.length"
      v-for="(subComment, idx) in comment.comments"
      :class="collapse ? 'd-none' : 'mt-2'"
      :comment="subComment"
      :key="idx"
      :root="false"
      style="margin-left: 36px; border-top: none; border-right: none; border-bottom: none;"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CommentForm from './form.vue';
import { mdiChevronDown, mdiChevronRight, mdiReply } from '@mdi/js';

@Component({
  components: {
    CommentForm,
  },
})
export default class Comment extends Vue {
  @Prop({ required: true }) private readonly comment!: {
    user: string | null;
    professor: string | null;
    content: string | null;
    commented_at: string;
    deleted: boolean;
    comments: [];
  };

  @Prop({ default: true }) private readonly root!: boolean;

  private collapse = false;

  private icons = {
    mdiChevronDown,
    mdiChevronRight,
    mdiReply,
  };
}
</script>

<style lang="scss">
.comment-content {
  user-select: none;
  white-space: pre-line;
}
</style>
