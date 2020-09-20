<template>
  <v-footer
      :fixed="fixed"
      app
    >
      <span>Created by &copy; 
        <a href="mailto:pilugin@gmail.com?subject=Mail from Nuxt Webapp">
          Alex Pilugin</a> Sep. 2020.
      </span>
    </v-footer>
</template>

<script>
export default {
  name: "bottom-footer", //for debugging in Vue-DevTools
  props: {
    fixed: Boolean,
    required: false
  }
}
</script>