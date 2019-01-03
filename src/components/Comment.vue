<template>
  <div>
    <h3>this comment {{ isSubComment ? "is" : "is not" }} sub comment</h3>
    <p>author is {{ author || "anonumous" }}</p>
    <p>content is {{ content }}</p>
    <p>post at {{ postAt }}</p>
    <v-btn>wow</v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Comment extends Vue {
  @Prop({ type: String, default: null }) private author!: string | null;

  @Prop({ type: String, required: true }) private content!: string;

  @Prop({ type: String, required: true }) private postAt!: string;

  @Prop({ type: Boolean, required: true }) private isSubComment!: boolean;

  get isAnonymous() {
    if (typeof this.author !== "string") {
      return true;
    }

    return this.author.length === 0;
  }
}
</script>

<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

p {
  margin-top: 1rem;
}
</style>
