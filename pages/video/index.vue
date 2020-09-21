<template>
  <!-- <v-layout row wrap fill-height justify-center> -->
  <v-layout column fill-height justify-center align-center>
    <v-flex>
      <v-col>
        <h1 v-if="selectedMovie">{{selectedMovie.title}}</h1>
        <div v-else align-center>
          <h1>Video page</h1>
          <h2>Movie is not selected</h2>
        </div>
      </v-col>
    </v-flex>

    <v-flex>
      <v-card elevation="24" :max-width="480">
        <!--
        <v-img
          v-if="selectedMovie"
          height="200px"
          class="white--text align-end"
          :src="selectedMovie.poster"
        >
        </v-img>
        -->
        <v-container fluid class="pt-0">
          <VideoPlayer />
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import VideoPlayer from "~/components/VideoPlayer.vue";

export default {
  name: "video-page", //for vue-dev-tools
  components: {
    VideoPlayer,
  },
  computed: {
    ...mapState({
      selectedMovie: (state) => state.store.selectedMovie,
    }),
  },
};
</script>