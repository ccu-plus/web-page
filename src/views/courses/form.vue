<template>
  <v-dialog
    v-model="dialog"
    max-width="800px"
    no-click-animation
    persistent
  >
    <template v-slot:activator="{ on }">
      <div @click="open">
        <slot />
      </div>
    </template>

    <v-card>
      <v-card-title>
        <span v-if="!reply">新增評論</span>

        <span v-else>回覆「{{ replyTo }}」的評論</span>

        <v-spacer />

        <v-btn @click="dialog = false" icon>
          <v-icon>{{ icons.mdiClose }}</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <validation-observer
          v-slot="{ invalid, passes }"
          ref="observer"
          slim
        >
          <v-form @submit.prevent="passes(submit)">
            <v-select
              v-if="!reply"
              v-model="form.professor"
              :items="professors"
              label="受評教授"
              menu-props="offsetY"
            />

            <v-row v-if="!reply">
              <v-col cols="12" lg="6" class="d-flex align-center pt-0">
                <div>推薦程度</div>

                <v-rating
                    v-model="form.recommended"
                    background-color="orange lighten-3"
                    color="orange"
                    hover
                    length="5"
                />
              </v-col>

              <v-col cols="12" lg="6" class="d-flex align-center pt-0">
                <div>學到東西</div>

                <v-rating
                    v-model="form.informative"
                    background-color="orange lighten-3"
                    color="orange"
                    hover
                    length="5"
                />
              </v-col>

              <v-col cols="12" lg="6" class="d-flex align-center pt-0">
                <div>課程難度</div>

                <v-rating
                    v-model="form.challenging"
                    background-color="orange lighten-3"
                    color="orange"
                    hover
                    length="5"
                />
              </v-col>

              <v-col cols="12" lg="6" class="d-flex align-center pt-0">
                <div>整體評價</div>

                <v-rating
                    v-model="form.overall"
                    background-color="orange lighten-3"
                    color="orange"
                    hover
                    length="5"
                />
              </v-col>
            </v-row>

            <validation-provider
              v-slot="{ errors }"
              name="內容"
              rules="required|min:10|max:10000"
              slim
            >
              <v-textarea
                v-model="form.content"
                auto-grow
                counter
                :error-messages="errors"
                label="內容"
                maxlength="10000"
                minlength="10"
                ref="content"
                required
                rows="10"
              />
            </validation-provider>

            <captcha-input
              v-model="form.captcha"
              @nonce="(val) => (form.nonce = val)"
            />

            <v-btn
              block
              class="mt-4"
              color="success"
              :disabled="invalid"
              :loading="loading"
              type="submit"
            >
              <v-icon small>{{ icons.mdiSend }}</v-icon>
              <span class="ml-1">送出</span>
            </v-btn>
          </v-form>
        </validation-observer>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from '@/libs/axios';
import CaptchaInput from '@/components/captcha-input.vue';
import { mdiClose, mdiHelpCircle, mdiSend } from '@mdi/js';
import pick from 'lodash/pick';
import { ValidationObserver, ValidationProvider } from '@/libs/validate';

@Component({
  components: {
    CaptchaInput,
    ValidationObserver,
    ValidationProvider,
  },
})
export default class CommentForm extends Vue {
  public $refs!: {
    content: HTMLInputElement;
    observer: any;
  };

  @Prop({ default: () => [] }) private readonly professors!: string[];

  @Prop({ default: null }) private readonly reply!: string;

  @Prop({ default: null }) private readonly replyTo!: string;

  private dialog = false;

  private form = {
    content: '',
    recommended: 3,
    informative: 3,
    challenging: 3,
    overall: 3,
    anonymous: true,
    professor: '',
    reply_to: this.reply,
    nonce: '',
    captcha: '',
  };

  private icons = {
    mdiClose,
    mdiHelpCircle,
    mdiSend,
  };

  private loading = false;

  private open() {
    this.dialog = true;

    if (!this.form.professor.length && this.professors.length) {
      this.form.professor = this.professors[0];
    }

    requestAnimationFrame(() => {
      this.$refs.observer.reset();
      this.$refs.content.focus();
    });
  }

  private async submit() {
    const { data: { data }, status} = await axios.post(`/courses/${this.$route.params.code}/comments`, {
      captcha: `${this.form.nonce}.${this.form.captcha}`,
      ...pick(this.form, ['content', 'recommended', 'informative', 'challenging', 'overall', 'anonymous', this.reply ? 'reply_to' : 'professor']),
    });

    if (status === 422) {
      //
    } else if (status === 201) {
      this.$emit('created', data);

      this.dialog = false;
    } else {
      //
    }
  }
}
</script>
