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
      <v-card elevation="24" :max-width="480" v-if="selectedMovie">
        <v-img
          v-if="isShowingPoster"
          height="600px"
          class="white--text align-end poster-img"
          :src="selectedMovie.poster"
        ></v-img>
        <!-- play button -->
        <div v-if="isShowingPoster" id="playbutton" @click="play()" class="centered">
          <img id="playbuttonImg" :src="playBtnSrc" alt="Play" />
        </div>
        <v-container fluid class="pt-0" v-if="!isShowingPoster">
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
  data() {
    return {
      playBtnSrc: "http://hybridtv.ss7.tv/techtest/assets/icons/btn-play.png",
    };
  },
  computed: {
    ...mapState({
      selectedMovie: (state) => state.store.selectedMovie,
      isShowingPoster: (state) => state.store.isShowingPoster,
    })
  },
  methods: {
    ...mapActions({
      showPoster: 'store/showPoster',
      playMovie: 'store/playMovie',
    }),
    play() {
      this.showPoster(false);
      this.playMovie(true);
      console.log("play() ....");
    }
  },
};
</script>

<style scoped>
.poster-img {
  margin: 40px;
}
.poster-img:focus {
 border: 2px solid #FFD700;
}
</style>