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

        <span v-else>回覆「{{ reply }}」的評論</span>

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

            <validation-provider
              v-slot="{ errors }"
              class="d-flex align-center"
              name="驗證碼"
              rules="required|digits:5"
              tag="div"
            >
              <img
                v-if="captcha.data"
                @click="fetchCaptcha"
                :alt="captcha.nonce"
                :src="captcha.data"
                style="cursor: pointer;"
              />

              <v-text-field
                v-model="form.captcha"
                class="ml-2"
                :error-messages="errors"
                hide-details
                label="驗證碼"
                maxlength="5"
                minlength="5"
                required
              />
            </validation-provider>

            <v-checkbox
              v-model="form.anonymous"
              class="mt-2 mb-4"
              hide-details
              label="匿名評論"
            />

            <v-btn
              block
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
import { mdiClose, mdiSend } from '@mdi/js';
import { ValidationObserver, ValidationProvider } from '@/libs/validate';

@Component({
  components: {
    ValidationObserver,
    ValidationProvider,
  },
})
export default class CommentForm extends Vue {
  public $refs!: {
    content: HTMLInputElement;
    observer: any;
  };

  @Prop({ default: null }) private readonly reply!: string;

  private captcha = {};

  private dialog = false;

  private form = {
    content: '',
    anonymous: false,
    captcha: '',
  };

  private icons = {
    mdiClose,
    mdiSend,
  };

  private loading = false;

  private async fetchCaptcha() {
    const { data } = await axios.get('/captcha');

    this.captcha = data;

    this.form.captcha = '';
  }

  private open() {
    this.fetchCaptcha();

    this.dialog = true;

    requestAnimationFrame(() => {
      this.$refs.observer.reset();
      this.$refs.content.focus();
    });
  }

  private submit() {
    //
  }
}
</script>
