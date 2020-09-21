<template>
  <v-carousel v-model="model" hide-delimiters hide-delimiter-background>
    <v-carousel-item
      v-for="(movie,index) in movies"
      :key="'movie-'+index"
      :src="movie.poster"
      @click.stop="navigate(movie, index)"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "carousel", //for vue-dev-tools
  data() {
    return {
      model: 0,
    };
  },
  watch: {
    model(index) {
      this.selectMovie(index+1);
    },
  },
  computed: {
    ...mapState({
      movies: (state) => state.store.movies,
    }),
  },
  methods: {
    ...mapActions({
      selectMovie: "store/selectMovie",
      showPoster: 'store/showPoster'
    }),
    navigate(movie, index) {
      console.log("navigate: " + movie.title);
      this.selectMovie(index);
      this.showPoster(true);
      // with query
      this.$router.push({ 
        path: 'video', 
        query: { 
          name: this.slugify(movie.title) 
        }
      })
    },
    slugify(string) {
      const a =
        "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
      const b =
        "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
      const p = new RegExp(a.split("").join("|"), "g");

      return (
        string
          .toString()
          .toLowerCase()
          .replace(/\s+/g, "-") // Replace spaces with -
          .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
          .replace(/&/g, "-and-") // Replace & with 'and'
          // eslint-disable-next-line no-useless-escape
          .replace(/[^\w\-]+/g, "") // Remove all non-word characters
          // eslint-disable-next-line no-useless-escape
          .replace(/\-\-+/g, "-") // Replace multiple - with single -
          .replace(/^-+/, "") // Trim - from start of text
          .replace(/-+$/, "")
      ); // Trim - from end of text
    },
  },
};
</script>