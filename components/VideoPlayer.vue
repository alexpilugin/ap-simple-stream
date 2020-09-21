<template>
  <div v-if="selectedMovie" class="video-container">
    <!-- video player -->
    <div class="player" height="600">
      <video ref="video" :poster="selectedMovie.poster" width="100%" height="auto">
        <source :src="selectedMovie.video" type="video/mp4" />Your browser does not support the video tag.
      </video>
    </div>
    <!-- play button -->
    <div id="playbutton" @click="playBtnClick()" class="centered">
      <img id="playbuttonImg" :src="isPlaying ? pauseBtnSrc : playBtnSrc" alt="Play" />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "video-player", //for vue-dev-tools
  data() {
    return {
      playBtnSrc: "http://hybridtv.ss7.tv/techtest/assets/icons/btn-play.png",
      pauseBtnSrc: "http://hybridtv.ss7.tv/techtest/assets/icons/btn-pause.png",
      videoPlayer: undefined,
      hidePoster: false
    };
  },
  mounted() {
    this.videoPlayer = this.$refs["video"];
    if(this.videoPlayer && this.isPlaying) this.videoPlayer.play();
  },
  watch: {
    isPlaying(mode) {
      if(this.videoPlayer) {
        console.log("watch: isPlaying: " + mode);
        if(mode) {
          this.videoPlayer.play(); 
        } else {
          this.videoPlayer.pause();  
        }
      }
    }
  },
  computed: {
    ...mapState({
      selectedMovie: (state) => state.store.selectedMovie,
      isPlaying: (state) => state.store.isPlaying,
    }),
    ...mapGetters({
      getPlayBtnSrc: "store/getPlayBtnSrc",
    }),
  },
  methods: {
    ...mapActions({
      playMovie: 'store/playMovie',
      showPoster: 'store/showPoster',
    }),
    //play button
    playBtnClick() {
      const mode = !this.isPlaying;
      console.log("playBtnClick, mode: " + mode);
      if (mode) {
        this.playMovie(true);
        this.videoPlayer.play();       
      } else {
        this.playMovie(false);
        this.videoPlayer.pause();
        this.showPoster(true);
      }
      this.$nextTick(() => (this.playBtnSrc = this.getPlayBtnSrc ))
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
  /* box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); */
}
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.player > video {
  object-fit: cover;
}
</style>
