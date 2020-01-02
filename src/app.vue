<template>
  <v-app>
    <v-app-bar
      :color="isHome ? 'transparent' : 'teal'"
      dark
      :elevation="isHome ? 0 : 1"
      :fixed="isHome"
      max-height="64"
    >
      <v-row class="h-full" justify="space-around">
        <v-col class="py-0" :cols="isHome ? 12 : 11" :lg="isHome ? 12 : 9" :xl="isHome ? 12 : 7">
          <v-row align="center" class="h-full" :class="isHome ? 'px-4' : undefined">
            <v-toolbar-title>
              <router-link :to="{ name: 'home' }">
                <v-img
                  v-if="$vuetify.breakpoint.mdAndUp"
                  alt="ccu-plus-logo"
                  contain
                  eager
                  height="40"
                  position="left center"
                  :src="require('@/assets/navbar-logo.svg')"
                  :transition="false"
                  width="154"
                />

                <span v-else class="white--text">CCU PLUS</span>
              </router-link>
            </v-toolbar-title>

            <div class="flex-grow-1" />

            <v-toolbar-items>
              <v-btn
                v-for="link in links.navbar"
                v-if="(typeof link.auth !== 'boolean') || link.auth === signIn"
                exact
                :icon="$vuetify.breakpoint.smAndDown"
                :key="link.to"
                :text="$vuetify.breakpoint.mdAndUp"
                :to="{ name: link.to }"
              >
                <v-icon small>{{ link.icon }}</v-icon>

                <span class="ml-1 hidden-sm-and-down">{{ link.name }}</span>
              </v-btn>
            </v-toolbar-items>
          </v-row>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-content>
      <v-container
        class="h-full"
        :class="isHome ? 'pa-0' : 'px-0'"
        fluid
      >
        <router-view v-if="isHome" />

        <v-row v-else class="h-full" justify="space-around">
          <v-col cols="11" lg="9" xl="7">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer color="teal darken-3" dark padless>
      <v-row justify="center" no-gutters>
        <v-btn
          v-for="link in links.footer"
          :aria-label="link.label"
          class="mx-4 my-2"
          :href="link.to"
          icon
          :key="link.to"
          rel="noopener noreferrer"
          target="_blank"
        >
          <v-icon size="24px">{{ link.icon }}</v-icon>
        </v-btn>

        <v-col class="teal darken-4 py-3 text-center" cols="12">
          <span>CCU PLUS &copy; {{ new Date().getFullYear() }}</span>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from '@/libs/axios';
import { mdiAccount, mdiCommentTextMultiple, mdiFacebookBox, mdiGithubBox, mdiLogin, mdiLogout } from '@mdi/js';

@Component
export default class CCUPLUS extends Vue {
  get isHome() {
    return this.$route.name === 'home';
  }

  get links() {
    return {
      navbar: [
        {
          auth: true,
          icon: mdiAccount,
          name: this.$store.state.profile.nickname,
          to: 'profile',
        },
        {
          icon: mdiCommentTextMultiple,
          name: '課程評論',
          to: 'courses',
        },
        {
          auth: false,
          icon: mdiLogin,
          name: '登入',
          to: 'sign-in',
        },
        {
          auth: true,
          icon: mdiLogout,
          name: '登出',
          to: 'sign-out',
        },
      ],
      footer: [
        {
          icon: mdiFacebookBox,
          label: 'Facebook Page',
          to: 'https://www.facebook.com/ccu.plus',
        },
        {
          icon: mdiGithubBox,
          label: 'GitHub Repository',
          to: 'https://github.com/ccu-plus',
        },
      ],
    };
  }

  get signIn() {
    return this.$store.state.signIn;
  }

  private async created() {
    if (this.signIn) {
      const { data: { data } } = await axios.get('/account/profile');

      this.$store.commit('setProfile', data);
    }
  }
}
</script>
