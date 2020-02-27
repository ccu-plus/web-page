<template>
  <div>
    <div class="d-inline-block" :style="`vertical-align: ${collapse ? 'middle' : 'top'};`">
      <v-btn @click="collapse = !collapse" class="d-block" icon>
        <v-icon v-if="collapse">{{ icons.mdiChevronRight }}</v-icon>
        <v-icon v-else>{{ icons.mdiChevronDown }}</v-icon>
      </v-btn>

      <v-tooltip v-if="!collapse" v-model="tooltip" top>
        <template v-slot:activator="{}">
          <v-btn
            @click.prevent="copy"
            :href="`#comment-${order}`"
            icon
          >
            <v-icon small>{{ icons.mdiShareVariant }}</v-icon>
          </v-btn>
        </template>

        <span>已複製！</span>
      </v-tooltip>
    </div>

    <div v-if="collapse" class="d-inline-block" style="vertical-align: middle;">
      <span class="grey--text text--darken-2">{{ comment.user || '匿名'}}</span>
      <span class="mx-1 grey--text text--lighten-1">·</span>
      <span class="grey--text">{{ comment.commented_at }}</span>
    </div>

    <v-card
      :class="collapse ? 'd-none' : 'd-inline-block'"
      :outlined="!mentioned"
      :raised="mentioned"
      tag="section"
      :tile="!root"
      width="calc(100% - 36px)"
    >
      <v-card-title class="subtitle-1">
        <span class="cyan--text text--darken-2">{{ comment.user || '匿名' }}</span>

        <comment-form
          v-if="$store.state.signIn"
          @created="comment.comments.push($event)"
          :reply="comment.token"
          :replyTo="comment.user || '匿名'"
        >
          <v-btn class="ml-2" icon small>
            <v-icon>{{ icons.mdiReply }}</v-icon>
          </v-btn>
        </comment-form>

        <div class="flex-grow-1" />

        <template v-if="comment.professor">
          <span class="grey--text text--darken-1">受評教授：{{ comment.professor }}</span>

          <span class="mx-2 grey--text text--lighten-1">·</span>
        </template>

        <span class="grey--text">{{ comment.commented_at }}</span>
      </v-card-title>

      <v-divider />

      <v-card-text v-if="comment.deleted">
        <em class="grey--text">應教授或第三方要求，此評論已被刪除</em>
      </v-card-text>

      <v-card-text v-else class="comment-content">{{ comment.content.trim() }}</v-card-text>
    </v-card>

    <comment
      v-if="comment.comments.length"
      v-for="(subComment, idx) in comment.comments"
      :class="collapse ? 'd-none' : 'mt-2'"
      :comment="subComment"
      :key="idx"
      :order="`${order}-${(comment.comments.length - idx).toString(10)}`"
      :root="false"
      style="margin-left: 36px; border-top: none; border-right: none; border-bottom: none;"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import CommentForm from './form.vue';
import Copy from 'copy-to-clipboard';
import { mdiChevronDown, mdiChevronRight, mdiReply, mdiShareVariant } from '@mdi/js';

@Component({
  name: 'Comment',
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
    token: string;
  };

  @Prop({ required: true }) private readonly order!: string;

  @Prop({ default: true }) private readonly root!: boolean;

  private collapse = false;

  private icons = {
    mdiChevronDown,
    mdiChevronRight,
    mdiReply,
    mdiShareVariant,
  };

  private tooltip = false;

  private tooltipTimeoutID = 0;

  get mentioned() {
    const hash = this.$route.hash;

    return hash.substring(hash.indexOf('-') + 1 ) === this.order;
  }

  private copy() {
    window.clearTimeout(this.tooltipTimeoutID);

    this.tooltip = false;

    Copy(`${location.origin}${this.$route.path}#comment-${this.order}`, {
      format: 'text/plain',
    });

    requestAnimationFrame(() => {
      this.tooltip = true;

      this.tooltipTimeoutID = window.setTimeout(() => this.tooltip = false, 1500);
    });
  }

  private async mounted() {
    if (!this.mentioned) {
      return;
    }

    // @ts-ignore
    const offsetY: number = await this.$vuetify.goTo(this, { offset: 60 });

    if (Math.abs(window.pageYOffset - offsetY) > 10) {
      window.scrollTo(0, offsetY);
    }
  }
}
</script>

<style lang="scss">
.comment-content {
  user-select: none;
  white-space: pre-line;
}
</style>
