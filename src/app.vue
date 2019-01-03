<template>
  <v-app>
    <v-toolbar
      :class="isHome ? 'elevation-0' : 'elevation-1'"
      :color="isHome ? 'transparent' : 'teal'"
      dark
      :fixed="isHome"
    >
      <v-toolbar-title class="logo">
        <router-link :to="{ name: 'home' }">
          <img
            v-if="$vuetify.breakpoint.mdAndUp"
            src="./assets/navbar-logo.svg"
          />
          <span v-else>CCU PLUS</span>
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn
          v-for="link in navbarLinks"
          :flat="$vuetify.breakpoint.mdAndUp"
          :key="link.to"
          :icon="$vuetify.breakpoint.smAndDown"
          :to="{ name: link.to }"
        >
          <v-icon class="fa-fw" small>{{ link.icon }}</v-icon>
          <span class="ml-1 hidden-sm-and-down">{{ link.name }}</span>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <v-container :class="isHome ? 'pa-0' : 'px-0'" fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer dark height="auto">
      <v-card class="teal darken-1 text-xs-center" flat tile width="100%">
        <v-card-text>
          <v-btn
            v-for="link in footerLinks"
            class="mx-2"
            :href="link.to"
            icon
            :key="link.to"
            rel="noopener"
            target="_blank"
          >
            <v-icon size="24px">{{ link.icon }}</v-icon>
          </v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text>
          <span class="title"
            >CCU PLUS &copy; {{ new Date().getFullYear() }}</span
          >
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class CCUPLUS extends Vue {
  navbarLinks: object[] = [
    {
      icon: "fas fa-book",
      name: "課程評論",
      to: "courses"
    },
    {
      icon: "fas fa-sign-in-alt",
      name: "登入",
      to: "sign-in"
    },
    {
      icon: "fas fa-user-plus",
      name: "註冊",
      to: "sign-up"
    }
  ];

  footerLinks: object[] = [
    {
      icon: "fab fa-facebook",
      to: "https://www.facebook.com/ccu.plus"
    },
    {
      icon: "fab fa-github",
      to: "https://github.com/BePsvPT/CCU-Plus"
    }
  ];

  get isHome(): boolean {
    return this.$route.name === "home"
  }
}
</script>

<style lang="scss" scoped>
.logo {
  height: 100%;
  display: flex;
  align-items: center;

  a {
    color: #ffffff;
    text-decoration: none;
  }

  a,
  img {
    height: 40px;
  }

  @media screen and (max-width: 960px) {
    a {
      height: unset;
    }
  }
}
</style>
