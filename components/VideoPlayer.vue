<template>
  <div v-if="selectedMovie" class="video-container">
    <!-- video player -->
    <div class="player" :width="480" :heigth="270">
      <video ref="video" :poster="selectedMovie.poster" width="100%" height="auto">
        <source :src="selectedMovie.video" type="video/mp4" />Your browser does not support the video tag.
      </video>
    </div>
    <!-- play button -->
    <div id="playbutton" @click="playBtnClick()" class="centered">
      <img id="playbuttonImg" :src="playBtnSrc" alt="Play" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "video-player", //for vue-dev-tools
  data() {
    return {
      playBtnSrc: "http://hybridtv.ss7.tv/techtest/assets/icons/btn-play.png",
      pauseBtnSrc: "http://hybridtv.ss7.tv/techtest/assets/icons/btn-pause.png",
      videoPlayer: undefined,
      hidePoster: false,
      paused: false
    };
  },
  mounted() {
    this.videoPlayer = this.$refs["video"];
  },
  computed: {
    ...mapState({
      selectedMovie: (state) => state.store.selectedMovie,
    }),
  },
  methods: {
    //play button
    playBtnClick() {
      this.paused = !this.paused;
      if (this.paused == true) {
        this.videoPlayer.play();
        this.playBtnSrc =
          "http://hybridtv.ss7.tv/techtest/assets/icons/btn-pause.png";
      } else {
        this.videoPlayer.pause();
        this.playBtnSrc =
          "http://hybridtv.ss7.tv/techtest/assets/icons/btn-play.png";
      }
    },
    //rewind button
    rewindBtnClick() {
      if (this.videoPlayer.currentTime > 0) {
        this.videoPlayer.currentTime = this.videoPlayer.currentTime - 2;
      }
    },
    //fast forward button
    forwardBtnClick() {
      this.videoPlayer.currentTime = this.videoPlayer.currentTime + 2;
    },
  },
};
</script>

<style>
.video-container {
  position: relative;
}
.player {
  display: block;
  background: red;
}
#playbutton {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
