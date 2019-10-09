<template>
  <v-app>
    <v-app-bar
      :color="isHome ? 'transparent' : 'teal'"
      dark
      :elevation="isHome ? 0 : 1"
      :fixed="isHome"
      max-height="64"
    >
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
          />

          <span v-else class="white--text">CCU PLUS</span>
        </router-link>
      </v-toolbar-title>

      <div class="flex-grow-1" />

      <v-toolbar-items>
        <v-btn
          v-for="link in links.navbar"
          :icon="$vuetify.breakpoint.smAndDown"
          :key="link.to"
          :text="$vuetify.breakpoint.mdAndUp"
          :to="{ name: link.to }"
        >
          <v-icon small>{{ link.icon }}</v-icon>

          <span class="ml-1 hidden-sm-and-down">{{ link.name }}</span>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <v-container
        class="h-full"
        :class="isHome ? 'pa-0' : 'px-0'"
        fluid
      >
        <router-view />
      </v-container>
    </v-content>

    <v-footer color="teal darken-2" dark padless>
      <v-row justify="center" no-gutters>
        <v-btn
          v-for="link in links.footer"
          class="mx-4 my-2"
          :href="link.to"
          icon
          :key="link.to"
          rel="noopener noreferrer"
          target="_blank"
        >
          <v-icon size="24px">{{ link.icon }}</v-icon>
        </v-btn>

        <v-col class="teal darken-1 py-3 text-center" cols="12">
          <span>CCU PLUS &copy; {{ new Date().getFullYear() }}</span>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mdiCommentTextMultiple, mdiFacebookBox, mdiGithubBox, mdiLogin } from '@mdi/js';

@Component
export default class CCUPLUS extends Vue {
  private links = {
    navbar: [
      {
        icon: mdiCommentTextMultiple,
        name: '課程評論',
        to: 'courses',
      },
      {
        icon: mdiLogin,
        name: '登入',
        to: 'sign-in',
      },
    ],
    footer: [
      {
        icon: mdiFacebookBox,
        to: 'https://www.facebook.com/ccu.plus',
      },
      {
        icon: mdiGithubBox,
        to: 'https://github.com/BePsvPT/CCU-Plus',
      },
    ],
  };

  get isHome() {
    return this.$route.name === 'home';
  }
}
</script>
