import colors from 'vuetify/es5/util/colors'

export default {
  ssr: false,
  target: 'static',
  vue: {
    config: {
      productionTip: true,
      devtools: true
    }
  },
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~assets/styles/main.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  pageTransition: {
    name: "page", //css class: '~assets/styles/main.css'
    mode: "out-in"
  },
  router: {
    linkActiveClass: 'nuxt-active-link'
  },
  /*
  ** Build configuration
  */
  build: {
    buildDir: '.nuxt',
    publicPath: '/assets/',
    //https://github.com/nuxt/nuxt.js/issues/3828#issuecomment-508428611
    filenames: {
      app: ({ isDev }) => isDev ? '[name].[hash].js' : '[chunkhash].js',
      chunk: ({ isDev }) => isDev ? '[name].[hash].js' : '[chunkhash].js'
    },
    babel: {
      presets({ isServer }) {
        // let targets = isServer ? { node: '10' } : { ie: '11' }
        return [
          [require.resolve('@nuxt/babel-preset-app'),
          {
            // targets
            buildTarget: isServer ? 'server' : 'client',
            corejs: { version: 3 }
          }
          ]
        ]
      },
      'env': {
        'production': {
          'plugins': []
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
