<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-card
        elevation="24"
        width="444"
        height="600"
      >
        <v-card-title class="headline">
          Movies
        </v-card-title>
        <v-container fluid class="pt-0">
          <Carousel />
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Carousel from '~/components/Carousel.vue'

export default {
  name: "video-page", //for vue-dev-tools
  components: {
    Carousel
  }
}
</script>
