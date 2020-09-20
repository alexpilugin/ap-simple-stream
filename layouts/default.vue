<template>
  <v-app dark>

    <Navbar
      @toggle-right-drawer="rightDrawer =!rightDrawer"
    />

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-navigation-drawer 
      v-model="rightDrawer" 
      temporary 
      right
      app
      :hide-overlay="true"
      width="200px"
      >
      <v-list class="pt-0" dense>
        <v-list-item
          v-for="(item, index) in getNavMenu"
          :key="`item-${index}`"
          @click.stop="navigate(item.route)"
        >
          <v-list-item-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <BottomFooter :fixed="fixed" app />
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import BottomFooter from "@/components/BottomFooter.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    Navbar,
    BottomFooter
  },
  data() {
    return {
      fixed: true,
      rightDrawer: false
    };
  },
  computed: {
    ...mapGetters({
      getNavMenu: "store/getRightDrawerMenus",
    }),
  },
};
</script>
