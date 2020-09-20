<template>
  <div>
    <client-only>
      <v-app-bar flat dark elevation-0 dense app>
        <v-btn icon @click.stop="switchTheme()">
          <v-icon>mdi-brightness-6</v-icon>
        </v-btn>

        <v-btn icon @click.stop="toggleRightDrawer()">
          <v-icon>mdi-menu</v-icon>
        </v-btn>

        <v-spacer />
        <nuxt-link to="/" class="logo-link-decor">
          <v-toolbar-title class="title pa-5 white--text" v-text="title" />
        </nuxt-link>

        <v-spacer />
        <div class="flex-grow-1 mt-5"></div>
        <v-spacer />

        <v-tabs
          v-show="$vuetify.breakpoint.mdAndUp"
          right
          active-class="active-link"
          :value="tabIndex"
        >
          <v-tab v-for="(item, i) in getNavMenu" :key="i" :to="item.route" nuxt>
            <v-tooltip bottom>
              <template #activator="{ on }">
                <v-flex style="widt:100%; height:100%" v-on="on" class="pt-3">
                  <v-icon>{{ item.icon }}</v-icon>
                  <span class="pl-3">{{item.title}}</span>
                </v-flex>
              </template>
              <span>{{item.title}}</span>
            </v-tooltip>
          </v-tab>
        </v-tabs>

        <!--
        <div v-show="$vuetify.breakpoint.mdAndUp">
          <v-toolbar-items>
            <v-btn
              v-for="(item, i) in getNavMenu"
              text
              small
              :key="'nav'+i"
              class="white--text pa-2"
            >
              <div @click.stop="navigate(item.route)">
                <v-icon>{{ item.icon }}</v-icon>
                <span class="pl-3">{{ item.title }}</span>
              </div>
            </v-btn>
          </v-toolbar-items>
        </div>
        -->
      </v-app-bar>
    </client-only>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "navbar", //for debugging in Vue-DevTools
  props: {
    tabIndex: {
      type: Number,
      default: -1,
      required: false,
    },
  },
  data() {
    return {
      rightDrawer: false,
    };
  },
  computed: {
    ...mapState({
      title: (state) => state.store.appTitle,
    }),
    ...mapGetters({
      getNavMenu: "store/getRightDrawerMenus",
    }),
  },
  methods: {
    navigate(route) {
      const self = this;
      setTimeout(function () {
        //give time for animation
        self.$router.push({ path: route });
      }, 300);
    },
    toggleRightDrawer() {
      this.rightDrawer = !this.rightDrawer;
      //send notification to the parent:
      this.$emit("toggle-right-drawer", this.rightDrawer);
    },
    switchTheme() {
      this.$vuetify.theme.isDark = !this.$vuetify.theme.isDark;
    },
  },
};
</script>

<style scoped>
.active-route-link {
  border: solid 1px white;
}
.logo-link-decor {
  text-decoration: none;
}
</style>